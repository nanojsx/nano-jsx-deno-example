import { Component, h } from '../nano.ts'

class Comments extends Component {
  render() {
    return (
      <ul>
        {this.props.comments.map((comment: any) => {
          return <li>{comment}</li>
        })}
      </ul>
    )
  }
}

export default Comments
