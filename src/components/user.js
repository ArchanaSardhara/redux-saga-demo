import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";

import { loadPlayers } from '../redux/action';

const Users = (props) => {
  const [rendered, setRendered] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (!rendered) {
      props.onLoadPlayers(setUserList);
      setRendered(true);
    }
  }, [props.player]);

  const toggleToAddPlayer = () => {
    props.history.push("add-user")
  }
  console.log('userList >>>', userList)

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
        {(userList || []).map((player, index) => (
          <tr key={index}>
            <th scope="row">{player.id}</th>
            <td><img src={`http://localhost:5000/assets/img/${player.image}`} className="rounded-circle player-img" alt="" /></td>
            <td>{player.first_name}</td>
            <td>{player.last_name}</td>
            <td>{player.position}</td>
            <td>{player.number}</td>
            <td>@{player.user_name}</td>
            <td>
              <a href="/edit/{player.id}" target="_blank" rel="noopener" className="btn btn-sm btn-success">Edit</a>
              <a href="/delete/{player.id}" className="btn btn-sm btn-danger">Delete</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}


const mapStateToProps = state => ({
  playerList: state.players.players,
})

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlayers: (a) => dispatch(loadPlayers(a))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);