const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const {body} = require('express-validator');



router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicle Type')
    ,rideController.createRide,
    
)







module.exports = router;