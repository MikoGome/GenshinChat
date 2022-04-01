import React, {useRef, useContext} from "react";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import {GenderContext} from '../containers/Login.tsx';

function Gender():JSX.Element {
  const male = useRef<any>(null);
  const female = useRef<any>(null);

  const {changeGender} = useContext(GenderContext);

  return (
    <div className="gender-box">
      <label>Male or Female?</label><br/>
      <label className='male gender' ref={male}>
        <MaleIcon style={{color:'blue'}}/>
        <input 
          onChange={(e):void => {
            male.current.classList.add('male-select');
            changeGender(e.target.value);
          }} 
          onBlur={(e):void => male.current.classList.remove('male-select')} 
          type="radio" 
          name="gender" 
          value="male"
        />
      </label>
      <label className='female gender' ref={female}>
        <FemaleIcon style={{color:'palevioletred'}}/>
        <input 
          onChange={(e):void => {
            female.current.classList.add('female-select');
            changeGender(e.target.value);
          }} 
          onBlur={(e):void => female.current.classList.remove('female-select')}
          type="radio" 
          name="gender" 
          value="female"
        />
      </label>
    </div>
  )
}

export default Gender;