//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./EscrowGuindoVersion.sol";

contract EscrowFactory {
    address[] public deployedEscrows;

    event EscrowCreated(
        address indexed escrowContract,
        address indexed arbiter,
        address indexed depositor,
        uint256 amount
    );

    function createEscrow(address _arbiter) public payable {
        EscrowGuindoVersion newEscrow = new EscrowGuindoVersion{
            value: msg.value
        }(_arbiter);
        deployedEscrows.push(address(newEscrow));

        emit EscrowCreated(address(newEscrow), _arbiter, msg.sender, msg.value);
    }

    function getDeployedEscrows() public view returns (address[] memory) {
        return deployedEscrows;
    }
}
