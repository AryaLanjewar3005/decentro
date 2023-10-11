import Cards from "../../components/cards/cards";
import Button from "../../components/utils/button/button";
import Incrementor from "../../components/utils/incementor";

const CardAuction = ({information}) => {
  return (
    // main container of card-auction page
    <div className="bg-black p-20 flex w-full justify-between items-center">
      <Cards rarity="common" />
      <div className="flex w-full flex-col">
        <h1 className="self-center text-white text-4xl text-center ">
          {information.cardName}
        </h1>
        <div className="border-l-2 border-white  ml-20 mt-20 p-4">
          <p className="text-white">
            The central conflict that the organization is a part of is reflected
            in VALORANT's core gameplay (one team seeking to detonate a spike
            and steal surrounding radianite, the other defending their
            homeland), but the games and round-by-round fights played by players
            are not canon themselves and have no effect on the lore. Not every
            aspect of gameplay is required to be justified and canonized into
            the lore, nor does gameplay need to adhere to how things would
            "realistically" (in the context of the VALORANT universe) work
            within canon lore.{" "}
          </p>
        </div>
        {/* Power level and other stuff */}
        <div className="ml-20 mt-20 p-4 flex justify-between">
            {/* For power bidding  */}
          <div>
            <h3 className="text-white text-lg">Bid Power Level</h3>
            <Incrementor />
          </div>
          <Button title="Vote/Bid"/>
        </div>
      </div>
    </div>
  );
};

export default CardAuction;
