'use client';

import { useSession, signIn } from 'next-auth/react';
import Landing from '@/components/Landing';

export default function TestAuth() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <Landing name={session.user?.name ?? 'Guest'} />
      </div>
    );
  }

  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  );
}
