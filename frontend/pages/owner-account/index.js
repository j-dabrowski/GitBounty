import { useState } from "react";
import { Fragment } from "react";
import React from "react";
import { Form } from "web3uikit";
import { gql, useQuery } from "@apollo/client";

import BountiesOwnerAdmin from "../../components/bounties-for-owneer-admin";

export default function OwnerAccount() {
  //Initialized useQuery for DB

  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({ owner: "" });
  console.log(formData);
  const GET_ACTIVE_ESCROW_FROM_AN_OWNER = gql`
    query GetActiveEscrowFromOwner($owner: String!) {
      activeEscrows(
        first: 10
        where: {
          and: [
            { ownerUserName: $owner }
            { escrowContract_not: "0x000000000000000000000000000000000000dead" }
          ]
        }
      ) {
        id
        escrowContract
        arbiter
        depositor
        ownerUserName
        issueId
        amount
      }
    }
  `;

  /**
   * @notice Function executed when submit the Form
   */
  const handleSubmit = (data) => {
    const owner = data.data[0].inputResult;

    setFormData({ owner: owner });
    setShowForm(false);
  };
  //END
  const { loading, error, data } = useQuery(GET_ACTIVE_ESCROW_FROM_AN_OWNER, {
    variables: { owner: formData.owner },
    skip: showForm,
  });
  return (
    <Fragment>
      <div className="flex justify-center items-center mt-[150px] sm:mt-[50px]">
        {showForm && (
          <div className=" w-[350px] sm:w-[600px]">
            <Form
              onSubmit={handleSubmit}
              //Data object es especial de esta libreria y de este Form, y contiene una lista de
              //de los fields que va tenr nuestro form
              data={[
                {
                  name: "Github Login Name",
                  type: "text",
                  inputWidth: "100%",
                  value: "",
                  key: "owner",
                },
              ]}
              title="Manage your Bounties "
              id="MainForm"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-start items-center gap-4 ">
        {!showForm && loading ? (
          <div role="status">
            <svg
              name="loader"
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-lila"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : !showForm && data && data.activeEscrows.length > 0 ? (
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
              <BountiesOwnerAdmin
                key={id}
                issueId={issueId}
                ownerUserName={ownerUserName}
                escrowContract={escrowContract}
                idObject={id}
                amount={amount}
                arbiter={arbiter}
              ></BountiesOwnerAdmin>
            );
          })
        ) : (
          !showForm && (
            <div className=" transition ease-out duration-500  hover:scale-105  p-3 flex-row sm:flex jussm:justify-between bg-[#f2f6ff] hover:bg-slate-200 h-fit rounded-lg border-solid border-lilaSuave border-4">
              <h2 className="text-xl text-lila font-semibold">
                No issues found
              </h2>
            </div>
          )
        )}
      </div>
    </Fragment>
  );
}
