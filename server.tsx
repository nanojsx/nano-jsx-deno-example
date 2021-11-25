import { h, renderSSR, Helmet } from './nano.ts'
import { serve } from 'https://deno.land/std@0.116.0/http/server.ts'

// components
import Comments from './components/Comments.tsx'
import { Hello } from './components/Hello.tsx'

const { files } = await Deno.emit('./client.tsx', {
  bundle: 'module',
  compilerOptions: {
    jsxFactory: 'h',
    target: 'es2015',
    module: 'es2015'
  }
})

const comments = ['server side comment one']

const App = () => (
  <div>
    <Helmet>
      <title>Nano JSX SSR</title>
      <meta name="description" content="Server Side Rendered Nano JSX Application" />
    </Helmet>

    <Helmet footer>
      <script src="/bundle.js"></script>
    </Helmet>

    <h2>Comments</h2>
    <div id="comments">
      <Comments comments={comments} />
    </div>
  </div>
)

const ssr = renderSSR(<App />)
const { body, head, footer } = Helmet.SSR(ssr)

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head.join('\n')}
  </head>
  <body>
    ${renderSSR(<Hello />)}
    ${body}
    ${footer.join('\n')}
    <script type="module" src="/bundle.js"></script>
  </body>
</html>`

const addr = ':8080'

const handler = (request: Request): Response => {
  if (request.url === 'http://localhost:8080/') {
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  }

  if (request.url === 'http://localhost:8080/bundle.js') {
    return new Response(files['deno:///bundle.js'], { headers: { 'Content-Type': 'application/javascript' } })
  }

  return new Response('404', { status: 404 })
}

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`)
await serve(handler, { addr })
