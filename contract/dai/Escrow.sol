//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Escrow {
    IERC20 public _token;

    constructor (address ERC20Address) {
        _token = IERC20(ERC20Address);
    }
}