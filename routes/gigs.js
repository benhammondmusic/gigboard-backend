const express = require('express')
const router = express.Router();

const gigsCtrl = require('../Controllers/gigs')

// make a new gig
router.post('/api/gigs', gigsCtrl.createGig )
// show all gigs
router.get('/api/gigs', gigsCtrl.showGigs)
// show one gigs
router.get('/api/gigs/:id', gigsCtrl.showGig)
// edit gig
router.put('/api/gigs/:id', gigsCtrl.updateGig)
// delete gig
router.delete('/api/gigs/:id', gigsCtrl.deleteGig)




module.exports = router