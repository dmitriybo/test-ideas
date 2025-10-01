import { Router } from 'express'

import { IdeasService } from '../modules/ideas/ideas.service'
import { VotesService } from '../modules/votes/votes.service'
import { getIp } from '../utils/getIp'

export default function ideasRouter() {
  const router = Router()

  router.get('/', async (req, res) => {
    let ip: string | null = null
    try {
      ip = getIp(req)
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message })
    }

    const ideas = await IdeasService.getAllIdeas(ip)
    res.json(ideas)
  })

  router.post('/:id/vote', async (req, res) => {
    const ideaId = req.params.id
    if (!ideaId) {
      return res.status(400).json({ error: 'Не передан idea ID' })
    }

    let ip: string | null = null
    try {
      ip = getIp(req)
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message })
    }

    return await VotesService.vote({ ideaId, ip })
      .then(() => res.json({ message: 'Ваш голос учтен' }))
      .catch((e: Error) => res.status(409).json({ error: e.message }))
  })

  return router
}
