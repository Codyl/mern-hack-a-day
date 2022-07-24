import React, { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElmements/Card';
import { useForm } from '../../shared/hooks/formHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormState] = useForm(
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
  const switchHandler = () => {
    if (!isLoginMode) {
      setFormState(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormState({...formState.inputs, name: {value: '', isValid: false}}, false);
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card>
      <h2>Login</h2>
      {!isLoginMode && (
        <Input
          label='Name'
          element='input'
          id='name'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a name'
          onInput={inputHandler}
        />
      )}
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
          {isLoginMode ? 'LOGIN' : 'SIGN UP'}
        </Button>
      </form>
      <Button inverse onClick={switchHandler}>
        SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}
      </Button>
    </Card>
  );
}
