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
})

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
})

module.exports = server;
