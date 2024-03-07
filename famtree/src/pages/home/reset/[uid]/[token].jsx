import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Forget = dynamic(() => import('../../login/forget'));

export default function Reset() {
  const router = useRouter();
  const { uid, token } = router.query;

  console.log(uid);
  console.log(token);

  return <Forget id={uid} tok={token}/>
}
