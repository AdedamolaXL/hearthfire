// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// this line to use console.log
import "hardhat/console.sol";

contract GoalTracker {
    struct Goal {
        address owner;
        string target;
        uint256 stakeAmount;
        uint256 updates;
        uint256 updatesRemaining;
        uint256 deadline;
        bool completed;
        bool claimed;
    }

    mapping(uint256 => Goal) public goals;
    uint256 public goalCount;

    event GoalCreated(address owner, string target, uint256 stakeAmount, uint256 updates, uint256 deadline, uint256 goalId);
    event GoalUpdates(address owner, uint256 updatesRemaining, uint256 goalId);
    event GoalCompleted(uint256 goalId);
    event GoalClaimed(address owner, uint256 stakeAmount, uint256 goalId);


    function createGoal(string memory _target, uint256 _stakeAmount, uint256 _updates, uint256 _deadline) external payable {
        require(_stakeAmount > 0, "Stake amount must be greater than 0");
        require(_updates > 1, "Updates must be greater than 1");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        goals[goalCount] = Goal({
            owner: msg.sender,
            target: _target,
            stakeAmount: _stakeAmount,
            updates: _updates,
            updatesRemaining: _updates,
            deadline: _deadline,
            completed: false,
            claimed: false
        });

        goalCount++;

        emit GoalCreated(msg.sender, _target, _stakeAmount, _updates, _deadline, goalCount - 1);
    }


    function updateGoal(uint256 _goalId, string memory _videoHash) external {
        require (_goalId < goalCount, "Invalid goal ID");
        Goal storage goal = goals[_goalId];

        require(msg.sender == goal.owner, "You are not the owner of this goal");
        require(bytes(_videoHash).length > 0, "You need to update a video");
        require(!goal.completed, "Goal already completed");
        require(goal.updatesRemaining > 0, "No updates remaining");
        

        // maybe verify the video hash in future ?

        goal.updatesRemaining--;
        
        emit GoalUpdates(msg.sender, goal.updatesRemaining, _goalId);
    }


    function claimStake(uint256 _goalId) external {
        require(_goalId < goalCount, "Invalid goal ID");
        Goal storage goal = goals[_goalId];
        require(block.timestamp >= goal.deadline, "Deadline not reached");

        // Check if the owner has fulfilled at least 3/4 of the promised updates.
        uint256 requiredUpdates = (goal.updates * 3) / 4;
        if (goal.updates - goal.updatesRemaining >= requiredUpdates) {
            goal.completed = true;
            emit GoalCompleted(_goalId);
        }

        // If the goal was completed, transfer the stake to the owner
        if (goal.completed && !goal.claimed) {
            // Transfer the stake to the owner
            payable(goal.owner).transfer(goal.stakeAmount);
            goal.claimed = true;
        } 

        // If the goal wasnt completed, transfer stake to designated address
        // else {
        //   payable(address(0xxx)).transfer(goal.stakeAmount);
        // }
        
        // Assuming there's a reputation token contract and minting a token for the owner
        //reputationToken.mint(msg.sender, 1);

        emit GoalClaimed(msg.sender, goal.stakeAmount, _goalId);
    }


    function getGoalsByOwner(address _owner) external view returns (
        uint256[] memory goalId,
        string[] memory target,
        uint256[] memory stakeAmount,
        uint256[] memory updates,
        uint256[] memory updatesRemaining,
        uint256[] memory deadline,
        bool[] memory completed,
        bool[] memory claimed
    ) {
        uint256 count = 0;
        for (uint256 i = 0; i < goalCount; i++) {
            if (goals[i].owner == _owner) {
                count++;
            }
        }
        goalId = new uint256[](count);
        target = new string[](count);
        stakeAmount = new uint256[](count);
        updates = new uint256[](count);
        updatesRemaining = new uint256[](count);
        deadline = new uint256[](count);
        completed = new bool[](count);
        claimed = new bool[](count);

        uint256 index = 0;
        for (uint256 i = 0; i < goalCount; i++) {
            if (goals[i].owner == _owner) {
                goalId[index] = i;
                target[index] = goals[i].target;
                stakeAmount[index] = goals[i].stakeAmount;
                updates[index] = goals[i].updates;
                updatesRemaining[index] = goals[i].updatesRemaining;
                deadline[index] = goals[i].deadline;
                completed[index] = goals[i].completed;
                claimed[index] = goals[i].claimed;
                index++;
            }
        }
        
        return (goalId, target, stakeAmount, updates, updatesRemaining, deadline, completed, claimed);
    }
}

