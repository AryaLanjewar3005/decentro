// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./Decentro.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface DecentroMainInterface {
    function cardPurchaseRequest(uint _cardID) external payable;
    function getCardInfo(uint _cardID) external view returns (uint, string memory);
    function currentCardCountFn() external view returns (uint);
}

contract Player {
    using SafeMath for uint256;

    address public player;
    address public mainContract;
    mapping(uint => bool) public myCardsCollection;
    uint public lastCardObtainedTime;
    uint public cardObtainCooldown = 1 days; // 1 day cooldown for obtaining a new card

    constructor(address _player, address _mainContract) {
        player = _player;
        mainContract = _mainContract;
    }

    function cardPurchaseRequest(uint _cardID) public payable {
        address mainContractAddress = mainContract;
        (bool success, ) = mainContractAddress.call{value: msg.value}(
            abi.encodeWithSignature("cardPurchaseRequest(uint256)", _cardID)
        );
        require(success, "Card purchase failed");

        myCardsCollection[_cardID] = true;
    }

    function getCardInfo(uint _cardID) public view returns (uint, uint, string memory) {
        address mainContractAddress = mainContract;
        (bool success, bytes memory data) = mainContractAddress.staticcall(
            abi.encodeWithSignature("getCardInfo(uint256)", _cardID)
        );

        require(success, "Failed to get card info from main contract");

        (uint cardID, uint cardPrice, string memory ipfsHash) = abi.decode(data, (uint, uint, string));
        return (cardID, cardPrice, ipfsHash);
    }

    function generateAndFetchRandomCard() public {
        uint currentCardCount = DecentroMainInterface(mainContract).currentCardCountFn();

        require(currentCardCount > 0, "No cards available");

        require(block.timestamp.sub(lastCardObtainedTime) >= cardObtainCooldown, "You can only obtain one card per day");

        uint randomCardId;
        do {
            randomCardId = uint(keccak256(abi.encodePacked(block.timestamp, block.number))) % currentCardCount;
        } while (myCardsCollection[randomCardId]);

        (uint cardPrice, string memory ipfsHash) = DecentroMainInterface(mainContract).getCardInfo(randomCardId);


        myCardsCollection[randomCardId] = true;
        lastCardObtainedTime = block.timestamp;

    }
}
