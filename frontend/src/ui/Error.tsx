import { FC } from 'react'

interface Props {
  message: string
}

export const Error: FC<Props> = ({ message }) => (
  <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{message}</div>
)
