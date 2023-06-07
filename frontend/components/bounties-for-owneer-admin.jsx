import { ethers } from "ethers";

import { useNotification } from "web3uikit";


import  deleteEscrowArray from "../scripts/deleteEscrowArray"

export default function BountiesOwnerAdmin({arbiter,issueId,ownerUserName,escrowContract,idObject, amount}){
    const dispatch = useNotification()

    const handleClick = async function(){
        await deleteEscrowArray(escrowContract);
        dispatch({
          type: 'success',
          message: 'Bounty Cancelled Successfully',
          title: 'Bounty Cancelled',
          position: 'topR',
        })
        await new Promise((resolve) => setTimeout(resolve, 6000));
        if (process.env.NODE_ENV === "production") {
        window.location.href =
          "";
        } else {
        window.location.href = "http://localhost:3000/owner-account";
        }
    }

    const limitedAddress = arbiter.slice(0, 5 ) + "..." + arbiter.slice(-4)

return (
  <div className=" transition ease-out duration-500  hover:scale-105  p-3 flex-row sm:flex jussm:justify-between bg-[#f2f6ff] hover:bg-slate-200 h-fit rounded-lg border-solid border-lilaSuave border-4">
  <div className=" flex flex-col items-center w-[100%] sm:w-[20%] p-2">
      <p className=" italic text-center text-sm mb-[5px] text-[#616265]">Bounty created by</p>
      <p className=" italic font-semibold text-sm mb-[5px] text-black ">{limitedAddress}</p>
      
      <p className=" text-sm text-center text-black font-semibold"><span className=" text-[#757e94]">Username:</span> {ownerUserName}</p>
  </div>
  <div className="flex flex-col items-center justify-between w-[100%] sm:w-[65%] p-2">
  <p className=" italic text-sm mb-[5px] text-[#757e94]">Issue with ID <span className=" font-bold">#{issueId}</span></p>
      <h2 className=" text-xl text-lila font-semibold">Your Bounty Value {ethers.utils.formatEther(amount)} MATIC</h2>
      <p className=" text-base mb-[5px] text-[#757e94] pl-4 pr-4">Click if you want to cancel the Bounty</p>
      
  </div>
  <div className="flex justify-center items-center w-[100%] sm:w-[20%]">
  <button
          onClick={() =>
            handleClick()
          }
          class=" bg-red-800 hover:bg-red-400 text-white z-10 font-bold py-2 px-4 border-b-4 border-red-400 hover:border-red-800 rounded"
        >
          Cancel Bounty
        </button>
  </div>
</div>
)
}