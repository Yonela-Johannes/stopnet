import GuildPage from "./pages/guild-page"
import HomePage from "./pages/home-page"
import { Routes, Route } from "react-router-dom"

function App() {
  return ( 
      <Routes>
        {/* <Route exact path="/" element={<HomePage />} /> */}
        <Route exact path="/" element={<GuildPage />} />
      </Routes>
  )
}

export default App
