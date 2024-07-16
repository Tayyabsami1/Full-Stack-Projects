import SearchBar from "../Components/SearchBar"
import "../Styles/HomePage.scss"

const HomePage = () => {
  return (
    <div className="Home">
      <div className="textContainer">
        <div className="wrapper">
          <h1>Find Real Estate & Get Your Dream Place</h1>
          <p>Turn the dream of your perfect property into a reality.  We offer a diverse range of listings to suit any lifestyle, with expert guidance to navigate the buying or selling process.  Start your search today and discover your next chapter!</p>
          <SearchBar />

          <div className="boxes">

            <div className="box">
              <h2>16+</h2>
              <p>Years of Experience</p>
            </div>

            <div className="box">
              <h2>200</h2>
              <p>Awards Gained</p>
            </div>

            <div className="box">
              <h2>1200+</h2>
              <p>Property Ready</p>
            </div>
            
          </div>
        </div>
      </div>
      <div className="imageContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  )
}

export default HomePage
