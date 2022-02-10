const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const router = express.Router()

router.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
router.get('/create-room', (req, res) =>
  res.render('index', { page: 'create-room' })
)
router.post('/create-room', RoomController.create)

router.post('/enter-room/', RoomController.enter)
router.get('/room/:room', RoomController.open)

router.get('/not-found', (req, res) =>
  res.render('index', { page: 'not-found' })
)

router.post('/question/create/:room', QuestionController.create)
router.post('/question/:room/:question/:action', QuestionController.index)

module.exports = router
