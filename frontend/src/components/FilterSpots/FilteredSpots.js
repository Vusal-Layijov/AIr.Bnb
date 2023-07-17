import { setSpotsWithQuery } from "../../store/spots"
import { NavLink } from "react-router-dom"
import './index.css'
export default function SetFilteredSpots({spots}){
    return (


        <div className='forFirst2'>
            {spots.map((spot) => {
                return (
                    <nav key={spot.id} className='forNew'>
                        <NavLink style={{ textDecoration: 'none' }} className='fornav' to={`/spots/${spot.id}`}>
                            <div >
                                <div className='spotclass' >
                                    <img src={spot.previewImage} className='forimage'></img>
                                </div>
                                <div className='forinside'>
                                    <div>{spot.city}, {spot.state}</div>
                                    <div>{spot.avgRating ? `⭐️ ${parseFloat(spot.avgRating).toFixed(1)}` : '⭐️ New'}</div>
                                </div>
                                <div>
                                    <p>${spot.price} night</p>
                                </div>
                            </div>
                        </NavLink>
                    </nav>
                )
            })}
        </div>




    )
}