import { Form, Skeleton } from "web3uikit";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
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
  const handleClick = (name, id, issueUrl, repo) => {
    setShowModal(true);
    setFormData({ ...formData, name, id, issueUrl, repo });
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
      const contractAddress = "0x452fDfDEDf8b1F7Bc815d5E5433a768A7579fa6F";

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
            {data ? (
              data.filteredIssues.length > 0 ? (
                <div className="">
                  <div>
                    <h2 className="line text-white font-bold mb-20">
                      Your issues available <br></br> to create a Bounty
                    </h2>
                  </div>
                  {data.filteredIssues.map((item) => {
                    return item.issuesWithDetails.map((issue) => {
                      const isIssueIdIncluded = registeredIssuesIds.includes(
                        issue.issueId.toString()
                      );
                      console.log(isIssueIdIncluded);
                      const Id = issue.issueId.toString();
                      console.log(Id);

                      return (
                        <div className=" p-5" key={issue.issueId}>
                          <BountyModal
                            esVisible={showModal}
                            onClose={hideModal}
                            name={formData.name}
                            id={formData.id}
                            issueUrl={formData.issueUrl}
                            repo={formData.repo}
                          />
                          <CardCustom
                            title={issue.title}
                            id={Id}
                            name={issue.name}
                            issueUrl={issue.issueUrl}
                            avatar={issue.avatar}
                            repo={issue.repo}
                            description={issue.description}
                            isIssueIdIncluded={isIssueIdIncluded}
                            handleClick={handleClick}
                          />
                        </div>
                      );
                    });
                  })}
                </div>
              ) : (
                <div className="mt-[80px] transition ease-out duration-500  hover:scale-105  p-3 flex-row sm:flex justify-center bg-[#f2f6ff] hover:bg-slate-200 h-fit rounded-lg border-solid border-lilaSuave border-4">
                  <h2 className="text-2xl text-lila font-semibold">
                    No Issues found
                  </h2>
                </div>
              )
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
