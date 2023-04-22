import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import './index.css'
import { useHistory } from "react-router-dom";

const libraries = ['places', 'geometry', 'marker']

function Map({spots}){
    console.log('map-------------->',spots)
    const history = useHistory()
    const [address, setAddress] = useState('')
    const [coordinates, setCoordinates] = useState({lat:null, lng:null})
    const [currentPosition, setCurrentPosition] =useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries:libraries
    })
    if(!isLoaded || !spots[0]) return <div>Loading....</div>

    return (
        <>
        <GoogleMap zoom={9} center={{lat:40, lng:-120}} mapContainerClassName="map-container" >
            {spots.map(spot => (
                <Marker animation='BOUNCE' onClick={() => history.push(`/spots/${spot.id}`)} title={spot.name} position={{lat:+spot.lat,lng:+spot.lng}} />
            ))

            }
        </GoogleMap>
        </>
    )

}


// function Map({ spots }) {
//     const { isLoaded, loadError } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//         libraries: ['places', 'geometry', 'marker']
//     });
//     const history = useHistory()
//     const onLoad = (map) => {
//         console.log('map:', map);
//     };

//     if (loadError) return <div>Error loading maps</div>;
//     if (!isLoaded || !spots[0]) return <div>Loading....</div>;

//     return (
//         <>
//             <GoogleMap zoom={9} center={{ lat: 40, lng: -120 }} mapContainerClassName="map-container" onLoad={onLoad}>
//                 {spots.map(spot => (
//                     <Marker animation='BOUNCE' onClick={() => history.push(`/spots/${spot.id}`)} title={spot.name} position={{ lat: +spot.lat, lng: +spot.lng }} />
//                 ))}
//             </GoogleMap>
//         </>
//     );
// }
// export default Map

function createCenterControl(myMap){
    const newYork = { lat: 40.7128, lng: -74.0060 }
    const controlButton = document.createElement("button")
    controlButton.classList.add("buttonStyle")
    controlButton.textContent = "Center Map";
    controlButton.title = "Click to recenter the map";
    controlButton.type = "button";
    controlButton.addEventListener("click", () => {
        myMap.setCenter(newYork);
    });

    return controlButton;
}
function initMap(spots) {
    const map = new window.google.maps.Map(document.getElementById("map"),{
        zoom:4,
        center: { lat: 40.7128, lng: -74.0060 },
        styles: [
            {
                featureType: "poi",
                stylers: [{ visibility: "off" }],
            },
        ],
    })
    const bounds = new window.google.maps.LatLngBounds();
    const markers = [];

    const centerControlDiv = document.createElement("div");
    const centerControl = createCenterControl(map);
    centerControlDiv.appendChild(centerControl);
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
        centerControlDiv
    );
    let index = 1

    spots.forEach((business) => {
        if (business && business.lat && business.lng) {
            const marker = new window.google.maps.Marker({
                position: { lat: Number(business.lat), lng: Number(business.lng) },
                map,
                optimized: false,
                label: {
                    text: `${index}`,
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    className: 'marker-label',
                    width: '100px',
                    height: '30px',
                    background: {
                        color: 'white',
                        opacity: 1
                    },
                    borderRadius: '50%',
                    padding: '5px 8px',
                    boxShadow: '0px 0px 3px #33333333',
                    zIndex: '1'
                },
                icon: null,
                businessId: business.id
            });
            index++

            markers.push(marker);
            bounds.extend(marker.getPosition());

            const infowindow = new window.google.maps.InfoWindow({
                content: `
          <a href="/spots/${business.id}" class="infowindow">
            <div class="infowindow-title">${business.name}</div>
            <div class="infowindow-image-container">
              <img src="${business.previewImage}" alt="Preview Image" class="infowindow-image">
            </div>
          </a>
        `,
            });

            // marker.addListener("click", () => {
            //     infowindow.open(map, marker);
            //     window.location.href = `/spots/${business.id}`;
            // });
            marker.addListener("mouseover", () => {
                infowindow.open(map, marker);
            });
            marker.addListener("mouseout", () => {
                infowindow.close();
            });
        }
    });

    map.fitBounds(bounds);

    markers.forEach((marker) => {
        marker.addListener("click", () => {
            window.location.href = `/spots/${marker.businessId}`;
        });
    });
}

// function SpotsMap({ spots }) {

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
//         script.async = true;
//         script.onload = () => {
//             initMap(spots);
//         };

//         document.head.appendChild(script);

//         return () => {
//             document.head.removeChild(script);
//         };
//     }, [spots]);

//     window.initMap = initMap;

//     return <div id="map" className="map"></div>;
// }
function SpotsMap({ spots }) {
  useEffect(() => {
    // Check if Google Maps API has already been loaded
    if (!window.google || !window.google.maps) {
      // Load Google Maps API
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      script.async = true;
      script.onload = () => {
        initMap(spots);
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      // Google Maps API is already loaded, so just call initMap directly
      initMap(spots);
    }
  }, [spots]);

  return <div id="map" className="map"></div>;
}
export default SpotsMap