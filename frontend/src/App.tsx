import { useEffect, useState } from 'react'

import { ideasApi } from '@/modules/ideas/api/methods'
import { Idea } from '@/modules/ideas/api/types'
import { IdeaCard } from '@/modules/ideas/components/IdeaCard'
import { Error } from '@/ui/Error'
import { Loading } from '@/ui/Loading'
import { Toast } from '@/ui/Toast'

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const fetchIdeas = async () =>
    ideasApi
      .getIdeas()
      .then((data) => setIdeas(data))
      .catch(() => {
        setError('Не удалось загрузить идеи')
      })

  const vote = async (id: number) => {
    try {
      const data = await ideasApi.sendVote(id)
      setToast(data.message || data.error || 'Неизвестная ошибка')
      if (data.message) {
        fetchIdeas()
      }
    } catch (e) {
      setToast('Ошибка при голосовании')
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchIdeas().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Идеи для продукта</h1>

      {error && <Error message={error} />}

      <ul className="space-y-4">
        {ideas.map((idea) => (
          <IdeaCard idea={idea} key={idea.id} vote={vote} />
        ))}
      </ul>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}

export default App
