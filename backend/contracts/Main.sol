// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Escrow.sol"; 

contract Main {
    
    Escrow[] public escrowArray;
    
    function createEscrowContract() public returns(uint count) {
        Escrow escrow = new Escrow();
        escrowArray.push(escrow);
        return escrowArray.length;
    }

    function sfStore(uint256 _escrowIndex, uint256 _escrowNumber) public {
        escrowArray[_escrowIndex].store(_escrowNumber);
    }
    
    function sfGet(uint256 _escrowIndex) public view returns (uint256) {
        return escrowArray[_escrowIndex].retrieve();
    }
}

