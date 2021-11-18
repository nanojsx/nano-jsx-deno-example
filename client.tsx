import { h, hydrate } from './nano.ts'

import Comments from './components/Comments.tsx'

const comments = ['client side comment one', 'client side comment two']

const start = () => {
  hydrate(<Comments comments={comments} />, document.getElementById('comments'))
}

window.addEventListener('load', event => {
  start()
})
