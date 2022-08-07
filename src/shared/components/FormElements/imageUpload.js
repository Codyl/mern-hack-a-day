import React, { useRef, useState, useEffect } from 'react';
import './imageUpload.css';

import Button from './Button';

export default function ImageUpload(props) {
  const [file, setFile] = useState();
  const [pickedUrl, setPickedUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickedHandler = (event) => {
    event.persist();
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      console.log(event);
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      fileIsValid = true;
    } else {
      fileIsValid = false;
    }
    console.log(pickedFile);
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  return (
    <div className='form-control'>
      <input
        type='file'
        onChange={pickedHandler}
        name=''
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {pickedUrl && <img src={pickedUrl} alt='preview' />}
          {!pickedUrl && <p>Please pick an image.</p>}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}
