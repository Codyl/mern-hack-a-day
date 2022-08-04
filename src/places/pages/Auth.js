import React, { useState, useContext } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElmements/Card';
import { useForm } from '../../shared/hooks/formHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/authContext';

export default function Auth() {
  const auth = useContext(AuthContext);
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

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    if (isLoginMode) {
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.username.value,
            password: formState.inputs.password.value,
          }),
        });
        //gets the body data (user) of the fetched response
        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
    auth.login();
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

  return (
    <Card className='authentication'>
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
  );
}
