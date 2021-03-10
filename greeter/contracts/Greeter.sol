pragma solidity >= 0.4.0  < 0.7.0;

contract Greeter {
  string private _greeting;

  // external: callable from other contract
  // view: read only (pure: does not read and write)
  // memory: does not store the return value in the persistent storage
  function greet() external view returns(string memory) {
    return _greeting;
  }

  // calldata: required because of external function and reference type argument
  function setGreeting(string calldata greeting) external {
    _greeting = greeting;
  }

}

