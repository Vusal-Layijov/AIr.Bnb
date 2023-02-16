import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createSpotFunc } from '../../store/spots';
import { useHistory } from 'react-router-dom';
export default function CreateNewSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] =useState('')

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateImage = (e) => setImage(e.target.value)
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const spot = {
      address:address,
      city:city,
      state:state,
      country:country,
      name:title,
      description:description,
      price:price,
      SpotImage:image
    }
    let createdSpot = await dispatch(createSpotFunc(spot))
    console.log(createdSpot)
    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`);
      
    }
    setCountry('')
    setAddress('')
    setCity('')
    setState('')
    setTitle('')
    setDescription('')
    setPrice('')
    setImage('')
  }

  return (
    <div>
      <h1>Create a new Spot</h1>
      <p>Where is your place located?</p>
      <form onSubmit={handleSubmit}>
     
        <label>
          Country
          <input
            type="text"
            placeholder='Country'
            value={country}
            onChange={updateCountry}
            required
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            placeholder='Address'
            value={address}
            onChange={updateAddress}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder='City'
            value={city}
            onChange={updateCity}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            placeholder='State'
            value={state}
            onChange={updateState}
            required
          />
        </label>
        <br></br>
        <h2>Describe your place to guests</h2>
        <label>
          Description
          <input
            type="text"
            placeholder='Description'
            value={description}
            onChange={updateDescription}
            min="30"
            required
          />
        </label>
        <br></br>
        <h2>Create a title for your spot</h2>
        <label>
          Name of you spot
          <input
            type="text"
            placeholder='Name of your spot'
            value={title}
            onChange={updateTitle}
            required
          />
        </label>
        <h2>Set a price for your spot</h2>
        <label>
          $
          <input
            type="number"
            placeholder='Price per night(USD)'
            value={price}
            onChange={updatePrice}
            required
          />
        </label>
        <h2>Liven up your spot with photos</h2>
        <label>
          Submit a link
          <input
            type="text"
            placeholder='Preview image URL'
            value={image}
            onChange={updateImage}
            required
          />
        </label>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  )
}
