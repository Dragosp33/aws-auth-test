import { auth } from '@/auth';

const Page = async () => {
  const session = await auth();
  return <div>your session is: {JSON.stringify(session)}</div>;
};

export default Page;
