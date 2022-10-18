//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Whitelist{
    uint8 maxWhiteListedAddresses;
    constructor(uint8 _maxWhiteListedAddresses){
        maxWhiteListedAddresses = _maxWhiteListedAddresses; 
    }
}
