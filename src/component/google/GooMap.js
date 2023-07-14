import { useEffect, useState } from 'react'

const GooMap = () => {

  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [markers, setMarkers] = useState([]);

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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_API_KEY}&libraries=places&callback=initMap`;
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
          createMarkers(results);
          fitMapBounds(results);
        }
      }
    );
  };

  const createMarkers = (places) => {
    clearMarkers();

    const newMarkers = places.map((place) => {
      const marker = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      marker.addListener('click', () => {
        showInfoWindow(place);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  const clearMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    setMarkers([]);
  };

  const fitMapBounds = (places) => {
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(place.geometry.location);
    });

    map.fitBounds(bounds);
  };

  const showInfoWindow = (place) => {
    const service = new window.google.maps.places.PlacesService(map);
  
    service.getDetails(
      {
        placeId: place.place_id,
        fields: ['name', 'rating', 'photos']
      },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const photos = result.photos || [];
          const photoUrl = photos.length > 0 ? getPhotoUrl(photos[0]) : null;
  
          const infoWindowContent = `
            <div>
              <h3>${result.name}</h3>
              ${photoUrl ? `<img src="${photoUrl}" alt="${result.name}" style="max-width: 200px; max-height: 150px;" />` : ''}
              <p>Rating: ${result.rating || 'N/A'}</p>
            </div>
          `;
  
          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent
          });
  
          infoWindow.open(map);
        }
      }
    );
  };

  const getPhotoUrl = (photo) => {
    const width = photo.width;
    const height = photo.height;
    const photoReference = photo.photo_reference;
    const apiKey = `${process.env.REACT_APP_GOOGLEMAP_API_KEY}`;
  
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&maxheight=${height}&photoreference=${photoReference}&key=${apiKey}`;
  };

  return (
    <div>
      <div>
        <input id="search-input" type="text" value={searchInput} onChange={handleSearchInputChange} placeholder="Search for a place" />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="map" style={{ width: '1500px', height: '600px' }}></div>
    </div>
  );
}

export default GooMap