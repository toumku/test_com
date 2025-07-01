import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from './ui/card';
import { Badge } from '@/components/ui/badge';

export type ScoreCardProps = {
  title: string;
  description: string;
};

export function ScoreCard(props: ScoreCardProps) {
  const { title, description } = props;

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          {title}
        </CardTitle>
        <CardAction>
          <Badge variant='outline'>
            <TrendingDown />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          Trending up this month <TrendingUp className='size-4' />
        </div>
        <div className='text-muted-foreground'>
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
