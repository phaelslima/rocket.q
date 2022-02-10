const Database = require('../db/config')

module.exports = {
  async index(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questionId = req.params.question
    const action = req.params.action

    const password = req.body.password

    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

    if (verifyRoom.pass === password) {
      if (action == 'check') {
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
      } else if (action == 'delete') {
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
      }

      await db.close()

      res.redirect(`/room/${roomId}`)
    } else {
      res.render('wrong', { roomId })
    }
  },
  async create(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const question = req.body.question

    await db.run(`
      INSERT INTO questions (
        title,
        read,
        room_id
      ) VALUES (
        "${question}",
        0,
        ${parseInt(roomId)}
      )
    `)

    await db.close()

    res.redirect(`/room/${roomId}`)
  }
}
