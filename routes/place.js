const express = require('express');
const Place = require('./../models/place');

const placeRouter = new express.Router();

// ROUTES

// CREATE A PLACE //

placeRouter.get('/create', (req, res, next) => {
  res.render('place/create');
});

placeRouter.post('/create', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  Place.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then((place) => {
      res.redirect('/place/list');
    })
    .catch((error) => {
      next(error);
    });
});

// LIST PLACES //

placeRouter.get('/list', (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render('place/list', { places });
    })
    .catch((error) => {
      next(error);
    });
});

// A SINGLE PLACE //

placeRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('place/single', { place });
    })
    .catch((error) => {
      next(error);
    });
});

// UPDATE A PLACE //

placeRouter.get('/update/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Place.findById(id)
    .then((place) => {
      res.render('place/update', { place });
    })
    .catch((error) => {
      next(error);
    });
});

placeRouter.post('/update/:id', (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const type = req.body.type;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const query = {
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  };

  Place.findOneAndUpdate({ _id: id }, query)
    .then((place) => {
      console.log(place);
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE A PLACE //

placeRouter.post('/delete/:id', (req, res, next) => {
  const id = req.params.id;

  Place.findOneAndDelete({ _id: id })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = placeRouter;
