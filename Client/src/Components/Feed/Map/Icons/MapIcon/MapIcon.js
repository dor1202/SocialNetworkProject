import ReactDOMServer from "react-dom/server";
import React from "react";
import L from "leaflet";

const MapIcon = () => {
    return L.divIcon({
      className: "custom-icon",
      html: ReactDOMServer.renderToString(
        <div>
          <i className="purple large map marker icon" />
        </div>
      ),
    });
};

export default MapIcon;