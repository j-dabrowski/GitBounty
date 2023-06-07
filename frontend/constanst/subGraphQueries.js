import { gql } from "@apollo/client";

const GET_ACTIVE_ESCROW = gql`
  {
    activeEscrows(
      first: 10
      where: {
        escrowContract_not: "0x000000000000000000000000000000000000dead"
      }
    ) {
      id
      escrowContract
      arbiter
      depositor
      ownerUserName
      issueId
      amount
      url
    }
  }
`;

export default GET_ACTIVE_ESCROW;
