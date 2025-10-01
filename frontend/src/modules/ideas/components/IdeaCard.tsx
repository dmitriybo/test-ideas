import { FC } from 'react'

import { Idea } from '@/modules/ideas/api/types'

interface Props {
  idea: Idea
  vote: (id: number) => void
}

export const IdeaCard: FC<Props> = ({ idea, vote }) => (
  <li className="p-4 border border-gray-300 rounded shadow-sm flex justify-between items-center">
    <div>
      <h2 className="font-semibold">{idea.title}</h2>
      {idea.description && <p className="text-gray-600">{idea.description}</p>}
      <p className="text-sm text-gray-500">Голосов: {idea.votes}</p>
    </div>
    <button
      className={`px-4 py-2 rounded text-white ${
        idea.canVote ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
      }`}
      disabled={!idea.canVote}
      onClick={() => vote(idea.id)}
    >
      Голосовать
    </button>
  </li>
)
