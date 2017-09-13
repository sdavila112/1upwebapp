import React from 'react'
import Link from 'next/prefetch'
import Header from '../components/header.js'
import { authenticate, logout, logoutEvent } from '../utils'
const config = require('../config.json')

var Iframe = React.createClass({
  render: function() {
    return(
      <div>
      </div>
    )
  }
});

export default class Home extends React.Component {
  static async getInitialProps ({ req, res }) {
    const user = await authenticate(req, res)
    return { user }
  }

  componentDidMount () {
    if (this.props.user) {
      try {
        window.localStorage.setItem('user', this.props.user)
      } catch (err) {}
    } else {
      window.localStorage.remove('user')
    }
  }


  render () {
    return (
      <div>
        <Header user={this.props.user} />
        <h1>{`Welcome to 1upHealth's Demo App`}</h1>
        <h2>Link your providers</h2>
        <iframe
          style={{border:'0px solid #fff'}}
          src={`https://api.1up.health/connect/marketplace?client_id=${config.clientId}&access_token=${this.props.user.oneup_access_token}`}
          height={500}
          width='100%'/>
        <Link href='/timeline'>Go to your medical timeline</Link>
        <style jsx>{`
          div {
            text-align: center;
          }
          ul {
            list-style: none;
          }
        `}</style>
      </div>
    )
  }
}
