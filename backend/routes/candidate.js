var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
var candidateController = require('../controllers/candidate.controller');

// getAll
router.get('/all', candidateController.getAllCandidate);
router.get('/logged_in', requiresAuth(), (req, res, next) => {
  res.redirect(301, process.env.FRONT_URL);
});
router.get('/profile', requiresAuth(), (req, res, next) => {
  if (req.oidc.user) res.status(200).send(JSON.stringify(req.oidc.user));
  else res.status(200).send({});
});

module.exports = router;
