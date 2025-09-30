import Button from "@mui/material/Button";

// ** This is each artwork displayed in the main gallery **

export default function ArtworkCard({ artwork, onViewDetails }) {
  return (
    <div className="gallery">
      <img src={artwork.image} />
      <div className="g-description">
        <p className="g-desc-smaller">"{artwork.title}"</p>
        <p>{artwork.artist}</p>
        <Button onClick={() => onViewDetails(artwork)}>View More</Button>
      </div>
    </div>
  );
}
