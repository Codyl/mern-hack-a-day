import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/exports';

import Card from '../../shared/components/UIElmements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElmements/Modal';
import Map from '../../shared/components/UIElmements/Map';
import './PlaceItem.css';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElmements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElmements/ErrorModal';

const PlaceItem = (props) => {
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);
  const [showMap, setShowMap] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const deletePlaceHandler = async () => {
    try {
      setShowWarning(false);
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      history.push(`/${userId}/places`);
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}

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
            <Button delete onClick={deletePlaceHandler}>
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
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
            {userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {userId === props.creatorId && (
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
