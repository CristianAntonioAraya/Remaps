import { useState, useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const useMapbox = ( initialState ) => {
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3R3IiwiYSI6ImNsNW9sYWJhMzBoOGUzYnBxM3A4OHRrYjUifQ.Dsr--WXWPwsAnzRxz1U9lA';
    
    const mapContainer = useRef()
    const setRef = useCallback( (node) => {
        mapContainer.current = node;
    } )

    const mapRef = useRef();
    const [coords, setCoords] = useState( initialState )

    useEffect(() => {
    
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coords.lng, coords.lat], 
            zoom: coords.zoom
        });
        
        mapRef.current = map;
    
    }, [])
    
    useEffect(() => {
      
        mapRef.current?.on('move', () => {
            const {lng, lat} = mapRef.current.getCenter();
            setCoords({ lng: lng.toFixed(4), lat: lat.toFixed(4), zoom: mapRef.current.getZoom().toFixed(2)})
        })
        
    }, [])


    return {
        coords,
        setRef
    }
}

export default useMapbox


