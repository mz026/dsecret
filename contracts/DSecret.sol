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

  function getSecret(uint _index) public view returns(bytes32[2]) {
    bytes32[2] memory ret;
    string memory s1 = secrets[0].content;
    string memory s2 = secrets[1].content;
    ret[0] = stringToBytes32(s1);
    ret[1] = stringToBytes32(s2);

    return ret;
  }

  function stringToBytes32(string memory source) pure internal returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly {
      result := mload(add(source, 32))
    }
  }

}
