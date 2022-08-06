import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElmements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElmements/LoadingSpinner';

export const Users = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      let responseData;
      try {
        const response = await fetch('localhost:5000/api/users');
        responseData = response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);

      setLoadedUsers(responseData.users);
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};
