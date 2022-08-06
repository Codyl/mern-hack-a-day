import React, { useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElmements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElmements/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/httpHook';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id != deletedPlaceId))
  }
  
  let userId = useParams().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
    </>
  );
};

export default UserPlaces;
