import axios from 'axios';
import { $ } from './bling';

const mapOptions={
    center:{lat:37.336269, lng: -121.8881309},
    zoom:20
};


function loadAtm( map, lat=37.3, lng= -121.8){
    
    // const markers= {
    //     const: [placeLng, placeLat]= place.location.cordinates,
    //     const position
    // }
}

function makeMap(mapDiv){
    if(!mapDiv) return;
    //make our map
    const map = new google.maps.Map(mapDiv,mapOptions);
    const input = $('[name="geolocate]');
    const autocomplete = new google.maps.places.Autocomplete(input);
}

export default makeMap;