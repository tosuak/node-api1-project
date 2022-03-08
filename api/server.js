const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  User.insert(req.body)
    .then(postUser => {
      if (req.body == null) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
      } else {
        res.status(201).json(postUser);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error while saving the user to the database" });
    })
});

server.get('/api/users', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    })
});

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user == null) {
        res.status(404).json({ message: 'The user with the specifed ID does not exist' });
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The user information could not be retrieved" })
    })
});

server.delete('/api/users/:id', (req, res) => {
  User.remove(req.params.id)
    .then(user => {
      if (user == null) {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'The user could not be removed' });
    })
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  User.update(id, {name, bio})
    .then(updatedUser => {
      if (updatedUser.id == null) {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
      } else if (updatedUser.name == null || updatedUser.bio == null) {
        res.status(400).json({ message: 'Please provide name and bio for the user'});
      } else {
        res.json(updatedUser);
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'The user information could not be modified' });
    })
});

module.exports = server;
