
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract main {
    uint public userCount = 100000;
    uint public billCount = 100;   
    

    struct user{
        string name;
        string email;
        uint phone;
        uint aadhar;
        string gender;
        string useraddress;
    }
    struct bill{
        uint caNumber;
        uint billNumber;
        string billDate;
        string billTime;
        string userName;
        uint units;
        uint energyCharges;
        uint additionalCharges;
        uint netBill;
    }
   

    mapping (uint => user) public users;
    mapping (uint => bill) public bills;

    event userCreated(
        string name,
        string email,
        uint phone,
        uint aadhar,
        string gender,
        string useraddress
    );
    event billGenerated(
        uint caNumber,
        uint billNumber,
        string billDate,
        string billTime,
        string userName,
        uint units,
        uint energyCharges,
        uint additionalCharges,
        uint netBill
    );
    
    function addUser(string memory _name, string memory _email, uint  _phone,
                        uint  _aadhar,string memory _gender,string memory _useraddress) public{
        userCount++;
        users[userCount] = user(_name,_email,_phone,_aadhar,_gender,_useraddress); 
        emit userCreated(_name, _email, _phone, _aadhar, _gender, _useraddress);
    }

    function addBill(uint _caNumber,
    uint _billNumber,
    string memory _billDate,
    string memory _billTime,
    string memory _userName,
    uint _units,
    uint _energyCharges,
    uint _additionalCharges,
    uint _netBill) public{
    billCount++;
    bills[billCount] = bill(_caNumber,_billNumber,_billDate,_billTime,_userName,_units,_energyCharges,_additionalCharges,_netBill); 
    emit billGenerated(_caNumber,_billNumber,_billDate,_billTime,_userName,_units,_energyCharges,_additionalCharges,_netBill);
    }
 
}