import React from 'react'

import useMapbox from '../hooks/useMapbox';

const initialState = {
    lng: -71.2084,
    lat: -29.9224,
    zoom: 12
}

const MapPage = () => {

    const { coords, setRef } = useMapbox( initialState );
    
    return (
        <div>
            <div ref={ setRef } className='map__container'/>
            <div className='map__info'>long:{ coords.lng} | Lat:{ coords.lat} | Zoom: { coords.zoom}</div>
        </div>
    )
}

export default MapPage