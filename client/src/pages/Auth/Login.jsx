import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    error: false,
    success: false,
    content: '',
  }

  login = (event) => {
    fetch("/api/auth/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: this.state.content }),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(post => {
        this.setState({
          success: true,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    return (
      <div class="container">
        <form onClick={this.login}>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" placeholder="Password" />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;