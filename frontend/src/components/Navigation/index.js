import React, { useState, useEffect, } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Image from '../../Image/Image';
import CreateNewSpot from '../CreateNewSpot/CreateNewSpot';
import { Route } from 'react-router-dom';
import { useSearchParams } from '../../context/search';
import { setSpotsWithQuery } from '../../store/spots';
import { useHistory } from 'react-router-dom';
//import { search } from '../../../../backend/routes/api/spots';

function Navigation({ isLoaded }) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const [openForm, setOpenForm] = useState(false)
    const {searchParams,setSearchParams}=useSearchParams('')
    const search = () =>{
        history.push(`/filteredspots/?q=${searchParams}`)
        //setSearchParams('')
    }
    function handleKeyPress (e){
        if(e.key==='Enter') search()
    }
    return (
        
            <div className='headerStyle'>
                <div style={{marginLeft:'50px'}}>
                    <NavLink style={{ marginLeft: '50px', }} exact to="/"><Image /></NavLink>
                </div>
                <div className='inputDiv'>
                <input 
                  className='forInput'
                  type='text'
                  placeholder='Where...'
                  value={searchParams}
                  onChange={e=>setSearchParams(e.target.value)}
                  onKeyPress={handleKeyPress}
                /><div className='searchDiv'><i onClick={search} className="fas fa-search search-icon" ></i></div>
                </div>
                {isLoaded && (
                    <div className='navStyle'>
                        <div> {sessionUser && <NavLink to={'/spots/new'} style={{ textDecoration: 'none', }} ><h4 style={{ fontStyle: 'italic', marginTop: '5px', marginRight: '10px' }}>Create a New Spot</h4> </NavLink>

                        }</div>
                        <div className='forProfile'>  <ProfileButton user={sessionUser} /> </div>
                    </div>
                )}

            </div>
        
    );
}

export default Navigation;