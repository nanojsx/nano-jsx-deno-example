import { h, FC } from 'nano-jsx'

export const Hello: FC<{ name: string }> = ({ name }) => {
  return <h1>Hello {name}!</h1>
}
