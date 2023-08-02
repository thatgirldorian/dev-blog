// @ts-nocheck

import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/blogPage');
  }, []);
  return <Fragment />;
}
