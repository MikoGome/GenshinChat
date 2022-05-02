import React from 'react';
import { iconBig } from '../../utils/helperFunctions';

import {Component} from 'react';

class Message extends Component {

  readonly picture: string;
  readonly props: {
    readonly entry: {
      readonly name: string,
      readonly gender: string,
      readonly main: string,
      readonly message: string
    },
    readonly myName: string
  }
  
  constructor(props) {
    super(props);
    const picture = iconBig(this.props.entry.main, this.props.entry.gender);
    this.picture = picture;
  }

  render() {

    return (
      <li className={this.props.myName === this.props.entry.name ? 'me': ''}>
      <div className="icon">
        <img src={this.picture} alt={this.props.entry.main} />
      </div>
      <div className={"message"}>
        <div className="bubble bubbling">
          {this.props.entry.message}
        </div>
        <aside>
          {this.props.entry.name}
        </aside>
      </div>
      </li>
    )
  }
}

export default Message;