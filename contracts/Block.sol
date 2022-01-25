// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Block {
  
  struct task{
      uint id;
      string description;
      bool done;
  }
  task[] public tasks;

  constructor(){
    tasks.push(task(0, "task 1", false));
    tasks.push(task(1, "task 2", false));
  }

  function addTask(string memory _description) public {
    uint id = tasks.length;
    bool done = false;
    tasks.push(task(id, _description, done));
  }
  function doneTask(uint _id) public {
    tasks[_id].done = true;
  }
  function getTasks() public view returns (task[] memory) {
    return tasks;
  }
  function getLength() public view returns (uint) {
    return tasks.length;
  }
  function getTask(uint _id) public view returns (task memory) {
    return tasks[_id];
  }
}