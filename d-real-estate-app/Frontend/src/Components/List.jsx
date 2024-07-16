import "../Styles/List.scss"
import {listData} from "../Lib/dummyData.js"
import {Card} from "../Components"
const List = () => {
  return (
    <div className='list'>
    {listData.map(item=>(
      <Card key={item.id} item={item}/>
    ))}
  </div>
  )
}

export default List
