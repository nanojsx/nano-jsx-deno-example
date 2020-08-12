import 'https://deno.land/x/nano_jsx@v0.0.11/deno_lib/types.ts'
import {
  h,
  hydrate
} from 'https://deno.land/x/nano_jsx@v0.0.11/deno_lib/core.ts'

import Comments from './Comments.tsx'

const start = () => {
  console.log('start')
  hydrate(
    <Comments comments={['client side comment']} />,
    document.getElementById('comments')
  )
}

window.addEventListener('load', event => {
  start()
})
