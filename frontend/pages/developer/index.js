import React, { Fragment } from "react";
import { ethers } from "ethers";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
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
  //Intializer of next-auth/react session
  const { data: session, status } = useSession();

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
      const contractAddress = "0x742B99d37532985ab0024b461c2395969a58a7f8";
      const user = await signer.getAddress();
      console.log(user);

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
    if (status === "loading") {
      return; // Still loading session data, do nothing
    }

    if (!session) {
      // User is not signed in, show sign-in button
      signIn();
    } else {
      // User is signed in and was redirected from the sign-in page

      checkRegistrationOnChain();
    }
  }, [session, status, router, isWeb3Enabled]);

  return (
    <div className="flex min-h-max justify-center text-white ">
      {isRegistered ? (
        <Fragment>
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center text-center mb-10 mt-10 w-[600px]">
              <h2 className=" text-5xl">
                You can see all the bounties you have created
              </h2>
            </div>
            <div className=" h-screen">
              {loading || !data ? (
                <div>Loading...</div>
              ) : (
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
                  } = issue;
                  return (
                    <BountiesActive
                      issueId={issueId}
                      ownerUserName={ownerUserName}
                      escrowContract={escrowContract}
                      idObject={id}
                      amount={amount}
                    ></BountiesActive>
                  );
                })
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
