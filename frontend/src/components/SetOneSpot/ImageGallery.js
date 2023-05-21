import SpotsMap from "../Map"
import './SetOneSpot.css'
export default function ImageGallery({images,spots}){
    return (
        <div className="single-spot-gallery" >
            <>
            {images.map(img=> (
                <div key={img.id} id={images.length===1 ? 'second':''} className={img.preview ? "main-tile":"small-tile"}>
                    <img className="gallery-image-div" src={img.url} />
                </div>
            ))

            }
            <div className="second-tile" >
                <SpotsMap spots={spots} />
            </div>
            </>
        </div>
    )
}