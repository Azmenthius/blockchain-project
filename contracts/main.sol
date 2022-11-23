
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract main {
    uint public userCount = 100000;

    struct user{
        string name;
        string email;
        uint phone;
        uint aadhar;
        string gender;
        string useraddress;
    }

    mapping (uint => user) public users;
    
    function addUser(string memory _name, string memory _email, uint  _phone,
                        uint  _aadhar,string memory _gender,string memory _useraddress) public{
        userCount++;
        users[userCount] = user(_name,_email,_phone,_aadhar,_gender,_useraddress); 
    }
}