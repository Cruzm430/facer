import React from 'react';

const entries = ({name, entries, amount}) =>{
  const phrasing = entries > 1 ? `Hey ${name}! You have checked ${entries} images for faces!` : 'Check an image to get started!'
  return(
    <div>
      <div className='white f3' style={{paddingBottom:'20px'}}>
      {phrasing}
    </div>
    </div>
  )
}

export default entries;