import CardAuction from "./card-auction";

const CardAuctionPage = ({ cardList }) => {
  return (
    <div>

      {cardList.map((card, index) => (
        <CardAuction key={index} information={card} />)
      )}
    </div>
  )
}
export default CardAuctionPage;
