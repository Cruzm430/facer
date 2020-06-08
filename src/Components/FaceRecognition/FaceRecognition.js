import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box, amount}) =>{
  if(amount === 0) console.log('nahhh')
  return(
    <div className='center ma'>
      <div className='absolute mt2'> 
      {box ? box.map((face,idx)=><div className='bounding-box' key={idx} style={{top:face.topRow, right:face.rightCol, bottom:face.bottomRow, left:face.leftCol}}></div>) : ``}
      <img id='inputImage' alt='' src={imageURL} width='500px' height='auto'/>
      </div>
    </div>
  )
}

export default FaceRecognition