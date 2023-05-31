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

    modifier onlyMainContract() {
        require(msg.sender == depositor, "Only Main contract can esceute");
        _;
    }

    constructor(address _arbiter) payable {
        arbiter = _arbiter;

        depositor = msg.sender;
        amount = msg.value;
    }

    function cancelEscrow(address _arbiter) public onlyMainContract {
        (bool sent, ) = _arbiter.call{value: amount}("");
        require(sent, "Failed to send Eth");
    }

    function approve(address _beneficiary) public payable onlyMainContract {
        isApproved = true;
        beneficiary = _beneficiary;
        (bool sent, ) = beneficiary.call{value: amount}("");
        require(sent, "Failed to send Eth");

        emit Approved(amount);
    }
}
