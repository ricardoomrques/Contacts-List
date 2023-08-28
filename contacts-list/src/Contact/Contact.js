import React, { Component } from 'react';

class Contact extends React.Component {
    render() {
      return <div>
        <img src={require('./../images/' + this.props.image)} />
        <h1>{this.props.name}</h1>
        <p>{this.props.contact}</p>
        <p>{this.props.email}</p>
      </div>;
    }
}

export default Contact;