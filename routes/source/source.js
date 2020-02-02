const express = require('express');
const sourceRouter = express.Router();

const { Source } = require('../../mongoose');

sourceRouter.get('/', (req, res) => {
  Source.find({}, (err, mySource) => {
    res.send(mySource);
  });
});

module.exports = sourceRouter;
