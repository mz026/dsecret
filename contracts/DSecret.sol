pragma solidity ^0.4.23;

contract DSecret {
  struct Secret {
    string content;
    string summary;
    address owner;
    uint256 baseAmount;
  }
  Secret[] private secrets;
  address owner;

  constructor() public {
    owner = msg.sender;
  }

  function createSecret(string _content, string _summary) public payable {
    secrets.push(Secret(_content, _summary, msg.sender, msg.value));
  }

  function getSecret(uint _idx) public view returns(string, string, uint256) {
    if (_idx >= secrets.length) {
      return ("", "", 0);
    }
    Secret storage s = secrets[_idx];
    return (s.content, s.summary, s.baseAmount);
  }

  function getSecretCount() public view returns (uint) {
    return secrets.length;
  }

}
