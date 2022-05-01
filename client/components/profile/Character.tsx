import React, {useRef, useEffect} from 'react';
import {titleCase} from '../../utils/helperFunctions';
import {useDispatch} from 'react-redux';
import {updateSpotlight} from '../../actions/actions';

function Character({name, el, index, picture}):JSX.Element {
  const dispatch = useDispatch();

  const char:React.MutableRefObject<HTMLImageElement> = useRef();
  useEffect(() => {
    setTimeout(() => char.current?.classList.add('bubbling'), 25 * index);
  }, [])
  return(
    <div 
      className="character" 
      onClick={() => {
        dispatch(updateSpotlight(el));
      }}
    >
      <figure  ref={char} style={{opacity: 0}}>
        <img 
          src={picture}
        />
        <figcaption>{titleCase(name)}</figcaption>
      </figure>
    </div>
  )
}

export default Character;