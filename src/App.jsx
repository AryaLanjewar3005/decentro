import './App.css'
import Navigation from './components/navigation/navigation'

import CardAuction from './pages/card-auction/card-auction'
import GatchaPage from './pages/gatcha/gatcha'


function App() {
  let firebase = {
    cardName : "Rosaria: Goddess Of Investigation",
    imageURL : "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fcv0xvbk6mfs91.jpg",
  }

  return (
    <div className='bg-black p-2 h-screen'>
      <Navigation/>
      {/* <CardAuction information={firebase}/> */}
      <GatchaPage/>
    </div>
  )
}

export default App
