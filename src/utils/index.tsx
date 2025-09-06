import { genres } from '@/data';
import type { IStatCardData, StatsInput } from '@/types';
import { BookOpen, TrendingUp } from 'lucide-react';

export function statsCardInfo(statsData: StatsInput): IStatCardData[] {
  return [
    {
      id: 1,
      title: 'Total Books',
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      stats: `${statsData?.totalBooks}`,
      description: `${statsData?.availableBooks} available`,
    },
    {
      id: 2,
      title: 'Total Copies',
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      stats: `${statsData?.totalCopies}`,
      description: `Across all books`,
    },
    {
      id: 3,
      title: 'Borrowed',
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      stats: `${statsData?.borrowedCopies}`,
      description: `Currently on loan`,
    },
    {
      id: 4,
      title: 'Genres',
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      stats: `${genres?.length || 0}`,
      description: `Different categories`,
    },
  ];
}
