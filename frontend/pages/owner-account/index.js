import { getSession } from "next-auth/react";
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
      <div className="flex  justify-center items-center mt-[150px] sm:mt-[50px]">
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
      <div className="flex flex-col justify-start items-center gap-4">
        {!data ? (
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
              <BountiesOwnerAdmin
                issueId={issueId}
                ownerUserName={ownerUserName}
                escrowContract={escrowContract}
                idObject={id}
                amount={amount}
              ></BountiesOwnerAdmin>
            );
          })
        )}
      </div>
    </Fragment>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
