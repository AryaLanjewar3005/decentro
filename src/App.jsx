import './App.css'
import Navigation from './components/navigation/navigation'
import IfpsUpload from './components/utils/ipfs/ipfs'

import CardAuction from './pages/card-auction/card-auction'
import CardAuctionPage from './pages/card-auction/card-auction-page'
import GatchaPage from './pages/gatcha/gatcha'


function App() {
  let firebase = [
    {
      cardName: "Rosaria: Goddess Of Investigation",
      imageURL: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fcv0xvbk6mfs91.jpg",
    },

    {
      cardName: "Rosaria: Goddess Of Investigation",
      imageURL: "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fcv0xvbk6mfs91.jpg",
    }
  ]

  return (
    <div className='bg-black p-2 h-screen'>
      <Navigation />
      <CardAuctionPage cardList={firebase} />
    </div>
  )
}

export default App
