// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Escrow.sol"; 

contract Main {
    //Structs for each new EscrowContract
    struct Escrow_info {
        address escrowContract;
        string ownerUserName;
        uint256 issueId;
    }

    //Struct for each new Developer who wants to use our Service
    struct Developer_info {
        address developerAddress;
        string loginName;
    }

    //Array of all the Escrow Structs
    Escrow_info[] public Escrows;
    //Array of all the Developer Structs
    Developer_info[] public Developers;

    //Event fired when a new Escrow/bounty is created
    event EscrowCreated(
        address indexed escrowContract,
        address indexed arbiter,
        address indexed depositor,
        uint256 amount,
        string ownerUserName,
        uint256 issueId
    );

    //Event fired when a new Developer signIn
    event NewDeveloper(address indexed developer, string loginName);

    /**
     *
     * @param _developer address of the developer. We get this from wallet
     * @param _loginName loginName formGithub, we get this from singIn SSO
     */
    function addDeveloper(address _developer, string memory _loginName) public {
        Developers.push(Developer_info(_developer, _loginName));
        emit NewDeveloper(_developer, _loginName);
    }

    /**
     *
     *  @param _arbiter address of the arbiter who can apporve the payment
     *  @param _ownerUserName string with the name of the owner of the issue/repo
     *  @param _issueId uint256 with the numeric Id of the issue
     */

    function createEscrow(
        address _arbiter,
        string memory _ownerUserName,
        uint256 _issueId
    ) public payable {
        Escrow newEscrow = new Escrow{
            value: msg.value
        }(_arbiter);

        Escrows.push(
            Escrow_info(address(newEscrow), _ownerUserName, _issueId)
        );

        emit EscrowCreated(
            address(newEscrow),
            _arbiter,
            msg.sender,
            msg.value,
            _ownerUserName,
            _issueId
        );
    }

    function getEscrows() public view returns (Escrow_info[] memory) {
        return Escrows;
    }

    function getDevelopers() public view returns (Developer_info[] memory) {
        return Developers;
    }
}
