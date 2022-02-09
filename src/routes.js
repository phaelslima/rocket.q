const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
router.get('/create-room', (req, res) =>
  res.render('index', { page: 'create-room' })
)
router.get('/room/:room', (req, res) => res.render('room'))

module.exports = router
