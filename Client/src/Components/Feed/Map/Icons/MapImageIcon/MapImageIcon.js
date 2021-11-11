import ReactDOMServer from "react-dom/server";
import "./MapImageIcon.css";
import React from "react";
import L from "leaflet";

const MapImageIcon = (url='') => {
    return L.divIcon({
      className: "custom-icon",
      html: ReactDOMServer.renderToString(
        <div>
          <img
            alt='error'
            className="ui rounded image border customImageIcon"
            src={url}
          />
        </div>
      ),
    });
};

export default MapImageIcon;