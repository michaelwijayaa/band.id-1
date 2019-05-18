const express = require('express')
const router = express.Router()
const ApplyController = require('../controllers/applies')
const checkAuth = require('../middleware/check-auth')

router.get('/', ApplyController.apply_get_all)

router.post('/', checkAuth, ApplyController.apply_event)

router.get('/:applyId', checkAuth, ApplyController.apply_get_id)

router.delete('/:applyId', checkAuth, ApplyController.apply_delete)

module.exports = router