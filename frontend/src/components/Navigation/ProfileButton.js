import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
// <i className="fas fa-user-circle" />
    return (
        <>
            <div className="profile">
                <button onClick={openMenu}>
                    <i className="fas fa-user-circle" />
                </button>
            </div>
            <ul className={ulClassName} ref={ulRef}>
                {user ? ( user.username === 'Demo-lition' ? (
                    <>
                        <li>Demo User</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                    ) : (
                        <>
                            <li>{user.username}</li>
                            <li>Hello {user.firstName} {user.lastName}</li>
                            <li>{user.email}</li>
                            <li>
                                <button onClick={logout}>Log Out</button>
                            </li>
                        </>
                    )
                ) : (
                    <>
                        <li>
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;