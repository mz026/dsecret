pragma solidity ^0.4.23;

contract DSecret {
  struct Secret {
    string content;
    address owner;
    uint256 baseAmount;
  }
  Secret[] secrets;
  address owner;

  constructor() public {
    owner = msg.sender;
  }

  function createSecret(string _content) public payable {
    secrets.push(Secret(_content, msg.sender, msg.value));
  }
}
