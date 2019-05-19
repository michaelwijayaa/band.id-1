const mongoose = require('mongoose')
const Event = require('../models/event')

exports.events_get_all = (req, res, next) => {
    Event.find()
    .select('_id name location eventImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            events: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    location: doc.location, 
                    eventImage: doc.eventImage,                   
                    request:{
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') +'/events/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.events_create = (req, res, next) => {
    const event = new Event({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        user: req.user,
        location: req.body.location,
        eventImage: req.body.eventImage
        // eventImage: req.file.path
    })
    event.save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Event created',
            createdEvent: {
                _id: result._id,
                name: result.name,
                description:result.description,
                user: result.user,
                location: result.location,      
                eventImage: result.eventImage,              
                request:{
                    type: 'POST',
                    url: req.protocol + '://' + req.get('host') +'/events/' + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    
}

exports.events_get_id = (req, res, next) => {
    const id = req.params.eventId
    Event.findById(id)
    .select('_id name location eventImage')
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc){
            res.status(200).json({
                event: doc,
                request:{
                    type: 'GET',
                    url: req.protocol + '://' + req.get('host') +'/events/' + doc._id
                }
            })
        }else{
            res.status(404).json({message: 'Not Found'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.events_update = (req, res, next) => {
    const id = req.params.eventId
    const props = req.body
    Event.update({_id:id}, props).exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Event updated',
            request:{ 
                type: 'PATCH',
                url: req.protocol + '://' + req.get('host') +'/events/' + id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.events_delete = (req, res, next) => {
    const id = req.params.eventId
    Event.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            message: 'Event deleted',
            request:{
                type: 'POST',
                url: req.protocol + '://' + req.get('host') +'/events/',
                data:{
                    name: 'String',
                    location: 'String'
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}