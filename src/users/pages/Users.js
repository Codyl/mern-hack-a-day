import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElmements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElmements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/httpHook';

export const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //Get all of the users
  useEffect(() => {
    let responseData;
    const fetchUsers = async () => {
      try {
        responseData = await sendRequest('http://localhost:5000/api/users');
      } catch (err) {}
      setLoadedUsers(responseData.users);
    };
    fetchUsers();
    //UseCallback prevents this from becoming an issue when a request is sent becuase there is only one object of sendRequest instead of recreating the function.
  }, [sendRequest]);
  const errorHandler = () => {
    clearError();
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
