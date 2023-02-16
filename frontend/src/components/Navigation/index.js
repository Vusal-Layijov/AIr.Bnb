import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Image from '../../Image/Image';
import CreateNewSpot from '../CreateNewSpot/CreateNewSpot';
import { Route } from 'react-router-dom';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [openForm, setOpenForm] = useState(false)
    return (
    <>    
        <div className='headerStyle'>
            <div>
                <NavLink exact to="/"><Image /></NavLink>
            </div>
            {isLoaded && (
                <div className='headerStyle'>
                    <NavLink to={'/spots/new'} > <button >Create a new Spot</button></NavLink> 
                    <ProfileButton user={sessionUser} />
                </div>
            )}
           
        </div>
    
    </>    
    );
}

export default Navigation;