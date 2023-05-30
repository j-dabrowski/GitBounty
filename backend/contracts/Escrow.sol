// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FunctionsConsumerEscrow.sol"; 

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved = false;
    uint public amount;
    string public issueID;
    string public repo;

    FunctionsConsumerEscrow consumer;

    event Approved(uint256 balance);

    constructor(address _arbiter, address _consumerAddress, string memory _issueID, string memory _repo) payable {
        arbiter = _arbiter;
        issueID = _issueID;
        repo = _repo;

        consumer = FunctionsConsumerEscrow(_consumerAddress);

        depositor = msg.sender;
        amount = msg.value;
    }

    function approve(address _beneficiary) public payable {
        require(msg.sender == arbiter, "Only arbiter can approve");

        isApproved = true;
        beneficiary = _beneficiary;
        (bool sent, ) = beneficiary.call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit Approved(amount);
    }

    function makeFunctionRequest() public {
        string[] memory args;
        args[0] = repo;
        args[1] = issueID;
        consumer.executeRequestFromEscrow(args);
    }


}
