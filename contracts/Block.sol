// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Block {

  struct task {
    uint256 id;
    string description;
    bool done;
  }

  task[] public tasks;

  constructor() {
    tasks.push(task(1, 'task 1', false));
    tasks.push(task(2, 'task 2', false));
  }

  function addTask(string memory _description) public {
    uint256 id = tasks.length +1;
    bool done = false;
    tasks.push(task(id, _description, done));
  }

  function doneTask(uint256 _id) public {
    tasks[_id].done = true;
  }

  function getTasks() public view returns (task[] memory) {
    return tasks;
  }

  function getLength() public view returns (uint256) {
    return tasks.length;
  }

  function getTask(uint256 _id) public view returns (task memory) {
    return tasks[_id];
  }
}
