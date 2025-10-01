import { prisma } from '../../config/prisma'

export class VotesService {
  static async vote({ ideaId, ip }: { ideaId: string; ip: string }) {
    const voteCount = await prisma.vote.count({
      where: { ip },
    })

    if (voteCount >= 10) {
      throw new Error('Достигнут лимит голосов для этого IP-адреса')
    }

    await prisma.vote
      .create({
        data: {
          ideaId,
          ip,
        },
      })
      .catch((e) => {
        if (e.code === 'P2002') {
          throw new Error('Вы уже проголосовали за эту идею')
        }
        throw new Error('Internal server error')
      })
  }
}
