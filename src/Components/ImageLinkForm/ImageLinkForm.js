import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit, amount, box, hit}) =>{
  const phrase1 = amount === 1 ? `There is` : `There are`
  const phrase2 = amount === 1 ? `face` : `faces`

  return(
    <div>
    
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
        <input onChange={onInputChange} className='f4 pa2 w-70 center' placeholder='Paste Image URL here!' type='text'/>
        <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
        </div>
      </div>
      {!hit ? '' : 
        !box ? <p className='f3'>{`I can't find a face in this photo!`}</p>: <p className='f3'>{phrase1} <span className='white'>{amount}</span> {`${phrase2} in this picture!`}</p> 
        }
    </div>
  )
}

export default ImageLinkForm