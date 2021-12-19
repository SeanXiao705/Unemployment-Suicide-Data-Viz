import React from 'react';
import mapboxgl from 'mapbox-gl';
import "./../styles/MapBox.css";

const MapBox = () => {
    React.useEffect(() => {

        mapboxgl.accessToken = 'pk.eyJ1IjoicWl5dW56aGFuZyIsImEiOiJja3Y3cGFrZWQwMHp6MnZwbXVtZ3p0MWMzIn0.MyRA3XVurqDhZA28EpyiSQ';
			const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/dark-v10', // style URL
			center: [-94.5, 40], // starting position [lng, lat]
			zoom: 3 // starting zoom
			});

			//suicide rate

			const marker1 = new mapboxgl.Marker()
			.setLngLat([-107.290283, 43.075970]) //Wyoming
			.addTo(map);

			const marker2 = new mapboxgl.Marker()
			.setLngLat([ -109.533691,46.965260]) //Montana
			.addTo(map);

			const marker3 = new mapboxgl.Marker()
			.setLngLat([ -149.680909,64.445961]) //Alaska
			.addTo(map);

			const marker4 = new mapboxgl.Marker()
			.setLngLat([ -105.993007,34.570817]) //New Mexico
			.addTo(map);

			const marker5 = new mapboxgl.Marker()
			.setLngLat([  -111.714358,39.422519]) //Utan
			.addTo(map);

			//unemployment

			const marker6 = new mapboxgl. Marker({ "color": "#FFA500" }) 
			. setLngLat([-111.093735, 34.048927]) //Arizona
			. addTo(map); 

			const marker7 = new mapboxgl. Marker({ "color": "#FFA500" }) 
			. setLngLat([-92.0, 31.0]) // LOUISIANA
			. addTo(map);

			const marker8 = new mapboxgl. Marker({ "color": "#FFA500" }) 
			. setLngLat([-80.500000, 39.0]) // West Virginia
			. addTo(map);

			const marker9 = new mapboxgl. Marker({ "color": "#FFA500" }) 
			. setLngLat([ -90.000000, 33.0]) // Mississippi
			. addTo(map);

			const marker10 = new mapboxgl. Marker({ "color": "#FFA500" }) 
			. setLngLat([ -105.8701, 34.5199]) // New Mexico
			. addTo(map);


    }, [])
    return (
		<>
			<div id="map"></div>
		</>
        
			
		
    )
}
export default MapBox;


