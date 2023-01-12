//SPDX-License-Identifier: MIT
//9b7f57849aad8af205eb71067dab31bb00e1478de1b65345e52ad177c1b7946a

pragma solidity ^0.8.7;

contract Whitelist{
    uint8 public maxWhiteListedAddresses;
    uint8 public numAddressesWhitelisted;
    mapping (address => bool) public whitelistedAddresses;

    constructor(uint8 _maxWhiteListedAddresses){
        maxWhiteListedAddresses = _maxWhiteListedAddresses;
         
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddresses[msg.sender], "you're already whitelisted omo ope");
        require( numAddressesWhitelisted < maxWhiteListedAddresses, "too late ngmi" );
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted+=1;
    }




}

