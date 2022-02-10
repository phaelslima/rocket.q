const Database = require('../db/config')
module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId
    let isRoom = true

    while (isRoom) {
      roomId = ''

      for (let i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }

      const rooms = await db.all(`SELECT id FROM rooms WHERE id = ${roomId}`)
      isRoom = rooms.length == 0 ? false : true

      if (!isRoom) {
        await db.run(`
          INSERT INTO rooms (
            id,
            pass
          ) VALUES (
            ${parseInt(roomId)},
            "${pass}"
          )
        `)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },
  async open(req, res) {
    const db = await Database()

    const roomId = req.params.room

    const questions = await db.all(
      `SELECT * FROM questions WHERE room_id = ${roomId} ORDER BY read, id ASC`
    )

    await db.close()

    res.render('room', { roomId, questions })
  },
  async enter(req, res) {
    const db = await Database()
    const roomId = req.body.roomId

    if (roomId) {
      const roomExistID = await db.get(
        `SELECT * FROM rooms WHERE id = ${roomId}`
      )

      if (roomExistID) {
        res.redirect(`/room/${roomId}`)
      } else {
        res.redirect(`not-found`)
      }
    } else {
      res.redirect(`not-found`)
    }
  }
}
