pragma solidity >= 0.4.0  < 0.7.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract Greeter is Ownable {
  string private _greeting;

  // The following lines can be deleted because this contract imports Ownable
  /*
  address private _owner;

  constructor() public {
    _owner = msg.sender;
  }

  modifier onlyOwner() {
    require(
      msg.sender == _owner,
      "Ownable: caller is not the owner"
    );
    _;
  }

  function owner() external view returns(address) {
    return owner;
  }
  */

  // external: callable from other contract
  // view: read only (pure: does not read and write)
  // memory: does not store the return value in the persistent storage
  function greet() external view returns(string memory) {
    return _greeting;
  }

  // calldata: required because of external function and reference type argument
  function setGreeting(string calldata greeting)  external onlyOwner {
    _greeting = greeting;
  }
}

