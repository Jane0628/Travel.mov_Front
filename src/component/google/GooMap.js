import { useEffect, useState } from 'react'

const GooMap = () => {

  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      const center = { lat: 37.7749, lng: -122.4194 };

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 10
      });

      setMap(map);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_API_KEY}&libraries=places`;
      script.onload = loadMap;

      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (!map) return;

    const service = new window.google.maps.places.PlacesService(map);

    service.textSearch(
      {
        query: searchInput
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSearchResults(results);
          setSelectedPlace(results[0]);
          fitMapBounds(results);
        }
      }
    );
  };

  const fitMapBounds = (places) => {
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(place.geometry.location);
    });

    map.fitBounds(bounds);
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search for a place"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="map" style={{ width: '400px', height: '400px' }}></div>
      {selectedPlace && (
        <div>
          <img src={selectedPlace.photos && selectedPlace.photos[0].getUrl()} alt={selectedPlace.name} style={{ maxWidth: '200px', maxHeight: '150px' }} />
          <h3>{selectedPlace.name}</h3>
          <p>{selectedPlace.formatted_address}</p>
        </div>
      )}
    </div>
  );
}

export default GooMap