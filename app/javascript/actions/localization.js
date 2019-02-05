

function searchCoordinatesNominatim(address, city){

    var quer=address + ", " + city + ", Argentina"
    reqwest(
        { url: 'https://nominatim.openstreetmap.org/search',
        method: 'GET',
        data: {
            q: quer,
            format: 'json'
        }
    }
    ).then(data=>{return data}).catch(err=> { return err});

}
function downloadMapTomTom(data){
     
    // Comprobar cantidad de resultados disponibles, y dar a elegir al usuario.
    // Por elmo se mostrará el mapa del lugar 0 (mejor coincidencia)
    let coord = {};
    coord= data['0']['boundingbox'];
    
    let coordinates = data['0'].lon + "," + data['0'].lat;
    
    reqwest({
        url: 'http://api.tomtom.com/map/1/staticimage',
        method: 'GET',
        data: {
            center: coordinates,
            format: 'jpg',
            // width: '350',
            // height: '320',
            // markers: 'color: blue label: AQUÍ',
            key: '6fEWMnnxWPDJ3BpQGKffuMUlyQiBlUlu',
            // bbox: coord,
            zoom: '15',
            // view: 'AR',
        },
        // en data.responseURL está la ruta de la imagen
    }).then(data=>{ return data}).catch(err=> { return err });
}