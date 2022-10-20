//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Whitelist{
    uint8 maxWhiteListedAddresses;
    uint numWhiteListedAddresses;
    mapping (address => bool) public whitelistedAddresses;

    constructor(uint8 _maxWhiteListedAddresses){
        maxWhiteListedAddresses = _maxWhiteListedAddresses; 
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddresses[msg.sender], "you're already whitelisted omo ope");
        require( numWhiteListedAddresses < maxWhiteListedAddresses, "too late ngmi" );
        whitelistedAddresses[msg.sender] = true;
        numWhiteListedAddresses++;
        

    }




}

// contract owo {
//     function mirror() public payable {

//         uint amount = msg.value;
//         address payable target = payable(msg.sender);
//         (bool success,) = target.call{value: amount}("");
//         require(success, "brokei!");


//     }

// }

// contract blacklist{
//     uint8 maxBlackListedAcoounts;
//     uint8 numBlackListedAccounts;
//     mapping (address => bool) public blackListedAcoounts;

//     constructor (uint8 _maxBlackListedAcoounts){
//         numBlackListedAccounts = _maxBlackListedAcoounts;

//     }

//     function tryAddAccount() public {
//         require(!blackListedAccounts[msg.sender], "you're already blacklisted son");
//         require(numBlackListedAccounts<10, "too lack fam");
//         blackListedAccounts[msg.sender] = true;
//         numBlackListedAccounts++

//     }

}
