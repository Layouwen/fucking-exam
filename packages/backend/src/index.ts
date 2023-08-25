import express from 'express'
import config from './config'
import cors from 'cors'
import { json } from 'body-parser'
import { api } from './router'
import session from 'express-session'

const app = express()

app.use(
  cors({
    origin: (requestOrigin, callback) => {
      if (process.env.NODE_ENV === 'development') {
        callback(null, true)
      } else {
        const WHITE_LIST = ['localhost', 'easyhappy.top']
        if (!requestOrigin || WHITE_LIST.some(url => requestOrigin.includes(url))) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    },
  })
)
app.use(json())
app.use(
  session({
    secret: config.session.secret,
  })
)

app.use('/api', api)

app.listen(config.port, () => {
  console.log(`server is running http://localhost:${config.port}`)
})
