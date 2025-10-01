import cors from 'cors'
import express from 'express'

import ideasRouter from './routes/ideas'

const app = express()

app.use(cors())
app.use(express.json())

app.set('trust proxy', true)

app.use('/api/ideas', ideasRouter())

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`🚀  Server running on port ${PORT}. Frontend at http://localhost:3000`)
})
