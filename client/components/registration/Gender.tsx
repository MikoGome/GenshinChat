import React, {useRef, useContext} from "react";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import {GenderContext} from '../../containers/Login';

import {sfx} from '../../assets/preload';

function Gender():JSX.Element {
  const male = useRef<any>(null);
  const female = useRef<any>(null);

  const {gender, changeGender} = useContext(GenderContext);
  
  return (
    <div className="gender-box">
      <label>Male or Female?</label><br/>
      <label className='male gender' data-testid="maleLabel" ref={male} onClick={() => gender !== 'male' && sfx(2)}>
        <MaleIcon style={{color:'blue'}}/>
        <input 
          data-testid="male"
          onChange={(e):void => {
            female.current.classList.remove('female-select')
            male.current.classList.add('male-select');
            changeGender(e.target.value);
          }} 
          type="radio" 
          name="gender" 
          value="male"
        />
      </label>
      <label className='female gender' data-testid="femaleLabel" ref={female} onClick={() => gender !== 'female' && sfx(2)}>
        <FemaleIcon style={{color:'palevioletred'}} />
        <input 
          data-testid="female"
          onChange={(e):void => {
            male.current.classList.remove('male-select')
            female.current.classList.add('female-select');
            changeGender(e.target.value);
          }} 
          type="radio" 
          name="gender" 
          value="female"
        />
      </label>
    </div>
  )
}

export default Gender;