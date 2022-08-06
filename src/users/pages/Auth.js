import React, { useState, useContext } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElmements/Card';
import ErrorModal from '../../shared/components/UIElmements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElmements/LoadingSpinner';
import { useForm } from '../../shared/hooks/formHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/authContext';
import { useHttpClient } from '../../shared/hooks/httpHook';

export default function Auth() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormState] = useForm(
    {
      username: {
        value: 'test@test.com',
        isValid: true,
      },
      password: {
        value: 'password',
        isValid: true,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            password: formState.inputs.password.value,
            email: formState.inputs.username.value,
          }),
          {
            'Content-type': 'application/json',
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {
        //Error is handled in the hook but is needed here to ensure if there is an error the login is not reached.
        console.log('error loggin in');
      }
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.username.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-type': 'application/json',
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    }
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
      setFormState(
        { ...formState.inputs, name: { value: '', isValid: false } },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const errorHandler = () => {
    clearError();
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={errorHandler} />}
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <form onSubmit={submitHandler}>
          {!isLoginMode && (
            <Input
              label='Your Name'
              element='input'
              id='name'
              type='text'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputHandler}
            />
          )}
          <Input
            label='Your Username'
            onInput={inputHandler}
            id='username'
            type='email'
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
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGN UP'}
          </Button>
        </form>
        <Button inverse onClick={switchHandler}>
          SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}
        </Button>
      </Card>
    </>
  );
}
