const { Post } = require('../Models');

const createGig = async (req, res) => {
  try {
    console.log(req.body, 'REQ.BODY in CREATEGIG()');

    const foundGig = await Post.findOne(req.body);

    if (foundGig) throw 'gig is already created!';

    const gig = await Post.create(req.body);

    res.status(201).json({
      status: 201,
      gig,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error, 'ERROR IN CREATEGIG()');
  }
};
const showGigs = async (req, res) => {
  try {
    console.log('show all gigs');
    // im using gigId to find the gig
    const foundGigs = await Post.find({});

    return res.status(200).json({
      status: 200,
      foundGigs,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error, 'ERROR IN SHOWGIGS()');
  }
};

const showGig = async (req, res) => {
  try {
    // im using gigId to find the gig
    const gig = await Post.findById(req.params.gigId);

    return res.status(200).json({
      status: 200,
      gig,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateGig = async (req, res) => {
  try {
    // im using gigId to find the gig
    const updatedGig = await Post.findByIdAndUpdate(
      req.params.gigId,
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: 200,
      updatedGig,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteGig = async (req, res) => {
  try {
    // im using gigId to find the gig
    const deletedGig = await Post.findByIdAndDelete(req.params.gigId);

    return res.status(200).json({
      status: 200,
      deletedGig,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGig,
  showGig,
  showGigs,
  updateGig,
  deleteGig,
};
