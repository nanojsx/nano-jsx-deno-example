import { h, FC } from '../deps.ts'

export const Hello: FC<{ name: string }> = ({ name }) => {
  return <h1>Hello {name}!</h1>
}
