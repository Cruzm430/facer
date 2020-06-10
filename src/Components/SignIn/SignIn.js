import React from 'react';

class SignIn extends React.Component{
  constructor(){
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
      error:''
    }
  }
  onEmailChange = (e) =>{
    this.setState({signInEmail:e.target.value})
  }
  onPasswordChange = (e) =>{
    this.setState({signInPassword: e.target.value})
  }
  onSubmitSignIn = () => {
    const {signInEmail, signInPassword} = this.state
    if(!signInEmail || !signInEmail.includes('@') || !signInEmail.includes('.com')){
      this.setState({error:`Please enter a valid email`})
    }
    else if(!signInPassword){
      this.setState({error:`The password is left blank`})
    }
    else{
      fetch('https://evening-woodland-89554.herokuapp.com/signin', {
        method:'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
      .then(response => response.json())
      .then(user =>{
        if(user.id){
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        }
        else{
          this.setState({error:`That didn't work, let's try again?`})
        }
      })
    }
  }
  render(){
    const {onRouteChange} = this.props
    return (
      <div>
        <div className='white f1 underline pa3'>Facer</div>
        Welcome to <span className='white' style={{fontWeight:'bold'}}>Facer</span>
        <br/>
        An app that locates faces in an image URL!
        <br/> 
        Please sign in or create an account to use the application
        {this.state.error ? <div className='white f3 pa2'>{this.state.error}</div>:''}
        <article className='br3 ba b--black-10 mv4 w-100 w50-m 2-25-1 mw5 center shadow-5'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
                <div className='mt3'>
                  <label className='db fw6 1h-copy f6' htmlFor='email-address'>Email</label>
                  <input onChange={this.onEmailChange} className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='email' name='email-address' id='email-address'/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
              </fieldset>
              <div className="">
                <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
              </div>
              <div className="lh-copy mt3">
                <p onClick={()=> onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
              </div>
            </div>
          </main>
        </article>
      </div>
    )
  }
}


export default SignIn