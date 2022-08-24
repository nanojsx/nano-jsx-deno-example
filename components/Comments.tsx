import { h, render, Component } from '../deps.ts'

export class Comments extends Component {
  didMount() {
    console.log('hello from comments')
  }

  addComment() {
    const el = document.getElementById('comments')
    const ul = el?.querySelector('ul')

    const newListElement = render(<li>new list element</li>)
    ul?.appendChild(newListElement)
  }

  render() {
    const comments = this.props.comments || []

    return (
      <div id="comments">
        <h2>Comments</h2>
        <ul>
          {comments.map((comment: any) => {
            return <li>{comment}</li>
          })}
        </ul>
        <a onClick={() => this.addComment()}>click me</a>
      </div>
    )
  }
}
