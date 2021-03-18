
const { User, Post } = require('../Models');


const createGig = async ( req, res ) => {

    try {
        const foundGig = await Post.findOne(req.body)

        if ( foundGig ) throw 'gig is already created!'

        const gig = await Post.create(req.body)

        res.status(201).json({
            status: 201,
            gig,
            requestAt: new Date().toLocaleString()
          });
    
    } catch (error) {
    
        console.log(error)
    
    }
}




module.exports = {
    createGig,
}