import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useHttpClient } from '../../shared/hooks/httpHook';
import ImageUpload from '../../shared/components/FormElements/imageUpload';
import { login } from '../../shared/redux/reducer';

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
  const dispatch = useDispatch();
  const tokenExpiration = useSelector((state) => state.tokenExpiration);

  //runs after the render cycle
  //Get the signed in data if it has not expired so the user can stay logged in.
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.token && new Date() < new Date(data.expiration)) {
      dispatch(login({ userId: data.userId, token: data.token }));
    }
  }, [login]);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs, isLoginMode);
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
        dispatch(
          login({ userId: responseData.userId, token: responseData.token })
        );
        console.log('test', tokenExpiration); //Undefined here but accepted in reducer.js for some reason
      } catch (err) {
        console.log('error logging in', err.message);
      }
    } else {
      try {
        //Needed to send to backend because we sending binary data, the image
        const formData = new FormData();
        formData.append('email', formState.inputs.username.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );
        console.log(responseData);
        dispatch(login(responseData.userId, responseData.token));
      } catch (err) {}
    }
  };
  const switchHandler = () => {
    if (!isLoginMode) {
      setFormState(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormState(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
          image: {
            value: null,
            isValid: false,
          },
        },
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
          {!isLoginMode && <ImageUpload id='image' onInput={inputHandler} />}
          <Input
            label='Your Username'
            onInput={inputHandler}
            id='username'
            type='email'
            element='input'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Username field must be an email.'
            initialValue={formState.inputs.username.value}
            initialValid={formState.inputs.username.isValid}
          ></Input>
          <Input
            label='Password'
            onInput={inputHandler}
            id='password'
            element='input'
            type='password'
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
