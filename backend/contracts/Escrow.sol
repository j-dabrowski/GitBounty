//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Main.sol";

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved = false;
    uint public amount;

    event Approved(uint256 balance);

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can approve");
        _;
    }

    constructor(address _arbiter) payable {
        arbiter = _arbiter;

        depositor = msg.sender;
        amount = msg.value;
    }

    function cancelEscrow(address _arbiter) public {
        (bool sent, ) = _arbiter.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function approve(address _beneficiary) public payable onlyArbiter {
        isApproved = true;
        beneficiary = _beneficiary;
        (bool sent, ) = beneficiary.call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit Approved(amount);

        Main(msg.sender).deleteEscrowArray(address(this));
    }
}
