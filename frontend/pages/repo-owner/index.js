import { Form, Skeleton, Card } from "web3uikit";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import useSWR from "swr";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

import BountyModal from "../../components/Bounty-modal";
import { abi } from "../../constanst/index";
import CardCustom from "../../components/card-custom";

export default function RepoOwner() {
  const [formData, setFormData] = useState({ owner: "", repo: "" });
  const [showForm, setShowForm] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [registeredIssuesIds, setRegisteredIssuesIds] = useState([]);
  // We create also a setShowModal again to false for the closing of the Modal
  const hideModal = () => setShowModal(false);

  //Intializer useRouter()
  const router = useRouter();

  //Intializer of next-auth/react session
  const { data: session, status } = useSession();

  /**
   * @notice We get the input of the Form in the formData.owner
   * @notice We execute the fetcher function that we need to use the SWR librarie
   * @notice Target is to execute the api call to URL
   */

  async function fetcher(url) {
    const res = await fetch(url);

    return res.json();
  }
  const { data } = useSWR(
    formData.owner ? `/api/issues?owner=${formData.owner}` : null,
    fetcher
  );
  //END
  /**
   * @notice Function executed when submit the Form
   */
  const handleSubmit = (data) => {
    const owner = data.data[0].inputResult;

    setFormData({ owner: owner });
    setShowForm(false);
  };
  //END
  /**
   * @notice Function executed when we click on the button for each card
   */
  const handleClick = (issueName, issueId) => {
    setShowModal(true);
    setFormData({ ...formData, issueName, issueId });
  };
  //END
  /**
   * @Function to search in the array of the contract of the wallet of the user is alerady registered
   */

  const checkIssueIdOnChain = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      const contractAddress = "0x742B99d37532985ab0024b461c2395969a58a7f8";

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const getIssueIdInArray = await contract.getEscrows();
      console.log(getIssueIdInArray);
      console.log("estoy trabajando");

      const tempRegisteredIssuesIds = [];
      for (let i = 0; i < getIssueIdInArray.length; i++) {
        console.log(
          `Esto es el array Issue ${getIssueIdInArray[i].issueId.toString()}`
        );
        tempRegisteredIssuesIds.push(getIssueIdInArray[i].issueId.toString());

        setRegisteredIssuesIds(tempRegisteredIssuesIds);
      }

      console.log("estoy trabajando2");
      console.log(registeredIssuesIds);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @notice Useeffect to execute the singIn() from nextAuth
   */

  useEffect(() => {
    if (status === "loading") {
      return; // Still loading session data, do nothing
    }

    if (!session) {
      // User is not signed in, show sign-in button
      signIn();
    } else if (session && router.query.redirected) {
      // User is signed in and was redirected from the sign-in page
      const { redirected } = router.query;
      router.push(redirected); // Redirect back to the original page
    }
  }, [session, status, router]);
  //END

  useEffect(() => {
    checkIssueIdOnChain();
  }, [data]);

  useEffect(() => {
    console.log("hello", registeredIssuesIds);
  }, [registeredIssuesIds]);

  return (
    <div className="min-h-fit w-full">
      <div className="flex justify-center items-start  ">
        {showForm && (
          <div className=" w-[350px] sm:w-[600px] mt-[100px] sm:mt-[100px]">
            <Form
              onSubmit={handleSubmit}
              //Data object es especial de esta libreria y de este Form, y contiene una lista de
              //de los fields que va tenr nuestro form
              data={[
                {
                  name: "Owner",
                  type: "text",
                  inputWidth: "100%",
                  value: "",
                  key: "owner",
                },
              ]}
              title="Search your Repos"
              id="MainForm"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center items-start mt-[10px] sm:mt-[20px]">
        {!showForm && (
          <div className="w-[400px] sm:w-[800px]">
            {data && data.filteredIssues ? (
              <div className="">
                <div>
                  <h2 className="line text-white font-bold mb-20">
                    Your issues avalaible <br></br> to create a Bounty
                  </h2>
                </div>
                {data.filteredIssues.map((item) => {
                  return item.issuesWithDetails.map((issue) => {
                    const isIssueIdIncluded = registeredIssuesIds.includes(
                      issue.issueId.toString()
                    );
                    console.log(isIssueIdIncluded);
                    console.log(issue.issueId);

                    return (
                      <div className="p-5" key={issue.issueId}>
                        <BountyModal
                          esVisible={showModal}
                          onClose={hideModal}
                          issueName={formData.issueName}
                          issueId={formData.issueId}
                        />
                        <Card
                          title={`Title: ${issue.title}`}
                          description={issue.issueUrl}
                        >
                          <div className="flex flex-col justify-center sm:flex-row sm:justify-between">
                            <div className="italic text-sm mb-4">
                              Issues created by {issue.name}
                            </div>
                            <div className="text-xl font-bold">
                              IssueID: #{issue.issueId}
                            </div>
                            <div className="italic text-lm mb-4">
                              {isIssueIdIncluded ? (
                                <div className=" bg-red-700  text-white z-10 font-bold py-2 px-4 border-b-4  border-red-200  rounded">
                                  Already Created
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleClick(issue.name, issue.issueId)
                                  }
                                  className="bg-lila hover:bg-lilaSuave text-white z-10 font-bold py-2 px-4 border-b-4 border-lilaSuave hover:border-lila rounded"
                                >
                                  Create Bounty
                                </button>
                              )}
                            </div>
                          </div>
                        </Card>
                      </div>
                    );
                  });
                })}
              </div>
            ) : (
              <div className="">
                <Skeleton theme="image" />
                <div style={{ width: "100%", height: "100%" }}>
                  <Skeleton theme="text" />
                  <Skeleton theme="subtitle" width="30%" />
                </div>
                <Skeleton theme="image" />
                <div style={{ width: "100%", height: "100%" }}>
                  <Skeleton theme="text" />
                  <Skeleton theme="subtitle" width="30%" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
