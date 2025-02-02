import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import StartupCard, { StartupCardType } from './StartupCard';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup?._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No startups found</p>
      )}
    </>
  );
};

export const StartupCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3].map((i: number) => (
        <li key={cn('skeleton', i)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
};

export default UserStartups;
