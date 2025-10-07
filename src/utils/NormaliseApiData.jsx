import no_img_avail from "../assets/no_img_avail.jpg";

// Both V&A & AIC serves images via a separate API that is compliant with the IIIF Image API 2.0 (https://iiif.io/api/image/2.0/) specification -> https://api.artic.edu/docs/#images

export const normaliseVA = (item) => {
  // this api has it's no images skipped in the fetch URL (images_exist=1)
  return {
    id: item.systemNumber,
    img:
      `https://framemark.vam.ac.uk/collections/${item._primaryImageId}/full/843,/0/default.jpg` ||
      no_img_avail,
    title: item._primaryTitle || "Untitled",
    artist: item._primaryMaker?.name || "Unknown",
    year: item._primaryDate || "Unknown",
    medium: item.objectType || "Unknown",
    source: "Victoria & Albert Museum",
    link: `https://collections.vam.ac.uk/item/${item.systemNumber}/`,
  };
};

export const normaliseAIC = (item) => {
  // skipping records with no images
  if (!item.image_id) return null;
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
    year: item.date_display || "Unknown",
    medium: item.artwork_type_title || "Unknown",
    source: "The Art Institute of Chicago",
    link: `https://www.artic.edu/artworks/${item.id}/`
  };
};
