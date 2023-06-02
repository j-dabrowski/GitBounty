import {  useMoralis } from "react-moralis";
import Image from 'next/image';
import Link from "next/link";

import HeroComponent from "../components/navigation/hero";



export default function Home() {
  

  //Inicializamos useNitification de la libreria web3uikit
  
  const { isWeb3Enabled } = useMoralis();
  return (
    <div className="min-h-screen">
      <main className="flex justify-center items-start p-4">
        <div className="flex justify-center mt-10">
            {isWeb3Enabled ?(
              <div className="">
                  <div className="flex justify-center items-center mb-20">
                     <p className="line text-lila font-bold">You need to choose now...</p>
                  </div>
                  <div className="flex justify-center items-center ">
                  <Image src="/pngegg (3).png" alt="" width={300} height={300}/>
                  </div>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-2">
                  <div className="flex justify-center items-center p-0 sm:p-10">
                  <Link href="/repo-owner" className="box z-10 rounded-full overflow-hidden relative w-[300px] h-[300px] bg-black"></Link>
                  </div>
                  <div className="flex">
                  <Link href="/developer" className=" w-[300px] h-[300px]  box2 rounded-full overflow-hidden relative bg-black"></Link>
                  </div>
                </div>
              </div>) : (
                <div className="w-full" >
                <HeroComponent></HeroComponent>
                </div>
              )}
            </div>
       </main>
    </div>
  )
}


