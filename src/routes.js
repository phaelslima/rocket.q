const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const router = express.Router()

router.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
router.get('/create-room', (req, res) =>
  res.render('index', { page: 'create-room' })
)
router.get('/room/:room', (req, res) => res.render('room'))

router.post('/room/:room/:question/:action', QuestionController.index)
router.post('/create-room', RoomController.create)

module.exports = router
