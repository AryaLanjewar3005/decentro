// SPDX-License-Identifier: MIT
pragma solidity 0.8;
import "./Player.sol";


contract decentroMain {
    
    event PlayerContractCreated(address indexed player, address playerContract); // Emit the player contract address
    event CardCreated(uint indexed cardId, uint cardPrice, string ipfsHash);
    event CardPurchased(address indexed player, uint indexed cardId);

    mapping(address => address) public ContractsOfPlayers; // stores the mapping of players to their respective deployed contract
    struct cardInfo {
        uint cardID;
        uint cardPrice;
        string ipfsHash;
    }
    mapping (uint => cardInfo) public cardsCollection; //Total card collection
    mapping (uint => bool) public myCardsCollection; // Individual card collection of players 
    uint currentCardCount = 0; //Card collection count
    // When contract creates player's individual contracts
    function deployPlayersContract(address _player) private returns (address) {
        address newPlayersContract = address(new Player(_player, address(this)));
        emit PlayerContractCreated(_player, newPlayersContract);
        return newPlayersContract;
    }
    // When players create their contract
    function accountRequest() public {
        address contractAddress = deployPlayersContract(msg.sender);
        ContractsOfPlayers[msg.sender] = contractAddress;
    }
    function cardPurchaseRequest(uint _cardID) payable public {
        cardInfo storage cards = cardsCollection[_cardID];
        require(msg.value > cards.cardPrice);
        myCardsCollection[_cardID] = true;
        emit CardPurchased(msg.sender, _cardID);
    }
    function makeCard (uint _cardPrice, string memory _ipfsHash) public {
        _createCard("common", _cardPrice, _ipfsHash);
    }

    // Private function called by makeCard function to add the card to the database.
    function _createCard(string memory _rarity, uint _price, string memory _ipfsHash) private {
        currentCardCount++;
        uint8 cardPrefix;
        
        if (compareStrings(_rarity, "common")) {
            cardPrefix = 0;
        } else if (compareStrings(_rarity, "rare")) {
            cardPrefix = 1;
        } else if (compareStrings(_rarity, "epic")) {
            cardPrefix = 2;
        } else {
            revert("Invalid rarity");
        }

        uint upcomingCardIdNumber = cardPrefix * 1000 + currentCardCount;
        cardsCollection[upcomingCardIdNumber] = cardInfo(upcomingCardIdNumber, _price, _ipfsHash );
        emit CardCreated(upcomingCardIdNumber, _price, _ipfsHash);
    }
   
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
    return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function currentCardCountFn() external view returns (uint) {
        return currentCardCount;
    }
    function getCardInfo(uint cardID) external view returns (uint, string memory) {
        cardInfo memory card = cardsCollection[cardID];
        return (card.cardPrice , card.ipfsHash);
    }

}