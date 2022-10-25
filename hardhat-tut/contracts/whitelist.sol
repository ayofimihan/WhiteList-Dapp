//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Whitelist{
    uint8 public maxWhiteListedAddresses;
    uint8 public numWhiteListedAddresses;
    mapping (address => bool) public whitelistedAddresses;

    constructor(uint8 _maxWhiteListedAddresses){
        maxWhiteListedAddresses = _maxWhiteListedAddresses; 
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddresses[msg.sender], "you're already whitelisted omo ope");
        require( numWhiteListedAddresses < maxWhiteListedAddresses, "too late ngmi" );
        whitelistedAddresses[msg.sender] = true;
        numWhiteListedAddresses+=1;
    }




}

