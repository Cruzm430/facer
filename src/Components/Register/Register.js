import React from 'react';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      password:'',
      name:'',
      error:''
    }
  }
  onNameChange = (e) => {
    this.setState({name:e.target.value})
  }
  onEmailChange = (e) => {
    this.setState({email:e.target.value})
  }
  onPasswordChange = (e) => {
    this.setState({password:e.target.value})
  }
  onSubmitSignIn = () => {
    const {email, password, name} = this.state
    if(!name){
      this.setState({error:`Please enter your name`})
    }
    else if(!email || !email.includes('@') || !email.includes('.com')){
      this.setState({error:`Please enter a valid email`})
    }
    else if(!password){
      this.setState({error:`Please enter a valid password`})
    }
    else{
      fetch('https://evening-woodland-89554.herokuapp.com/register', {
        method:'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          name:name
        })
      })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
        else{
          this.setState({error:`Looks like you have an account already, Sign in!`})
        }
      })
      
    }
  }
  render(){
    return (
      <div>
        No account, huh? No problem, sign up below!
        {this.state.error ? <div className='white f3 pa2'>{this.state.error}</div>:''}
        <article className='br3 ba b--black-10 mv4 w-100 w50-m 2-25-1 mw5 center shadow-5'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 1h-copy f6' htmlFor='name'>Name</label>
                <input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='text' name='name' id='name' onChange={this.onNameChange}/>
              </div>
              <div className='mt3'>
                <label className='db fw6 1h-copy f6' htmlFor='email-address'>Email</label>
                <input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='email' name='email-address' id='email-address' onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
            </div>
            <div className="lh-copy mt3">
            </div>
          </div>
        </main>
      </article>
      </div>
    )
  }
}

export default Register