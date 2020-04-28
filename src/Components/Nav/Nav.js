import React from 'react';

const Nav = ({onRouteChange, isSignedIn}) => {
  return(
    isSignedIn ? 
    <nav style={{display:'flex', justifyContent:'flex-end'}}>
      <p onClick={()=> onRouteChange('signout')} className='f3 dim link black underline pa3 pointer'>Sign Out</p>
    </nav>
    :
    <nav style={{display:'flex', justifyContent:'flex-end'}}>
      <p onClick={()=> onRouteChange('signIn')} className='f3 dim link black underline pa3 pointer'>Sign in</p>
      <p onClick={()=> onRouteChange('register')}className='f3 dim link black underline pa3 pointer'>Register</p>
    </nav>
  )
}

export default Nav