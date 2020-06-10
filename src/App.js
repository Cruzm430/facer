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
  box:[],
  amount: 0,
  hit:false,
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
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    const faces = data.outputs[0].data.regions
    if(faces){
      return faces.map(face=>{
        const foundFace = face.region_info.bounding_box;
        return{
          leftCol: foundFace.left_col * width,
          topRow: foundFace.top_row * height,
          rightCol: width - (foundFace.right_col * width),
          bottomRow: height - (foundFace.bottom_row * height)
        }
      })
    }
    else{
      return null
    }
  }
  displayFaceBox = (box) =>{
    if(box){
      this.setState({box:box, amount:box.length, hit:true})
    }
    else this.setState({box:null, hit:true})
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
            id:this.state.user.id,
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
    const {isSignedIn, imageURL, route, box, entries, name, hit, amount} = this.state;
    const {onButtonSubmit, onInputChange, onRouteChange} = this
    return (
      <div className="App">
          <Particles className='particles'/>
          <Nav isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
          {route === 'home' ? 
          <div>
          <Logo/>
          <Entries name={name} entries={entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} amount={amount} hit={hit} box={box}/>
          <FaceRecognition imageURL={imageURL} box={box} amount={amount}/>
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
