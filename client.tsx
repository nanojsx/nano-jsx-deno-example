import 'https://deno.land/x/nano_jsx@v0.0.11/deno_lib/types.ts'
import {
  h,
  hydrate
} from 'https://deno.land/x/nano_jsx@v0.0.11/deno_lib/core.ts'

import Comments from './components/Comments.tsx'

const comments = ['client side comment one', 'client side comment two']

const start = () => {
  hydrate(<Comments comments={comments} />, document.getElementById('comments'))
}

window.addEventListener('load', event => {
  start()
})
