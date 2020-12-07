import React, { useEffect, useState } from 'react';

const initData = {
  first_name: "",
  last_name: "",
  username: "",
  position: "",
  number: "",
  image_name: "",
  image: {}
};

const EditUsers = ({ player }) => {


  return <div>
    <div class="page-wrapper">
      <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1"><a href="/">Socka Players</a></span>
        <a class="float-right" href="/add" title="Add a New Player">Add a Player</a>
      </nav>
      <div class="container">
        {true ?
          <form class="add-player-form" action="" method="post" enctype="multipart/form-data">

            <div class="form-row">
              <div class="form-group col-md-4">
                {player.image ? <img src={`http://localhost:5000/assets/img/${player.image}`} /> : <input type="file" class="form-control" name="image" id="first-image" required />}
              </div>
              <div class="form-group col-md-4">
                <label for="first-name">First Name</label>
                <input type="text" class="form-control" name="first_name" id="first-name" value="<%= player.first_name %>"
                  required />
              </div>
              <div class="form-group col-md-4">
                <label for="last-name">Last Name</label>
                <input type="text" class="form-control" name="last_name" id="last-name" value="<%= player.last_name %>"
                  required />
              </div>
              <div class="form-group col-md-4">
                <label for="username">Username</label>
                <input type="text" class="form-control" name="username" id="username" value="<%= player.user_name %>"
                  required disabled title="Username cannot be edited." />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="number">Number</label>
                <input type="number" class="form-control" name="number" id="number" placeholder="Number"
                  value="<%= player.number %>" required />
              </div>
              <div class="form-group col-md-6">
                <label for="position">Position</label>
                <select id="position" name="position" class="form-control" required>
                  <option selected>{player.position}</option>
                  <option>Goalkeeper</option>
                  <option>Centre Back</option>
                  <option>Right Back</option>
                  <option>Left Back</option>
                  <option>Defensive Midfielder</option>
                  <option>Central Midfielder</option>
                  <option>Attacking Midfielder</option>
                  <option>Right Wing Forward</option>
                  <option>Left Wing Forward</option>
                  <option>Striker</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-success float-right">Update Player</button>
          </form>
          :
          <p class="text-center">Player Not Found. Go <a href="/add">here</a> to add players.</p>
        }
      </div>
    </div>
  </div>
}

export default EditUsers;