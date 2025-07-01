import { DeviceChart } from '@/charts/device-chart';
import { TotalDevices } from '@/charts/total-devices';
import { TotalEmployees } from '@/charts/total-employees';
import { TotalUsers } from '@/charts/total-users';

export function HomeScreen() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
        <DeviceChart />
      </div>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <div className='bg-muted/50  rounded-xl'>
          <TotalDevices />
        </div>
        <div className='bg-muted/50  rounded-xl'>
          <TotalEmployees />
        </div>
        <div className='bg-muted/50  rounded-xl'>
          <TotalUsers />
        </div>
      </div>
    </div>
  );
}
