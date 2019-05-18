const express = require('express')
const router = express.Router()
const EventsController = require('../controllers/events')
const multer = require('multer')
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid type'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get('/',  EventsController.events_get_all)

router.post('/', checkAuth, upload.single('eventImage'), EventsController.events_create)

router.get('/:eventId',checkAuth, EventsController.events_get_id)

router.patch('/:eventId',checkAuth, EventsController.events_update)

router.delete('/:eventId',checkAuth, EventsController.events_delete)

module.exports = router