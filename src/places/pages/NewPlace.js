import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/formHook';

const NewPlace = () => {
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
    address: {
      value: '',
      isValid: false,
    },
  }, false);

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)
  }

  return (
    <form action='' className='place-form'>
      <Input
        id='title'
        element='input'
        type='text'
        label='title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
      />
      <Input
        id='description'
        element='textarea'
        type='text'
        label='Description'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description.'
        onInput={inputHandler}
      />
      <Input
        id='address'
        element='input'
        label='Address'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid address.'
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid} onSubmit={placeSubmitHandler}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
