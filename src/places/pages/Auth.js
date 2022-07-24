import React, { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElmements/Card';
import { useForm } from '../../shared/hooks/formHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

export default function Auth() {
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card>
      <h2>Login</h2>
      <form>
        <Input
          label='Username'
          onInput={inputHandler}
          id='username'
          element='input'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Username field must not be an email.'
          initialValue={formState.inputs.username.value}
          initialValid={formState.inputs.username.isValid}
        ></Input>
        <Input
          label='Password'
          onInput={inputHandler}
          id='password'
          element='input'
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText='Password must be at least 8 characters.'
          initialValue={formState.inputs.password.value}
          initialValid={formState.inputs.password.isValid}
        ></Input>
        <Button
          type='submit'
          disabled={!formState.isValid}
          onSubmit={submitHandler}
        >
          Login to my account
        </Button>
      </form>
    </Card>
  );
}
