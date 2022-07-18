import { useState, useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { v4 } from 'uuid';
import { Marker } from 'mapbox-gl';

const useMapbox = ( initialState) => {
    
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

    useEffect(() => {

        mapRef.current?.on('click', (e) => {
            const { lng, lat } = e.lngLat;
            const marker = new Marker()
            marker.id = v4()
            marker.setLngLat([ lng, lat ])
            .addTo( mapRef.current )
            .setDraggable( true )
            
        })

      
    }, [])
    



    return {
        coords,
        setRef
    }
}

export default useMapbox


