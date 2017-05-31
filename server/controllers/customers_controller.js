const Customers = require('../models/customers_model');
const bcrypt = require('bcrypt');

function getAll(req, res) {
  Customers.find({}, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following records:");
    console.log(result);
    res.send(result);
  });
}

function getSingle(req, res) {
  Customers.find({
    '_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following record:");
    console.log(result);
    res.send(result);
  });
}

function createCustomer(req, res) {
  let hash = bcrypt.hashSync(req.body.password, 8);

  Customers.create({
    memberid: req.body.memberid,
    username: req.body.username,
    password: hash,
    role:     req.body.role,
    name:     req.body.name,
    address:  req.body.address,
    zipcode:  req.body.zipcode,
    phone:    req.body.phone
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Insert:");
    console.log(result);
    res.send(result);
  });
}

function deleteCustomer(req, res) {
  Customers.remove({
    '_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Delete:");
    console.log(result);
    res.send(result);
  });
}

function updateCustomer(req, res) {
  let hash;
  if (req.body.password) {
    hash = bcrypt.hashSync(req.body.password, 8);
  }

  Customers.find({
    _id: req.params.id
  }, function(err, customer) {
    if (!hash) {
      hash = customer[0].password
    }
    Customers.update({
      _id: customer[0]._id
    }, {
      $set: {
        memberid: req.body.memberid || customer[0].memberid,
        username: req.body.username || customer[0].username,
        password: hash,
        role:     req.body.role || customer[0].role,
        name:     req.body.name || customer[0].name,
        address:  req.body.address || customer[0].address,
        zipcode:  req.body.zipcode || customer[0].zipcode,
        phone:    req.body.phone || customer[0].phone
      }
    }, (err, result) => {
      if (err) return res.send(err.message)
        res.send(result);
    });
  });
}

module.exports = {
  getAll, getSingle, createCustomer, deleteCustomer, updateCustomer
}
