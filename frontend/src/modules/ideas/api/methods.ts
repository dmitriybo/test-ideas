import { BASE_URL } from '@/config/api'

import { Idea, VoteResponse } from './types'

const getIdeas = async (): Promise<Idea[]> => {
  const res = await fetch(`${BASE_URL}/ideas`)
  return await res.json()
}

const sendVote = async (id: number): Promise<VoteResponse> => {
  const res = await fetch(`${BASE_URL}/ideas/${id}/vote`, {
    method: 'POST',
  })
  return res.json()
}

export const ideasApi = { getIdeas, sendVote }
