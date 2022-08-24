import { Comments } from '../components/Comments.tsx'
import { h, hydrate } from 'https://deno.land/x/nano_jsx@v0.0.33/mod.ts'

const comments = ['Hey! This is the first comment.', 'Hi, from another comment!']

const el = document.getElementById('comments')
if (el) hydrate(<Comments comments={comments} />, el)
