import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous places in the world!",
    imageUrl:
      "https://www.bing.com/th?id=AMMS_aeaad6341da9c5b8af7ad8f6cb062776&w=211&h=140&c=8&rs=1&qlt=90&o=6&cdv=1&dpr=1.25&pid=Attractions",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484402,
      lng: -73.9943977,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous places in the world!",
    imageUrl:
      "https://www.bing.com/th?id=AMMS_aeaad6341da9c5b8af7ad8f6cb062776&w=211&h=140&c=8&rs=1&qlt=90&o=6&cdv=1&dpr=1.25&pid=Attractions",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484402,
      lng: -73.9943977,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  let loadedPlaces = DUMMY_PLACES;
  const params = useParams();
  if(params.userId) {
    loadedPlaces = loadedPlaces.filter(x => x.creator === params.userId);
  }
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
