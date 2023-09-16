import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import L, { divIcon } from "leaflet"
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import ReactDOMServer from 'react-dom/server';
import * as FaIcons from "react-icons/fa";
import "leaflet/dist/leaflet.css"
import { Button } from '@mui/material';

function Map() {
  const mapRef = useRef()
  const [markers, setMarkers] = useState([])
  const center = [2100.0, 500.0]
  
  useNuiEvent("addMarker", (data) => {
    setMarkers([...markers, data])
  })

  return (
    <MapContainer crs={L.extend({}, L.CRS.Simple, {
      projection: L.Projection.LonLat,
      scale: function(zoom) {
        return Math.pow(2, zoom);
      },
      zoom: function(sc) {
        return Math.log(sc) / 0.6931471805599453;
      },
      distance: function(pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
      },
      transformation: new L.Transformation(0.02072, 117.3, -0.0205, 172.8),
      infinite: true
    })} preferCanvas={true} minZoom={2} maxZoom={5} center={center} zoom={2} ref={mapRef}>
      <TileLayer 
        url="https://dvexdev.github.io/mapstyles/{z}/{x}/{y}.jpg"
      />
    {markers?.map(data =>
      <Item data={data}/>
    )}

    </MapContainer>
  );
}

const Item = ({data}) => {
  const position = [data.coords.y, data.coords.x]

  return (
    <Marker key={data.id} icon={divIcon({
      className: 'bigger',
      html: `<div style="display: flex; align-items: center; gap: 4px;">
        <div style="color: #0d47a1; font-size: 20px;">`+ ReactDOMServer.renderToString(React.createElement(FaIcons["FaMapPin"])) +`</div>
        <div style="color: white; font-size: 20px; margin-top: 1px;" class="dispatch-infos-text">${data.id}</div>
      </div>
      `,
    })} position={position}>
    </Marker>
  )
}

export default Map