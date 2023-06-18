import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { useSearchParams } from "../../context/search"
import './index.css'
import SpotsMap from "../Map"

export default function FilterSpots(){
    const { searchParams, setSearchParams } = useSearchParams('')
    
    return(
        <div id="business_ccontainer" >
            <section id="business_gallery" >

            </section>
            <section id="business_map" >
            
            </section>
        </div>
    )
}