import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMain } from '../../actions/actions';

function character({name, picture}):JSX.Element {
  const dispatch = useDispatch();

  function titleCase(str) {
    return str
      .split('-')
      .map((el:string) => el[0].toUpperCase() + el.slice(1))
      .join(' ');
  }

  return(
    <div className="character" onClick={() => {
      dispatch(updateMain(name));
      console.log('hi');
      }}>
      <figure>
        <img src={picture}/>
        <figcaption>{titleCase(name)}</figcaption>
      </figure>
    </div>
  )
}

export default character;