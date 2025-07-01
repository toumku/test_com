import { UsersScreen } from '@/screens/users.screen';
import { Suspense } from 'react';

export default function UsersPage() {
  return (
    <Suspense>
      <UsersScreen />
    </Suspense>
  );
}
