import "../Styles/SearchBar.scss";
import { useState } from "react";
const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "Buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  })
  return (
    <div className="SearchBar">
      <div className="types">
        <button onClick={() => setQuery({ ...SearchBar, type: "Buy" })} className={query.type === "Buy" ? "selected" : ""}>Buy</button>
        <button onClick={() => setQuery({ ...SearchBar, type: "Rent" })} className={query.type === "Rent" ? "selected" : ""}>Rent</button>
      </div>
      <div className="form">
        <input type="text" name="Location" placeholder="City Location" />
        <input type="number" name="Min Price" min={0} max={100000000} placeholder="Min Price" />
        <input type="number" name="Max Price" min={0} max={100000000} placeholder="Max Price" />
        <div className="imgWrapper">

          <img src="/search.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
