import { AuthGuard } from '@/components/auth-guard';
import { HomeScreen } from '@/screens/home.screen';

export default function HomePage() {
  return (
    <AuthGuard>
      <HomeScreen />
    </AuthGuard>
  );
}
