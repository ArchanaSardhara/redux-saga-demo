import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";

import { deletePlayer, loadPlayers } from '../../redux/action';
import UserDetail from './user-detail-modal';

const Users = ({
  playerList = [],
  onLoadPlayers,
  onDeletePlayer
}) => {
  const [rendered, setRendered] = useState(false);
  const [addPlayerModal, toogleAddPlayerModal] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!rendered) {
      onLoadPlayers();
      setRendered(true);
    }
  }, [onLoadPlayers, rendered]);

  const toggleToAddPlayer = () => {
    if (addPlayerModal) {
      setPlayer(null);
    }
    toogleAddPlayerModal(prevFlag => !prevFlag);
  }

  const editPlayer = (player) => {
    setPlayer(player);
    toggleToAddPlayer();
  }

  const deletePlayer = (player) => {
    if (window.confirm('Are you sure you want to delete user: ' + player.user_name + ' ?')) {
      onDeletePlayer(player.id);
    }
  }

  return <div>
    <Button type="button" className="float-right mr-2 mb-2" onClick={() => toggleToAddPlayer()}>New Player</Button>
    <table className="table table-hovered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Image</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Position</th>
          <th scope="col">Number</th>
          <th scope="col">Username</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {playerList.map((player, index) => (
          <tr key={index}>
            <th scope="row">{player.id}</th>
            <td><img src={`http://localhost:5000/assets/img/${player.image}`} className="rounded-circle player-img" alt="" /></td>
            <td>{player.first_name}</td>
            <td>{player.last_name}</td>
            <td>{player.position}</td>
            <td>{player.number}</td>
            <td>@{player.user_name}</td>
            <td>

              <Button type="button" variant="success" className="mr-2 mb-2" onClick={() => editPlayer(player)}>Edit</Button>
              <Button type="button" variant="danger" className="mr-2 mb-2" onClick={() => deletePlayer(player)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <UserDetail isOpen={addPlayerModal} toggleModal={toggleToAddPlayer} isEdit={player && player.id ? true : false} data={player} />
  </div>
}


const mapStateToProps = state => ({
  playerList: state.players.players,
})

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlayers: () => dispatch(loadPlayers()),
    onDeletePlayer: (id) => dispatch(deletePlayer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);