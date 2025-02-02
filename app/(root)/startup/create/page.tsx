import StartupCreateForm from '@/components/StartupCreateForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();

  if (!session) return redirect('/');
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your startup</h1>
      </section>

      <StartupCreateForm />
    </>
  );
};
export default Page;
