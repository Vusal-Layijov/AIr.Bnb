import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Image from '../../Image/Image';
import CreateNewSpot from '../CreateNewSpot/CreateNewSpot';
import { Route } from 'react-router-dom';
import { useSearchParams } from '../../context/search';
import { setSpotsWithQuery } from '../../store/spots';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [openForm, setOpenForm] = useState(false)
    const {searchParams,setSearchParams}=useSearchParams('')
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
                  onChange={e=>setSearchParams(e.target.value)}
                  /><i class="fas fa-search" ></i>
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