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
   //  if (!user) history.push(`/`);


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
            setLatitude(spotInfo.lat);
            setLongitude(spotInfo.lng);
            setDescription(spotInfo.description)
            setTitle(spotInfo.name)
            setPrice(spotInfo.price)
            setImage(spotInfo.SpotImages[0].url)
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
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateCountry = (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateImage = (e) => setImage(e.target.value)

    // if (!Object.entries(obj).length > 0){
    //     return null
    // }
    
    useEffect(() => {
        let errors = [];

        //errors to push
        if (country.length === 0) {
            errors.push("Country is required");
        }
        if (address.length === 0) {
            errors.push("Address is required");
        }
        if (city.length === 0) {
            errors.push("City is required");
        }
        if (state.length === 0) {
            errors.push("State is required");
        }
        if (latitude.length === 0) {
            errors.push("Latitude is required");
        }
        if (longitude.length === 0) {
            errors.push("Longitude is required");
        }
        if (description.length < 30) {
            errors.push("Description needs a minimum of 30 characters");
        }
        if (title.length === 0) {
            errors.push("Name is required");
        }
        if (price.length === 0) {
            errors.push("Price is required");
        }
        if (image.length === 0) {
            errors.push("Preview image is required");
        }



        setValidationErrors(errors);
    }, [country, address, city, state, latitude, longitude, description, title, price, image]);


  
    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (validationErrors.length) return
        const spot = {
            address: address,
            city: city,
            state: state,
            country: country,
            lat: latitude,
            lng: longitude,
            name: title,
            description: description,
            price: price,
            SpotImage: image
        }
        console.log('after update button',spot)
       let updatedSpot = await dispatch(updateSpotFunc(spotId, spot))
        
        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`);
        }
        setCountry('')
        setAddress('')
        setCity('')
        setState('')
        setTitle('')
        setDescription('')
        setPrice('')
        setImage('')
        setLatitude('')
        setLongitude('')
        setHasSubmitted(false);
    }

  return (
      <div className='top' >

          <form className="top-down" onSubmit={handleSubmit}>
              <h2>Update your Spot</h2>
              <h3>Where's you place located?</h3>
              <p>Guests will only get your exact address once they booked a reservation.</p>
              {hasSubmitted && validationErrors.length > 0 && (
                  <div>
                      The following errors were found:
                      <ul>
                          {validationErrors.map(error => (
                              <li style={{ color: 'red' }} key={error}>{error}</li>
                          ))}
                      </ul>
                  </div>
              )}
              <label>
                  Country{" "}
                  <input
                      type="text"
                      name="country"
                      value={country}
                      placeholder="Country"
                      onChange={updateCountry}
                  />
              </label>
              <label>
                  Street Address{" "}

                  <input
                      type="text"
                      name="streetAddress"
                      value={address}
                      placeholder="Street Address"
                      onChange={updateAddress}
                  />
              </label>
              <div className="formDown">
                  <div>
                      <div className='got'>
                          <label>
                              City
                              <input
                                  type="text"
                                  name="city"
                                  value={city}
                                  placeholder="City"
                                  onChange={updateCity}
                              />
                          </label>
                      </div>
                      <div className='got2'>
                          <label>
                              Latitude{" "}

                              <input
                                  type="text"
                                  name="latitude"
                                  value={latitude}
                                  placeholder="Latitude"
                                  onChange={(e) => setLatitude(e.target.value)}
                              />
                          </label>
                      </div>
                  </div>
                  <div>
                      <div >
                          <label>


                              State{" "}

                              <input
                                  type="text"
                                  name="state"
                                  value={state}
                                  placeholder="State"
                                  onChange={updateState}
                              />

                          </label>
                      </div>
                      <div>
                          <label>
                              Longitude{" "}

                              <input
                                  type="text"
                                  name="longitude"
                                  value={longitude}
                                  placeholder="Longitude"
                                  onChange={(e) => setLongitude(e.target.value)}
                              />
                          </label>
                      </div>
                  </div>
              </div>
              <label for="description">
                  <h3>Describe your place to guests:</h3>
                  <p>
                      Mention the best features of your space, any special amentities
                      like fast wifi or parking, and what you love about the
                      neighborhood.
                  </p>
                  <textarea
                      name="description"
                      id="description"
                      cols="30"
                      rows="10"
                      placeholder="Please write at least 30 characters"
                      onChange={updateDescription}
                      value={description}
                  >
                  </textarea>
              </label>
              <p>

              </p>
              <label>
                  <h3>Create a title for your spot</h3>
                  <p>
                      Catch guests' attention with a spot title that highlights what
                      makes your place special.
                  </p>
                  <input
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Name of your spot"
                      onChange={updateTitle}
                  />
              </label>

              <label>
                  <h3>Set a base price for your spot</h3>
                  <p>
                      Competitive pricing can help your listing stand out and rank
                      higher in search results.
                  </p>
                  <div className='anaDiv'>
                      <div>＄</div>
                      <div className='underanaDiv'>
                          <input
                              type="text"
                              name="price"
                              value={price}
                              placeholder="Price per night (USD)"
                              onChange={updatePrice}
                          />
                      </div>
                  </div>
              </label>

              <label>
                  <h3>Liven up your spot with photos</h3>
                  <p>
                      Competitive pricing can help your listing stand out and rank
                      higher in search results.
                  </p>
                  <input
                      type="text"
                      name="previewPhoto"
                      value={image}
                      placeholder="Preview Image URL"
                      onChange={updateImage}
                  />
              </label>

              <label>
                  <input
                      type="text"
                      name="photo1"
                      value=''
                      placeholder="Image URL"
                      onChange={(e) => alert('This future is coming, you can add preview image for now!!')}
                  />
              </label>
              <label>
                  <input
                      type="text"
                      name="photo2"
                      value=''
                      placeholder="Image URL"
                      onChange={(e) => alert('This future is coming, you can add preview image for now!!')}
                  />
              </label>
              <label>
                  <input
                      type="text"
                      name="photo3"
                      value=''
                      placeholder="Image URL"
                      onChange={(e) => alert('This future is coming, you can add preview image for now!!')}
                  />
              </label>
              <label>
                  <input
                      type="text"
                      name="photo4"
                      value=''
                      placeholder="Image URL"
                      onChange={(e) => alert('This future is coming, you can add preview image for now!!')}
                  />
              </label>
              <br />
              <div className='got2'>
                  <button className="subButton" type="submit">
                      Update Spot
                  </button>
              </div>
          </form>
      </div>
  )
}
