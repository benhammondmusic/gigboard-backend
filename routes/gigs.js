const express = require("express");
const router = express.Router();
const { authRequired } = require("../middleware/authRequire");

const gigsCtrl = require("../Controllers/gigs");

// ALL ROUTES START WITH /API/GIGS AS DEFINED IN SERVER.JS

// make a new gig
router.post("/", authRequired, gigsCtrl.createGig);
// show all gigs
router.get("/", gigsCtrl.showGigs);
// show one gigs
router.get("/:gigId", authRequired, gigsCtrl.showGig);
// edit gig
router.put("/:gigId", authRequired, gigsCtrl.updateGig);
// delete gig
router.delete("/:gigId", gigsCtrl.deleteGig);

module.exports = router;
