import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Image from "next/image";
import { Button, Card, useNotification } from "web3uikit";
import Link from "next/link";

export default function BountiesActive({issueId,ownerUserName,escrowContract,idObject, amount}){

    const handleClick = async function(){

        <Link href={"https://github.com"}></Link>
    }

return (
    <div className="flex w-[350px] sm:w-[600px] m-5">
    <Card
    key={idObject}
    title={`Get a bounty if you solve the issue`}
    description={`Do click to see the issue in Github`}
  >
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between">
      <div className="italic text-sm mb-4 text-lila font-bold">
        You will get {ethers.utils.formatEther(amount)} MATIC
      </div>
      <div className=" text-xl font-bold">
        IssueID: #{issueId}
      </div>
      <div className="italic text-lm mb-4">
        <button
          onClick={() =>
            handleClick()
          }
          class="bg-lila hover:bg-lilaSuave text-white z-10 font-bold py-2 px-4 border-b-4 border-lilaSuave hover:border-lila rounded"
        >
          Go to Github
        </button>
      </div>
    </div>
  </Card>
  </div>
)
}