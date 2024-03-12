import { Link } from 'react-router-dom'
import "../css/banner.css"

export const PageBanner = ({page, image, search = "Productos"}) => {
  return (
    <div className='banner-container' style={{backgroundImage: `url("${image}")`}}>
        <div className='banner-details'>
            <h2>{page}</h2>
            <div>
                <Link to="/">Home</Link> / {search}
            </div>
        </div>
    </div>
  )
}
