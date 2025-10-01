export interface Idea {
  id: number
  title: string
  description: string | null
  votes: number
  canVote: boolean
}

export interface VoteResponse {
  message?: string
  error?: string
}
