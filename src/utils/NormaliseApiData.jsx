import no_img_avail from "../assets/no_img_avail.jpg";

export const normaliseMet = (item) => {
  return {
    id: item.objectID,
    img: item.primaryImage || item.primaryImageSmall || no_img_avail,
    title: item.title || "Untitled",
    artist: item.artistDisplayName || "Unknown",
    medium: item.medium || "Unknown",
    source: "The Met",
  };
};

// AIC serves images via a separate API that is compliant with the IIIF Image API 2.0 (https://iiif.io/api/image/2.0/) specification -> https://api.artic.edu/docs/#images

export const normaliseAIC = (item) => {
  const iiifBase = item.config?.iiif_url || "https://www.artic.edu/iiif/2";
  const imageId = item.image_id;
  const img = imageId
    ? `${iiifBase}/${imageId}/full/843,/0/default.jpg`
    : no_img_avail;
  return {
    id: item.id,
    img,
    title: item.title || "Untitled",
    artist: item.artist_title || "Unknown",
    medium: item.artwork_type_title || "Unknown",
    source: "The Art Institute of Chicago",
  };
};
