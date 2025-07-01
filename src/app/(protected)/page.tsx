import { AuthGuard } from '@/components/auth-guard';
import { HomeScreen } from '@/screens/home.screen';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense>
      <AuthGuard>
        <HomeScreen />
      </AuthGuard>
    </Suspense>
  );
}
