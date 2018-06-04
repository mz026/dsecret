pragma solidity ^0.4.23;

contract DSecret {
  struct Secret {
    string content;
    string summary;
    address owner;
    uint256 baseAmount;
  }
  Secret[] public secrets;
  address owner;

  constructor() public {
    owner = msg.sender;
  }

  function createSecret(string _content, string _summary) public payable {
    secrets.push(Secret(_content, _summary, msg.sender, msg.value));
  }

}
