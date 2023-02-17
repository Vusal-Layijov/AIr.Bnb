import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateSpotFunc } from '../../store/spots';
import { setAllSpots, setCurrentUserSpotsFunc, setOneSpotDetails } from '../../store/spots';
export default function UpdateSpot() {
    const {spotId} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.allSpots[spotId])

    let user;
    user = useSelector((state) => state.session.user);
     if (!user) history.push(`/`);


    let obj = {}
   
    obj = useSelector((state) => {
        return state.spots.singleSpot;
    });


    useEffect(() => {
        const stateAdd = async () => {
            let spotInfo = await dispatch(setOneSpotDetails(spotId));

            setCountry(spotInfo.country)
            setAddress(spotInfo.address)
            setCity(spotInfo.city)
            setState(spotInfo.state)
            // setLatitude(spotInfo.lat);
            // setLongitude(spotInfo.lng);
            setDescription(spotInfo.description)
            setTitle(spotInfo.name)
            setPrice(spotInfo.price)
        }
        stateAdd()
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(setCurrentUserSpotsFunc())
    // }, [dispatch])
      let isOwner = true
      if(Object.keys(obj).length >0 && obj.ownerId !== user.id) isOwner = false
      if(isOwner === false) history.push('/')



   
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    // spot ? setCountry(spot.country) : setCountry('')
    // spot ? setAddress(spot.address) : setAddress('')
    // spot ? setCity(spot.city) : setCity('')
    // spot ? setState(spot.state) : setState('')
    // spot ? setTitle(spot.name) : setTitle('')
    // spot ? setDescription(spot.description) : setDescription('')
    // spot ? setPrice(spot.price) : setPrice('')
    const updateCountry = (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateImage = (e) => setImage(e.target.value)

    if (!Object.entries(obj).length > 0){
        return null
    }
    

  
    const handleSubmit = async (e) => {
        e.preventDefault()
        const spot = {
            address: address,
            city: city,
            state: state,
            country: country,
            name: title,
            description: description,
            price: price,
           // SpotImage: image
        }
        console.log('after update button',spot)
       let updatedSpot = await dispatch(updateSpotFunc(spotId, spot))
        
        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`);
        }
        // setCountry('')
        // setAddress('')
        // setCity('')
        // setState('')
        // setTitle('')
        // setDescription('')
        // setPrice('')
        // setImage('')
    }

  return (
      <div>
          <h1>Update your Spot</h1>
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
      
              <button type="submit">Update Spot</button>
          </form>
      </div>
  )
}
