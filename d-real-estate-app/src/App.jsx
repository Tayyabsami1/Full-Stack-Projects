import Navbar from "./Components/Navbar"
import "./layout.scss"
import HomePage from "./Pages/HomePage"
function App() {
  return (
    <div className="layout">
      
      <div className="navbar">
        <Navbar />
      </div>

      <div className="content">
        <HomePage />
      </div>
    </div>
  )
}

export default App