import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../redux/action';

const initData = {
  first_name: "",
  last_name: "",
  username: "",
  position: "",
  number: "",
  image_name: "",
  image: {}
};

const AddUser = (props) => {
  const [player, setPlayer] = useState(initData);

  const onaddPlayer = () => {
    let formData = new FormData();
    formData.append("image", player.image);
    formData.append("first_name", player.first_name);
    formData.append("last_name", player.last_name);
    formData.append("position", player.position);
    formData.append("number", player.number);
    formData.append("username", player.username);
    props.onAddPlayer(formData)
    props.history.push("users")
  }


  const onPlayerChange = (name, value) => {
    setPlayer({ ...player, [name]: value });
  }

  return <div className="container">
    <h1>Add Player</h1>
    <div className="form-row">
      <div className="form-group col-md-4">
        <input type="text" className="form-control" name="first_name" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.first_name} placeholder="First Name" />
      </div>
      <div className="form-group col-md-4">
        <input type="text" className="form-control" name="last_name" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.last_name} placeholder="Last Name" />
      </div>
      <div className="form-group col-md-4">
        <input type="text" className="form-control" name="username" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.username} placeholder="Username" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <input type="number" className="form-control" name="number" onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.number} placeholder="Number" />
      </div>
      <div className="form-group col-md-6">
        <select onChange={e => onPlayerChange(e.target.name, e.target.value)} value={player.position} name="position" className="form-control"  >
          <option value="" disabled>Choose position</option>
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Defender">Defender</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Forward">Forward</option>
        </select>
      </div>
      <div className="col-md-12">
        <label htmlFor="player-img"><b>Player Image</b></label><br />
        <input type="file" name="image" onChange={e => onPlayerChange(e.target.name, e.target.files[0])} className="" />
      </div>
    </div>
    <button type="button" className="btn btn-success float-right ml-2" onClick={() => onaddPlayer()}>Add Player</button>
    <button type="button" className="btn float-right ml-2" onClick={() => onaddPlayer()}>Cancel</button>
  </div>
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlayer: (data) => dispatch(addPlayer(data))
  }
}
export default connect(null, mapDispatchToProps)(AddUser);