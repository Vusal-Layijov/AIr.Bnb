import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { useSearchParams } from "../../context/search"



export default function FilterSpots(){
    const { searchParams, setSearchParams } = useSearchParams('')
    // console.log('------.-> search paramsssss',searchParams)
    return(
        <h1>Search features are coming</h1>
    )
}