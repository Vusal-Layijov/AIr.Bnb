import React from 'react'
import logo from './IMG_5926.jpeg'
import './image.css'
export default function Image() {
    console.log('rendering image')
 
  return <img src={logo} alt='logo' className='logo' />
}
