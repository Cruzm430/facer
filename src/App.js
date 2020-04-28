import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Entries from './Components/Entries/Entries';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import Particles from 'react-particles-js';

const initialState = {
  input: '',
  imageURL:'',
  box:{},
  route:'signIn',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    password:'',
    email:'',
    entries:0,
    joined: ''
  }
}
 
class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }
  loadUser = (data) =>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      password:data.email,
      email:data.email,
      entries:data.entries,
      joined: data.joined
    }})
  }
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) =>{
    this.setState({box:box})
  }
  onInputChange = (e) =>{
    this.setState({input:e.target.value})
  }
  onButtonSubmit = () =>{
    this.setState({imageURL:this.state.input});
    fetch('https://evening-woodland-89554.herokuapp.com/imageUrl',{
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input:this.state.input
          })
        })
        .then(response => response.json())
        .then(response =>{
          if(response){
            fetch('https://evening-woodland-89554.herokuapp.com/image',{
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries : count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    }) 
    .catch( err => console.log(err))
  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }
  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
    const {onButtonSubmit, onInputChange, onRouteChange} = this
    return (
      <div className="App">
          <Particles className='particles'/>
          <Nav isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
          {route === 'home' ? 
          <div>
          <Logo/>
          <Entries name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition imageURL={imageURL} box={box}/>
          </div>
          :
          (
            route === 'signIn' ?
            <SignIn loadUser={this.loadUser} onRouteChange={onRouteChange}/>:
            <Register loadUser={this.loadUser} onRouteChange={onRouteChange}/>
          )
    }
      </div>
    );
  }
}

export default App;
