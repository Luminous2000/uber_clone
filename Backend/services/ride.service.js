const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapsService = require('./maps.service')
const crypto = require('crypto')


async function getFare(pickup,destination){
    if(!pickup || !destination ){
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup,destination)
    
    const baseFare = {
        auto:30,
        car:50,
        moto:20
    };
    const perKmRate = {
        auto:10,
        car:15,
        moto:8
    };
    const perMinuteRate = {
        auto:2,
        car:3,
        moto:1.5
    };
    // console.log(distanceTime)

    const fare = {
        auto: Math.round( baseFare.auto +((distanceTime.distance.value/1000)* (perKmRate.auto))+((distanceTime.duration.value/60)*(perMinuteRate.auto))),
        car:Math.round( baseFare.car +((distanceTime.distance.value/1000)* perKmRate.car)+((distanceTime.duration.value/60)*perMinuteRate.car)),
        moto: Math.round( baseFare.moto +((distanceTime.distance.value/1000)* perKmRate.moto)+((distanceTime.duration.value/60)*perMinuteRate.moto)),
        
    }




    return fare;
}

module.exports.getFare = getFare; 

function getOtp(num){
    function generationOtp(num){
        const otp = crypto.randomInt(Math.pow(10,num-1), Math.pow(10,num)).toString();
        return otp;
    }
    return generationOtp(num)         
}   

module.exports.createRide = async ({
    user,pickup,destination,vehicleType
}) =>{
    if(!user || !pickup|| !destination || !vehicleType){
        // console.log(user,pickup,destination,vehicleType)
        throw new Error('All fields are required');

    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,pickup,destination,otp:getOtp(6),fare:fare[vehicleType]
    })
    return ride;
}

module.exports.confirmRide =  async ({
    rideId,captain
}) =>{
    if(!rideId){
        throw new Error('Ride Id is required');

    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'accepted',
        captain :captain._id
    })

    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){ 
        throw new Error('Ride not found')
    }

    
    return ride;
}

module.exports.startRide = async ({ rideId ,otp ,captian}) => {
    if(!rideId || !otp){
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');
    // console.log("ride: ",ride)

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId,{
        event:'ride-started',
        data:ride
    })

    return ride;
}

module.exports.endRide = async ({rideId,captain}) =>{
    if(!rideId){
        throw new Error('Ride Id is required');

    }

    const ride = await rideModel.findOne({
        _id:rideId,
        captain:captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found')
    }

    if(ride.status !== 'ongoing'){
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'completed'
    })

    sendMessageToSocketId(ride.user.socketId,{
        event:'ride-completed',
        data:ride
    })

    return ride;
}