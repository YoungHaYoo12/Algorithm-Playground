import React from "react";
function ImageOverlay(image, text) {
  return (
    <div className="content_img">
      <img
        src={image}
        alt="Not Loading"
        width="100%"
        style={{ display: "block" }}
      />
      <div>{text}</div>
    </div>
  );
}

export default ImageOverlay;
