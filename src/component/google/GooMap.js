import React, { useEffect, useState } from "react";

const GooMap = () => {
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [marker, setMarker] = useState(null);
  const [hotelMarkers, setHotelMarkers] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      const center = { lat: 37.7749, lng: -122.4194 };

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 10,
      });

      setMap(map);
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_API_KEY}&libraries=places`;
      script.onload = loadMap;

      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (!map) return;

    const service = new window.google.maps.places.PlacesService(map);

    service.textSearch(
      {
        query: searchInput,
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSearchResults(results);
          setSelectedPlace(results[0]);
          fitMapBounds(results);
          createMarker(results[0]);
          searchHotelsWithinRadius(results[0].geometry.location);
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
    map.setZoom(13);
  };

  const createMarker = (place) => {
    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position: place.geometry.location,
      icon: "http://maps.google.com/mapfiles/kml/paddle/red-stars.png",
      map: map,
    });

    setMarker(newMarker);
  };

  const createHotelMarkers = (hotels) => {
    clearHotelMarkers();

    const newHotelMarkers = hotels.map((hotel) => {
      const hotelMarker = new window.google.maps.Marker({
        position: hotel.geometry.location,
        map: map,
        title: hotel.name,
      });

      window.google.maps.event.addListener(hotelMarker, "mouseover", () => {
        hotelMarker.setLabel(hotel.name);
      });

      window.google.maps.event.addListener(hotelMarker, "mouseout", () => {
        hotelMarker.setLabel("");
      });

      window.google.maps.event.addListener(hotelMarker, "click", () => {
        setSelectedHotel(hotel);
      });

      return hotelMarker;
    });

    setHotelMarkers(newHotelMarkers);
  };

  const clearHotelMarkers = () => {
    hotelMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    setHotelMarkers([]);
  };

  const searchHotelsWithinRadius = (location) => {
    const service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: location,
        radius: 5000,
        type: "lodging",
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          createHotelMarkers(results);
        }
      }
    );
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
      <div id="map" style={{ width: "800px", height: "480px" }}></div>
      {selectedPlace && (
        <div>
          <img
            src={selectedPlace.photos && selectedPlace.photos[0].getUrl()}
            alt={selectedPlace.name}
            style={{ maxWidth: "1000px", maxHeight: "750px" }}
          />
          <h3>{selectedPlace.name}</h3>
          <p>{selectedPlace.formatted_address}</p>
        </div>
      )}
      {selectedHotel && (
        <div>
          <img
            src={selectedHotel.photos && selectedHotel.photos[0].getUrl()}
            alt={selectedHotel.name}
            style={{ maxWidth: "500px", maxHeight: "375px" }}
          />
          <h3>{selectedHotel.name}</h3>
          <p>{selectedHotel.formatted_address}</p> {/* 주소친구가 안나옴.. */}
          {/* {selectedHotel.website && (
            <p>
              <a href={selectedHotel.website} target="_blank" rel="noopener noreferrer">
                {selectedHotel.website}
              </a>
            </p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default GooMap;
