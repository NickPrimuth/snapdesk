/**
 * ************************************
 *
 * @module  BystanderTicketBox
 * @author
 * @date
 * @description  component that renders a single textbox for all Bystanders / Mentors
 *
 * ************************************
 */

import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
let buttons;
let user;

class BystanderTicketBox extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    let acceptPayload = {
      messageId: this.props.ticket.messageId,
      userId: this.props.userId
    }
    if (this.props.ticket.status === 'active') {
      //ticket published by another user but has not been pick up yet
      //Accept button will be active but Cancel button will not and mentee is anonymous
      user = 'Anonymous';
      buttons = (
        <span>
          <Button onClick={() => this.props.acceptTicket(acceptPayload)}type="button" className="btn btn-success">Accept</Button>
          <Button disabled={true} type="button" className="btn btn-warning">Cancel</Button>
       </span>
        )
    } else if (this.props.ticket.userId !== this.props.ticket.mentorId && this.props.ticket.status === 'pending') {
       //this is when the ticket has been picked up by another mentor already
      //Both button will not be active and mentee is anonymous
      user = 'Anonymous';
      buttons = (
        <span>
          <Button disabled={true} type="button" className="btn btn-success">Accept</Button>
          <Button disabled={true} type="button" className="btn btn-warning">Cancel</Button>
       </span>
        )
    } else if (this.props.ticket.userId === this.props.ticket.mentorId && this.props.ticket.status === 'pending') {
       //user is the mentor
      //Cancel button is active but Accept is not. mentee userName is active
      user = this.props.ticket.menteeId;
      buttons = (
        <span>
          <Button disabled={true} type="button" className="btn btn-success">Accept</Button>
          <Button onClick={() => this.props.cancelAccept(this.props.messageId)} type="button" className="btn btn-warning">Cancel - not active</Button>
       </span>
        )
    }
  
    return (

      <div className="BystanderTicketBox">
        <p>Request: {this.props.messageInput}</p>
        <p>Expected Snaps: {this.props.messageRating}</p>
        {buttons}
        <p>User: {user}</p>
      </div>
    )
  }
}

export default BystanderTicketBox;
