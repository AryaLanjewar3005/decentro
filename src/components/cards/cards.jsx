const Cards = ({ rarity }) => {
    let cardType;
    if (rarity === 'common') {
        cardType = 'bg-blue-500';
    } else if (rarity === "super-rare") {
        cardType = 'bg-yellow-500';
    } else if (rarity == "rare") {
        cardType = 'bg-purple-500';
    }
    const selectCard = () => {
        console.log("Card selected")
    }

    return (
        <div className="hover:scale-110 transition-all" onClick={selectCard}>
            {/* Cards outer container of rarity */}
            <div className={`${cardType} w-80 h-[400px] p-4`}>
                {/* Inner picture */}
                <div className={` h-full w-full bg-white `}>
                    <div className="">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards;
