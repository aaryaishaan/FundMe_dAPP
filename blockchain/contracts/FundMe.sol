// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./PriceConverter.sol";
contract FundMe {

   // INTERFACE, CONSTRUCTOR & VARIABLES
    AggregatorV3Interface internal reserveFeed;
    address public immutable i_owner;
    constructor() {
       i_owner = msg.sender;
        reserveFeed = AggregatorV3Interface(
            0xa81FE04086865e63E12dD3776978E49DEEa2ea4e
        );
    }
      uint256 public constant MIN_USD = 5* 1e18;
      address[] public funders;

     // Event for thank you message by owners to the funder.
      event ThankYouMsg(string message);

     // MODIFIER
    modifier ownerAcessOnly(){
      require( msg.sender == i_owner, "Unauthorized Transaction!");
      _;
     }

     using PriceConverter for uint256;

    // MAPPINGS
      mapping( address funder => uint256 amountFunded) public addressToAmount; // address of funder should reflect the amount donated by him/her.
      mapping(address funder => string message) public funderMsg;
   
     // MAIN LOGICS:


    // Fund Function for Tranfers with no message and when someone sends the eth directly.
    function fundWithMessage(string calldata _msg) public payable {
    require(msg.value.getConversionRate() >= MIN_USD, "Spend atleast ETH worth 5 USD");
    funders.push(msg.sender);
    addressToAmount[msg.sender] += msg.value;
    funderMsg[msg.sender] = _msg;
}

    function fund() public payable {
        require(  msg.value.getConversionRate() >= MIN_USD, "Spend atleast ETH worth 5 USD");
        funders.push(msg.sender);
        addressToAmount[msg.sender] += msg.value;
    }

    // FundWithMsg function with Transfers with message and when someone funds through frontend.

    // Ltst Reserve (might use in the frontend)
    function getLatestReserve() public view returns (int) {
        (
            ,
            int reserve,
            ,
            ,
            
        ) = reserveFeed.latestRoundData();
        return reserve;
    }

   
    // Withdraw Function:
   

function withdraw(string calldata _thankYou) public ownerAcessOnly {
        for( uint256 funderIndex=0; funderIndex<funders.length; funderIndex++)
        {
         address funder = funders[funderIndex];
        addressToAmount[funder]= 0;
        }
    funders = new address[](0); // resetting the array as the withdraw happens, the amount should obviously decrease
       // call
     (bool callSuccess,)= payable(msg.sender).call{value: address(this).balance}("");
     require( callSuccess,"Call Failed");
    emit ThankYouMsg(_thankYou);

    }
     
     // Fallbacks and Recieve

      fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }


}
