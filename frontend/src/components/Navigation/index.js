import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Image from '../../Image/Image';
function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='headerStyle'>
            <div>
                <NavLink exact to="/"><Image /></NavLink>
            </div>
            {isLoaded && (
                <div>
                    <ProfileButton user={sessionUser} />
                </div>
            )}
        </div>
    );
}

export default Navigation;