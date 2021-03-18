const express = require('express');
const router = express.Router();

const gigsCtrl = require('../Controllers/gigs');

// ALL ROUTES START WITH /API/GIGS AS DEFINED IN SERVER.JS

// make a new gig
router.post('/', gigsCtrl.createGig);
// show all gigs
router.get('/', gigsCtrl.showGigs);
// show one gigs
router.get('/:id', gigsCtrl.showGig);
// edit gig
router.put('/:id', gigsCtrl.updateGig);
// delete gig
router.delete('/:id', gigsCtrl.deleteGig);

module.exports = router;
