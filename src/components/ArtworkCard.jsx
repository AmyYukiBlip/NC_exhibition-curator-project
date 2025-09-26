import { Link } from "react-router-dom";

export default function ArtworkCard({ artwork }) {
  return (
    <div className="gallery">
      <img src={artwork.image} />
      <div className="description">
        <p className="g-desc-smaller">"{artwork.title}"</p>
        <p>{artwork.artist}</p>
        {/* <p className="g-desc-smaller">{artwork.location}</p> */}
        <Link to={`/artworks/${artwork.id}`} className="g-link">View More</Link>
      </div>
    </div>
  );
}
