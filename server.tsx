import {
  h,
  Helmet,
  renderSSR
} from 'https://deno.land/x/nano_jsx@v0.0.11/mod.ts'

import Comments from './Comments.tsx'

const [_, clientJs] = await Deno.bundle('./client.tsx', undefined, {
  jsxFactory: 'h'
})

const comments = ['server side comment one']

const App = () => (
  <div>
    <Helmet>
      <title>Nano JSX SSR</title>
      <meta
        name="description"
        content="Server Side Rendered Nano JSX Application"
      />
    </Helmet>

    <Helmet footer>
      <script src="/bundle.js"></script>
    </Helmet>

    <h1>Hello nano!</h1>
    <div id="comments">
      <Comments comments={comments} />
    </div>
  </div>
)

const app = renderSSR(<App />)
const { body, head, footer } = Helmet.SSR(app)

console.log('head', head)
console.log('footer', footer)

const hasWindow = typeof window !== 'undefined' && window.document
const isDeno = typeof Deno !== 'undefined'

const isSSR = !hasWindow || isDeno
console.log('isSSR', isSSR)

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head.join('\n')}
  </head>
  <body>
    ${body}
    ${footer.join('\n')}
    <script type="module" src="/bundle.js"></script>
  </body>
</html>`

// console.log(html)

import { serve } from 'https://deno.land/std@0.62.0/http/server.ts'
const s = serve({ port: 8080 })

console.log('http://localhost:8080/')

for await (const req of s) {
  const { method, url } = req

  if (url === '/') req.respond({ body: html })
  else if (url === '/bundle.js') {
    req.headers.set('Content-Type', 'text/javascript')
    req.respond({ body: clientJs, headers: req.headers })
  } else req.respond({ body: 'not found', status: 404 })
}
