import { ethers } from "ethers";


export default function BountiesActive({url,arbiter,issueId,ownerUserName,escrowContract,idObject, amount}){

  const limitedAddress = arbiter.slice(0, 5 ) + "..." + arbiter.slice(-4)
  console.log(url);
  const handleClick = ()=>{
    window.location.href = url
  }
    
    return(
      <div className=" transition ease-out duration-500  hover:scale-105  p-3 flex-row sm:flex jussm:justify-between bg-[#f2f6ff] hover:bg-slate-200 h-fit rounded-lg border-solid border-[#3c56be] border-4">
              <div className=" flex flex-col items-center w-[100%] sm:w-[20%] p-2">
                  <p className=" italic text-center text-sm mb-[5px] text-[#616265]">Bounty created by</p>
                  <p className=" italic font-semibold text-sm mb-[5px] text-black ">{limitedAddress}</p>
                  
                  <p className=" text-sm text-center text-black font-semibold"><span className=" text-[#757e94]">Username:</span> {ownerUserName}</p>
              </div>
              <div className="flex flex-col items-center justify-between w-[100%] sm:w-[65%] p-2">
              <p className=" italic text-sm mb-[5px] text-[#757e94]">Issue with ID <span className=" font-bold">#{issueId}</span></p>
                  <h2 className=" text-xl text-lila font-semibold">You will get {ethers.utils.formatEther(amount)} MATIC</h2>
                  <p className=" text-base mb-[5px] text-[#757e94] pl-4 pr-4">Click and look at the instructions</p>
                  
              </div>
              <div className="flex justify-center items-center w-[100%] sm:w-[20%]">
              <button onClick={handleClick} class="bg-lila hover:bg-lilaSuave text-white z-10 font-bold py-2 px-4 border-b-4 border-lilaSuave hover:border-lila rounded ">
          Go to Github
        </button>
              </div>
          </div>
      
  )
}