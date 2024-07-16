import "../Styles/Filter.scss";

const Filter = () => {
    return (
        <div className="filter">
            <h1>Search results for <b>Pakistan</b></h1>

            <div className="top">
                <label htmlFor="city">Location</label>
                <input type="text" id="city" name="city" placeholder="City Location" />
            </div>

            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type">
                        <option value="">any</option>
                        <option value="">Buy</option>
                        <option value="">Rent</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="Property">Property</label>
                    <select name="Property" id="Property">
                        <option value="">any</option>
                        <option value="">Apartement</option>
                        <option value="">House</option>
                        <option value="">Condo</option>
                        <option value="">Land</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input type="number" id="minPrice" name="minPrice" min={0} placeholder="any" />
                </div>

                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input type="number" id="maxPrice" name="maxPrice" min={0} placeholder="any" />
                </div>

                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input type="number" id="bedroom" name="bedroom" min={0} placeholder="any" />
                </div>
                <button>
                    <img src="/search.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default Filter
