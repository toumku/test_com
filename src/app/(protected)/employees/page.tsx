import { AuthGuard } from '@/components/auth-guard';
import { EmployeesScreen } from '@/screens/employees.screen';
import { Suspense } from 'react';

export default function EmployeesPage() {
  return (
    <Suspense>
      <AuthGuard>
        <EmployeesScreen />
      </AuthGuard>
    </Suspense>
  );
}
