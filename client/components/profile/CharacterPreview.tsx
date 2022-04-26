import React, {useEffect, useRef} from 'react';
import {portrait} from '../../utils/helperFunctions';

function CharacterPreview({character, spotlight, gender}):JSX.Element {
  
  const image = portrait(character, gender);

  const char:React.MutableRefObject<HTMLDivElement> = useRef();

  useEffect(() => {
    if(character === spotlight) {
      char.current.classList.add('spotlight');
    } else {
      char.current.classList.remove('spotlight');
    }
  }, [spotlight]);

  return(
    <div className="character-preview floating" ref={char}>
      <img src={image} />
    </div>
  )
}

export default CharacterPreview;