import { prisma } from '../../config/prisma'
import { Idea } from './types'

export class IdeasService {
  static async getAllIdeas(ip: string): Promise<Idea[]> {
    const ideas = await prisma.$queryRawUnsafe<
      Array<{
        id: string
        title: string
        description: string | null
        total_votes: number
        has_voted: boolean
        user_vote_count: number
      }>
    >(
      `
      WITH user_votes AS (
        SELECT idea_id
        FROM votes
        WHERE ip = $1
      )
      SELECT 
        i.id,
        i.title,
        i.description,
        COUNT(v.id) AS total_votes,
        CASE WHEN uv.idea_id IS NOT NULL THEN TRUE ELSE FALSE END AS has_voted,
        (SELECT COUNT(DISTINCT idea_id) FROM votes WHERE ip = $1) AS user_vote_count
      FROM ideas i
      LEFT JOIN votes v ON v.idea_id = i.id
      LEFT JOIN user_votes uv ON uv.idea_id = i.id
      GROUP BY i.id, uv.idea_id
      ORDER BY i.id
    `,
      ip,
    )

    return ideas.map((i) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      votes: Number(i.total_votes),
      canVote: !i.has_voted && i.user_vote_count < 10,
    }))
  }
}
