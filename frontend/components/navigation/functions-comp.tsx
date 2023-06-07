import { Fragment } from "react";
import React from "react";




export default function FunctionsComp(){

    return(
        <div className="p-[10px] sm:p-[100px] min-h-fit">
        <div className=" gap-5 flex flex-col sm:flex-row mt-10  p-3 ">
      
      
      <div id="functions" className="flex flex-col justify-start bg-gradient-to-bl from-gradient-1-start to-gradient-4-end rounded-[50px] h-[450px] w-[100%] sm:w-[50%] items-center p-5">
        <h3 className="text-[30px] mt-[60px] font-bold ">GitHub Integration</h3>
        <p className="text-white font-thin text-[23px] p-2 sm:p-5 leading-2">If you are the owner of a repository on GitHub, our platform allows you to create bounties by attaching a certain amount of Matic coins as rewards.</p>
      </div>  

      <div className="flex flex-col justify-start bg-gradient-to-bl from-gradient-1-start to-gradient-4-end rounded-[50px] w-[100%] sm:w-[50%] items-center p-5">
  <h3 className=" text-center text-[30px] mt-[60px] font-bold ">Chainlink Automation</h3>
  <p className="text-white font-thin text-[23px] p-2 sm:p-5 leading-2">By leveraging Chainlink functions and automation, our platform simplifies the payment process, ensuring developers receive their rewards promptly and accurately.</p>
</div> 

      

      
  </div>

<div className=" gap-5 flex flex-col sm:flex-row mt-10  p-3 min-h-[95vh]">
      
<div className=" justify-start flex flex-col bg-gradient-to-bl from-gradient-1-start to-gradient-4-end rounded-[50px] h-[500px] w-[100%] sm:w-[50%] items-center p-5">
        <h3 className="text-[30px] mt-[80px] font-bold ">Bounty Discovery</h3>
        <p className="text-white font-thin text-[23px] p-2 sm:p-5 leading-2">Developers can visit our platform and explore the bounties created by repository owners. Once a developer identifies a bounty they wish to solve, they can navigate to the corresponding GitHub clicking the button.</p>
      </div> 
      
<div className="flex flex-col justify-start bg-gradient-to-bl from-gradient-1-start to-gradient-4-end rounded-[50px] h-[500px] w-[100%] sm:w-[50%] items-center p-5">
  <h3 className=" text-center text-[30px] mt-[45px] font-bold ">Blockchain-Powered Payments</h3>
  <p className="text-white font-thin text-[23px] p-2 sm:p-5 leading-2">Our platform utilizes blockchain technology, specifically the Chainlink protocol, to ensure secure and transparent transactions. Developers who successfully resolve bounties will be automatically rewarded with Matic coins.</p>
</div>  




</div>
</div>
   )
}