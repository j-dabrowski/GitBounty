import { ethers } from "ethers";

import {  Card, useNotification } from "web3uikit";


import  deleteEscrowArray from "../scripts/deleteEscrowArray"

export default function BountiesOwnerAdmin({issueId,ownerUserName,escrowContract,idObject, amount}){
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

return (
    <div className="flex w-[350px] sm:w-[700px] gap-2">
    <Card
    key={idObject}
    title={`Get a bounty if you solve the issue`}
    description={`Do click to see the issue in Github`}
  >
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between">
      
      <div className="italic text-sm mb-4 text-lila font-bold">
        This Bounty has a value of {ethers.utils.formatEther(amount)} MATIC
      </div>
      <div className=" text-xl font-bold">
        IssueID: #{issueId}
      </div>
      <div className="italic text-lm mb-4">
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
  </Card>
  </div>
)
}