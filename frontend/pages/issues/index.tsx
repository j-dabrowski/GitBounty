import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router';

export default function Issues () {
    const account = useAccount()
    const router = useRouter()
  useEffect(()=>{
    if(!account.isConnected){

      router.push('/pepe');
    }

  },[account.isConnected, router])
  return <div>Issues</div>
}

