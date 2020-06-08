import React from 'react';

const entries = ({name, entries, amount}) =>{
  return(
    <div>
      <div className='white f3' style={{paddingBottom:'20px'}}>
      {`Hey ${name}! You have checked ${entries} images for faces!`}
    </div>
    </div>
  )
}

export default entries;