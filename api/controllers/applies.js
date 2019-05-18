const mongoose = require('mongoose')
const Apply = require('../models/apply')
const Event = require('../models/event')

exports.apply_get_all = (req, res, next) => {
    Apply.find()
    .select('_id event')
    .populate('event', 'name')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            apply: docs.map(doc => {
                return {
                    _id: doc._id,
                    event: doc.event,                    
                    request:{
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') +'/apply/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

exports.apply_event = (req, res, next) => {
    Event.findById(req.body.event)
    .then(event => {
        if(!event){
            return res.status(404).json({
                message: 'Not found'
            })
        }
        const apply = new Apply({
            _id: mongoose.Types.ObjectId(),
            event: req.body.event
        })
        return apply.save()
    })
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Application sent',
            appSend: {
                _id: result._id,
                event: result.event,                
                request:{
                    type: 'POST',
                    url: req.protocol + '://' + req.get('host') +'/apply/' + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.apply_get_id = (req, res, next) => {
    const id = req.params.applyId
    Apply.findById(id)
    .select('_id event')
    .populate('event')
    .exec()
    .then(doc => {
        if(!doc){
            res.status(404).json({
                message: 'Not found'
            })
        }
        res.status(200).json({
            apply: doc,
            request:{
                type: 'GET',
                url: req.protocol + '://' + req.get('host') +'/apply/' + doc._id
            }
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

exports.apply_delete = (req, res, next) => {
    const id = req.params.applyId
    Apply.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Application canceled',
            request:{
                type: 'POST',
                url: url,
                data:{                    
                    event: 'eventId'
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}