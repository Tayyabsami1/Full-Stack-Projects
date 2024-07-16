import "../Styles/ListPage.scss"
import { listData } from "../Lib/dummyData.js"
import { Filter,Card ,Map } from "../Components"

const ListPage = () => {
  const data=listData;
  return (
    <div className="ListPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>

      
      <div className="mapContainer">
        <Map items={data}/>
      </div>
    </div>
  )
}

export default ListPage
