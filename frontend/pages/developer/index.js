import React, { Fragment } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GET_ACTIVE_ESCROW from "../../constanst/subGraphQueries";
import { useQuery, gql } from "@apollo/client";
import { useMoralis } from "react-moralis";

import { abi } from "../../constanst/index";
import FormForData from "../../components/navigation/form-for-data";
import BountiesActive from "../../components/bounties-active";

export default function Developer() {
  const [isRegistered, setIsRegistered] = useState(false);

  //Initialized router from useRouter
  const router = useRouter();

  //Initialized useQuery for DB
  const { loading, error, data } = useQuery(GET_ACTIVE_ESCROW);

  // Initializer for UseMoralis
  const { isWeb3Enabled } = useMoralis();

  /**
   * @Function to search in the array of the contract of the wallet of the user is alerady registered
   */

  const checkRegistrationOnChain = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      const contractAddress = "0x452fDfDEDf8b1F7Bc815d5E5433a768A7579fa6F";
      const user = await signer.getAddress();
      console.log(`Este es el user` + user);

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const getDeveloperInArray = await contract.getDevelopers();
      console.log(getDeveloperInArray);
      console.log("estoy trabajando");
      const isRegistered = getDeveloperInArray.some(
        (developer) => developer.developerAddress === user
      );

      console.log("estoy trabajando2");
      console.log(isRegistered);
      setIsRegistered(isRegistered);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * @notice Useeffect to execute the singIn() from nextAuth
   */

  useEffect(() => {
    /*if (!isWeb3Enabled) {
      console.log("hola");
      alert("You need to Connect your Wallet");
      window.location.href = "http://localhost:3000/";
    }*/
    checkRegistrationOnChain();
  }, [isWeb3Enabled]);

  return (
    <div className="flex min-h-max justify-center text-white ">
      {isRegistered ? (
        <Fragment>
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center mb-10 mt-10 w-[300px] sm:w-[600px]">
              <h2 className="text-center text-2xl sm:text-4xl">
                You can see all the <br></br>bounties avalaible to work on.
              </h2>
            </div>
            <div className=" h-screen">
              {loading || !data ? (
                <div className="text-white">Loading...</div>
              ) : !loading && data && data.activeEscrows.length > 0 ? (
                data.activeEscrows.map((issue) => {
                  console.log(issue.attributes);
                  const {
                    id,
                    escrowContract,
                    arbiter,
                    depositor,
                    ownerUserName,
                    issueId,
                    amount,
                    url,
                  } = issue;
                  return (
                    <div className="p-2">
                      <BountiesActive
                        issueId={issueId}
                        ownerUserName={ownerUserName}
                        escrowContract={escrowContract}
                        idObject={id}
                        amount={amount}
                        arbiter={arbiter}
                        url={url}
                      ></BountiesActive>
                    </div>
                  );
                })
              ) : (
                <div className=" transition ease-out duration-500  hover:scale-105  p-3 flex-row sm:flex jussm:justify-between bg-[#f2f6ff] hover:bg-slate-200 h-fit rounded-lg border-solid border-lilaSuave border-4">
                  <h2 className="text-xl text-lila font-semibold">
                    No Bounties avalaible
                  </h2>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col justify-center items-center gap-5 w-[600px]">
            <div className="flex text-5xl">You are not registered</div>
            <div className="flex text-2xl text-center p-5">
              If you want to earn Bounties solving Github Issues, you need to
              approve the Contract, providing your Github ownerUserName
            </div>
            <div className="flex">
              <FormForData></FormForData>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
