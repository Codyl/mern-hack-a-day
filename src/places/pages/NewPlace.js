import React, { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_FILE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { AuthContext } from '../../shared/context/authContext';
import ErrorModal from '../../shared/components/UIElmements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElmements/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../shared/components/FormElements/imageUpload';

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: 'test',
        isValid: true,
      },
      description: {
        value: 'this is place',
        isValid: true,
      },
      address: {
        value: '1001 place',
        isValid: true,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    true
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('coordinates', { lat: 1, lng: 1 });
      formData.append('creator', auth.userId);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData);
      //Redirect the user to an existing page
      history.push(`/${auth.userId}/places`);
      console.log(formState.inputs);
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}

      <form action='' className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          type='text'
          label='title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
        />
        <Input
          id='description'
          element='textarea'
          type='text'
          label='Description'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description.'
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address.'
          onInput={inputHandler}
          initialValue={formState.inputs.address.value}
        />
        <Input
          id='image'
          label='Image'
          validators={[VALIDATOR_FILE()]}
          errorText='Please add image'
          onInput={inputHandler}
        />
        <ImageUpload
          center
          id='image'
          onInput={inputHandler}
          errorText='Please provide an image'
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
