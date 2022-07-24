import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElmements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElmements/Modal';
import Map from '../../shared/components/UIElmements/Map';
import './PlaceItem.css';
import { AuthContext } from '../../shared/context/authContext';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16}></Map>
        </div>
      </Modal>
      <Modal
        show={showWarning}
        header='Are you Sure?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={() => setShowWarning(false)}>
              CANCEL
            </Button>
            <Button delete onClick={() => console.log('deleting')}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place. Please not that the
          deletion cannot be undone.
        </p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={props.image} alt={props.title} />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedin && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedin && (
              <Button onClick={() => setShowWarning(true)} danger>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
