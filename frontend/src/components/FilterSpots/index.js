import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { useSearchParams } from "../../context/search"
import './index.css'
import SpotsMap from "../Map"
import SetFilteredSpots from "./FilteredSpots"
import { setSpotsWithQuery } from "../../store/spots"

export default function FilterSpots(){
    const { searchParams, setSearchParams } = useSearchParams('')
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots.allSpots))
    useEffect(() => {
        const timer = setTimeout(() => {
            
            dispatch(setSpotsWithQuery(searchParams))
        },1000)
        return () => clearTimeout(timer)
    }, [dispatch,searchParams])
    if (!spots) {
        return null
    }
    
    return(
        <div id="business_ccontainer" >
            <section id="business_gallery" >
            <SetFilteredSpots spots ={spots} />
            </section>
            <section id="business_map" >
            <SpotsMap spots={spots} />
            </section>
        </div>
    )
}