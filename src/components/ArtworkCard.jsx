import Button from "@mui/material/Button";

// ** This is each artwork displayed in the main gallery **

export default function ArtworkCard({ artwork, onViewDetails }) {
  return (
    <div className="gallery">
      <div className="g-image-wrapper">
        <img src={artwork.img} alt="Gallery Artwork" />
      </div>
      <div className="g-description">
        <p className="g-desc-smaller">"{artwork.title}"</p>
        <p>Artist: {artwork.artist}</p>
        <p className="g-desc-smaller">{artwork.source}</p>
      </div>
      <Button onClick={() => onViewDetails(artwork)}>View More</Button>
    </div>
  );
}
