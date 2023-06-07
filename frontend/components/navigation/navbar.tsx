import React, { useState } from 'react';
import { ConnectButton } from "web3uikit";
import Link from "next/link";
import {  useMoralis } from "react-moralis";


function Navbar() {
 const [isOpen, setIsOpen] = useState(false);

 //Initilizer of moralis
 const { isWeb3Enabled } = useMoralis();
 

 return (
   <nav className="flex items-center justify-between flex-wrap p-6">
     <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
       <a href='/'><img src={"./logo-hackaton.png"} className="w-100 h-20 mr-2" alt="Logo" /></a>
     </div>
     <div className="block lg:hidden">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
       >
         <svg
           className={`fill-current h-5 w-5 ${isOpen ? "hidden" : "block"}`}
           viewBox="0 0 20 20"
           color="white"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         <svg
           className={`fill-current h-5 w-5 ${isOpen ? "block" : "hidden"}`}
           viewBox="0 0 20 20"
           color="white"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
         </svg>
       </button>
     </div>
     <div
       className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
     >
       <div className="text-sm lg:flex-grow flex-col items-center">
        {isWeb3Enabled ? (<div className='ml-[25px] sm:ml-[150px] mb- w-40 sm:w-fit block mt-4 lg:inline-block lg:mt-0 mr-4 py-2 px-4 bg-lila hover:bg-lilaSuave text-white z-10 font-bold border-b-4 border-lilaSuave hover:border-lila rounded'>
            <Link href={"/owner-account"}> My Bounties</Link>
          </div>) : ("")}
          
      </div>
       <div className='w-5 sm:w-fit'>
          <ConnectButton></ConnectButton>
       </div>
     </div>
   </nav>
 );
}
export default Navbar;