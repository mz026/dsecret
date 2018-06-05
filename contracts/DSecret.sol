pragma solidity ^0.4.23;

contract DSecret {
  struct Secret {
    string content;
    string summary;
    address owner;
    uint256 basePrice;
    uint256 currentPrice;
  }
  Secret[] private secrets;
  address owner;

  constructor() public {
    owner = msg.sender;
  }

  function createSecret(string _content, string _summary) public payable {
    secrets.push(Secret(_content, _summary, msg.sender, msg.value, msg.value));
  }

  function getSecret(uint _idx) public view returns(string, string, uint256) {
    if (_idx >= secrets.length) {
      return ("", "", 0);
    }
    Secret storage s = secrets[_idx];
    return (s.content, s.summary, s.currentPrice);
  }

  function getSecretCount() public view returns (uint) {
    return secrets.length;
  }

  function peek(uint _index) public payable {
    require(_index < secrets.length);

    Secret storage s = secrets[_index];
    s.owner.transfer(msg.value);
    s.currentPrice = msg.value;
  }
}
