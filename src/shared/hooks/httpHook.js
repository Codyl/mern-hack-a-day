import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);

  //Wrapped with useCallback so that this function never gets recreated when the component that uses this hook rerenders which would cause an infinite loop
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      try {
        setIsLoading(true);
        // AbortController used to cancel request when the user switches pages losing the element in the middle of a request.
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        let response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        // console.log(response)
        // if(!response.ok && method === 'GET') {
        //   return {};
        // }
        const responseData = await response.json();
        console.log(responseData)
        setIsLoading(false);
        //Remove completed requests from the active requests variable so we do not try to clear a request that is no longer active.
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  //We need clear error so the components that use this can ensure the error message goes away when no longer relevant.
  const clearError = () => {
    setError(null);
  };

  //Used to cancel the request. UseEffect can clean up when a component unmounts.
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
