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
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
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
