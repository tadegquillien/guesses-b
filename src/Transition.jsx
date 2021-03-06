//this component is called between the Training phase and the Test phase. 
//it asks participants how difficult they found the game, and briefly introduces
//the test phase


import { useState } from 'react';

import { textStyle, buttonStyle } from './dimensions';
import { comb_array } from './randomizedParameters';




const Transition = (props) => {
    //keeps track of which page we are on
    const [ transitionTrial, setTransitionTrial ] = useState(0);
    //a list of the pages for the transition
    const transitionTrialsList = [
        <TransitionOne setTransitionTrial={setTransitionTrial}/>,
        <TransitionTwo setCurrentPhase={props.setCurrentPhase} />
    ];
    //display the current page
    return(
        transitionTrialsList[transitionTrial]
    )
    
    
}

//a question about the game difficulty
const TransitionOne = (props) => {
    //keeps track of the latest likert response
    
    const handleClick = () =>{
        props.setTransitionTrial((a)=>a+1);
    }
    
    //display the question
    return(
        <div style={textStyle}>
        <p>We will now start the main phase of the study.</p>
        <p>On each page, you will see a box. 
        </p>
        <p>Imagine that you have a friend who cannot see the contents of the box.
             Your friend knows the box contains red, blue, green, and yellow balls,
              but doesn't know how many balls of each color there are.</p>
        <p>
        If your friend asked you what would happen if someone randomly
drew a ball from the box, what would you tell them?
        </p>
        <p>We will display some possible things you could say, and we will ask you whether you think they are good answers.</p>
        <p>You will rate each statement on a scale from 1 (for a <b>bad</b> answer) to 
            9 (for a <b>good</b> answer).</p>
        
        <br></br>
        <button style={buttonStyle} onClick={()=>handleClick()}>click to continue</button>
        </div>
        
    )
}

//briefly introduces the test phase
const TransitionTwo = (props) => {
    return(
        <div style={textStyle}>
            <p>There will be {comb_array.length} boxes in total.</p>
            <p>Please try to stay concentrated and engaged throughout the task.</p>
            <button style={buttonStyle} onClick={()=>{props.setCurrentPhase("test")}}>click to start the task</button>
        </div>
    )
    
}

export default Transition;