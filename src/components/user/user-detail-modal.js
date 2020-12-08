import React, { useEffect, useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addPlayer, updatePlayer } from '../../redux/action';

const initData = {
  first_name: "",
  last_name: "",
  user_name: "",
  position: "",
  number: "",
  image_name: "",
  image: {}
};

const UserDetail = ({
  onAddPlayer,
  onUpdatePlayer,
  isOpen,
  toggleModal,
  data,
  isEdit
}) => {
  const [player, setPlayer] = useState({ ...initData });

  useEffect(() => {
    console.log('isEdit', isEdit)
    if (isEdit && data) {
      const image_name = 'http://localhost:5000/assets/img/' + data.image;
      setPlayer({
        ...initData, ...data, image_name
      });
    }
  }, [isEdit, data])

  const onaddPlayer = () => {
    let formData = new FormData();
    if (player.image instanceof File) {
      formData.append("image", player.image);
    }
    formData.append("first_name", player.first_name);
    formData.append("last_name", player.last_name);
    formData.append("position", player.position);
    formData.append("number", player.number);
    formData.append("user_name", player.user_name);
    if (player.id) {
      onUpdatePlayer(formData, player.id)
    } else {
      onAddPlayer(formData);
    }
    resetModal();
  }

  const resetModal = () => {
    setPlayer(initData);
    toggleModal();
  }

  const onPlayerChange = (name, value) => {
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPlayer(prevData => ({ ...prevData, image_name: e.target.result }));
      }
      reader.readAsDataURL(value);
    }
    setPlayer(prevData => ({ ...prevData, [name]: value }));
  }

  return <Modal show={isOpen} onHide={resetModal} size='lg'>
    <Modal.Header closeButton>
      <h4>{isEdit ? player.user_name : 'Add Player'}</h4>
    </Modal.Header>
    <Modal.Body className="p-4">
      <Row>
        <Col md="6">
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="first_name"><b>First Name</b></label><br />
              <input type="text" className="form-control" name="first_name" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.first_name} placeholder="First Name" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="last_name"><b>Last Name</b></label><br />
              <input type="text" className="form-control" name="last_name" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.last_name} placeholder="Last Name" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="user_name"><b>User Name</b></label><br />
              <input type="text" className="form-control" name="user_name" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.user_name} placeholder="Username" disabled={isEdit} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="number"><b>Player Number</b></label><br />
              <input type="number" className="form-control" name="number" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.number} placeholder="Number" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="position"><b>Select Player Position</b></label><br />
              <select onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.position} name="position" className="form-control"  >
                <option value="" disabled>Choose position</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Forward">Forward</option>
              </select>
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="form-group col-md-12">
            <label htmlFor="image"><b>Select Player Profile</b></label><br />
            <div className="player_upload">
              <input
                className="player_upload--input"
                type="file"
                name="image"
                onChange={e => onPlayerChange(e.target.name, e.target.files[0])}
              />
              {player.image_name ? <img className="player_upload--img" src={player.image_name} alt="user-profile" /> :
                <div className="player_upload--container">
                  <div className="d-flex flex-column justify-content-center align-items-center player_upload--icon">
                    <svg width="52" height="34">
                      <path
                        d="M41.93 12.835a16.339 16.339 0 00-30.34-4.25A12.735 12.735 0 0013 34h28.17a10.59 10.59 0 00.76-21.165zm-.76 16.915H13a8.486 8.486 0 01-.95-16.936l2.32-.234 1.08-2.019a11.962 11.962 0 0122.23 3.1l.65 3.187 3.31.234a6.392 6.392 0 016.03 6.29 6.461 6.461 0 01-6.5 6.375zM17.33 19.125h5.53V25.5h6.28v-6.375h5.53l-8.67-8.5z"
                        fill="#00285c"
                      />
                    </svg>
                    <p>Upload Player Image</p>
                  </div>
                </div>}
            </div>
          </div>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <button type="button" className="btn btn-success float-right ml-2" onClick={() => onaddPlayer()}>{isEdit ? 'Update Player' : 'Add Player'}</button>
      <button type="button" className="btn float-right ml-2" onClick={() => resetModal()}>Cancel</button>
    </Modal.Footer>
  </Modal>
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlayer: (data) => dispatch(addPlayer(data)),
    onUpdatePlayer: (data, id) => dispatch(updatePlayer(data, id))
  }
}
export default connect(null, mapDispatchToProps)(UserDetail);