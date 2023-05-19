import styles from "../styles/Home.module.css"
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Form, useNotification, Withdraw, ConnectButton, Button, Illustration } from "web3uikit";
import Link from "next/link";
import HeroComponent from "../components/navigation/hero";
import Image from 'next/image';
import { Fragment } from "react";

export default function Home() {
  

  //Inicializamos useNitification de la libreria web3uikit
  const dispatch = useNotification();
  const { isWeb3Enabled } = useMoralis();
  return (
    <div>
      <main className="">
      
      
      <div className="flex justify-center">
              {isWeb3Enabled ?(
                <div>
                  <div className="flex justify-center items-center">
                <Image src="/pngegg (3).png" alt="" width={300} height={300}/>
                </div>
              <div className="flex justify-center items-center">
                
                
                <div className="flex justify-center items-center h-screen p-10">
               
                <Link href="/repo-owner" className="box z-10 rounded-full overflow-hidden relative w-[400px] h-[400px] bg-black">
                
                </Link>
                
                
                </div>
                
                <div className="flex">
                <Link href="/developer" className="box2 rounded-full overflow-hidden relative w-[400px] h-[400px] bg-black">
                
                </Link>

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


