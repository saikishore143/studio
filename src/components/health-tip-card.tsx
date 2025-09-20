'use client';

import { useEffect, useState, useTransition } from 'react';
import { Lightbulb, RefreshCw, Zap } from 'lucide-react';
import { generateDailyWellnessTips } from '@/ai/flows/daily-wellness-tips';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

type WellnessTip = {
  tip: string;
  citation?: string;
};

export function HealthTipCard() {
  const [tip, setTip] = useState<WellnessTip | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchTip = () => {
    startTransition(async () => {
      const result = await generateDailyWellnessTips({});
      setTip(result);
    });
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <CardTitle>Daily Wellness Tip</CardTitle>
            <CardDescription>Powered by AI</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending && !tip ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
            {tip?.tip}
          </blockquote>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Zap className="h-3 w-3" />
          <span>Freshly generated</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchTip}
          disabled={isPending}
        >
          <RefreshCw
            className={cn('mr-2 h-4 w-4', isPending && 'animate-spin')}
          />
          New Tip
        </Button>
      </CardFooter>
    </Card>
  );
}
