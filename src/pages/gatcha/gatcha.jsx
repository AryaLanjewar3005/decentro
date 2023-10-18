import Cards from "../../components/cards/cards"


const GatchaPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl">Choose card!</h1>
            <div className="flex space-x-2">
                <Cards rarity="common" />
                <Cards rarity="rare" />
                <Cards rarity="super-rare" />
            </div>
        </div>
    )
}
export default GatchaPage 
