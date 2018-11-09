require('dotenv').config()
const constants = require('./config/constants')
const server = require('./config/express')
const next = require('next')
const clientRoutes = require('./clientRoutes')
const port = parseInt(constants.PORT, 10) || 3000
const dev = constants.env !== 'production'
const app = next({ dev })

const handler = clientRoutes.getRequestHandler(app)

app.prepare().then(() => {

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  startServer()

  function startServer () {
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  }
})
