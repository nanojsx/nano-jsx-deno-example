import { Comments } from '../components/Comments.tsx'
import { h, hydrate } from 'nano-jsx'

const comments = ['Hey! This is the first comment.', 'Hi, from another comment!']

const el = document.getElementById('comments')
if (el) hydrate(<Comments comments={comments} />, el)
