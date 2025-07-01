import { AuthGuard } from '@/components/auth-guard';
import { DevicesScreen } from '@/screens/devices.screen';
import { Suspense } from 'react';

export default function DevicesPage() {
  return (
    <Suspense>
      <AuthGuard>
        <DevicesScreen />
      </AuthGuard>
    </Suspense>
  );
}
