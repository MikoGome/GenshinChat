import React from "react";
import {connect} from "react-redux";
import { portrait } from "../../utils/helperFunctions";

const mapStateToProps = state => ({
  talk: state.talk
});

const mapDispatchToProps = dispatch => ({

});

function Partner(): JSX.Element {
  const partnerPortrait = portrait();
  const partner = {};
  
  return (
    <div className="avatar partner">
      <img
         src={partner.main && partnerPortrait} 
         onLoad={(e:any) => e.target.classList.add('avatar-appear')}
      />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Partner);