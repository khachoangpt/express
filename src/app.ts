import compression from 'compression'
import cors from 'cors'
import express, { json, urlencoded } from 'express'
import type { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const app: Express = express()

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(morgan('combined'))
app.use(urlencoded({ extended: false }))
app.use(json())

export { app }
