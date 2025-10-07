import Button from "@mui/material/Button";

// ** This is each artwork displayed in the main gallery **

export default function ArtworkCard({ artwork, onViewDetails }) {
  return (
    <div className="gallery">
      <img src={artwork.img} />
      <div className="g-description">
        <p className="g-desc-smaller">"{artwork.title}"</p>
        <p>Artist: {artwork.artist}</p>
        <p>{artwork.source}</p>
        <Button onClick={() => onViewDetails(artwork)}>View More</Button>
      </div>
    </div>
  );
}
