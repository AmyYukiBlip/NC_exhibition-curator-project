import { Link } from "react-router-dom";

// ** This is each artwork displayed in the main gallery **

export default function ArtworkCard({ artwork, onViewDetails }) {

  return (
    <div className="gallery">
      <img src={artwork.img} alt={artwork.title}/>
      <div className="g-description">
        <p className="g-desc-smaller">"{artwork.title}"</p>
        <p><strong>Medium:</strong> {artwork.medium}</p>
        <p><strong>Artist:</strong> {artwork.artist}</p>
        <p>{artwork.source}</p>
        {/* <Link to={`/public/collection/v1/objects/${artwork.objectID}`}> */}
        <Link to={onViewDetails} >
          View More
        </Link>
      </div>
    </div>
  );
}
