import { h, renderSSR, Helmet } from './deps.ts'
import { Application, Router } from './deps.ts'

import { Comments } from './components/Comments.tsx'
import { Hello } from './components/Hello.tsx'

const comments = ['Hey! This is the first comment.', 'Hi, from another comment!']

const App = () => (
  <div>
    <Helmet>
      <title>Nano JSX SSR</title>
      <meta name="description" content="Server Side Rendered Nano JSX Application" />
    </Helmet>

    <Hello />

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
    ${body}
    ${footer.join('\n')}
  </body>
</html>`

const router = new Router()
router.get('/', context => {
  context.response.body = html
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen', ({ port }) => {
  console.log(`Listening on: http://localhost:${port}`)
})

await app.listen({ port: 5000 })
