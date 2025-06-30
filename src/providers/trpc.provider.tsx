'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { ReactNode, useState } from 'react';
import { TRPCProvider as CoreTRPCProvider } from '@/lib/trpc/trpc';
import { Router } from '../lib/trpc/routers';
import superjson from 'superjson';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export type TRPCProviderProps = {
  children: ReactNode;
};

export function TRPCProvider(props: TRPCProviderProps) {
  const { children } = props;
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<Router>({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <CoreTRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </CoreTRPCProvider>
    </QueryClientProvider>
  );
}
