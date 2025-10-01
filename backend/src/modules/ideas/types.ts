export interface Idea {
  id: string
  title: string
  description: string | null
  votes: number
  canVote: boolean
}
