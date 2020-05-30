// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;


contract Faucet {
    event Withdrawl(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    // give out ether to anyone who asks
    function withdraw(uint256 withdraw_amount) public {
        require(
            withdraw_amount < 0.1 ether,
            "Faucet: Max withdrawl request is 0.1 ether"
        );
        // check for sufficient funds
        require(
            address(this).balance >= withdraw_amount,
            "Faucet: Insufficient balance for withdrawl request"
        );
        msg.sender.transfer(withdraw_amount);
        emit Withdrawl(msg.sender, withdraw_amount);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
