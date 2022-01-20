import { h, Component } from '../nano.ts'

export class Comments extends Component {
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
