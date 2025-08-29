import type { IStatCardData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const StatsCard = ({ data }: { data: IStatCardData }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{data?.title}</CardTitle>
        {/* icons*/}
        {data.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.stats}</div>
        <p className="text-xs text-muted-foreground">{data?.description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
