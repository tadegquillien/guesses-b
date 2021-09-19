//manages the page for the test phase
//this component is called 1+N times, where N is the number of
//colored balls that the fictitious player draws
//the first time is a simple instructions message
//all other N times, the participant is asked about the
//causal strength of one colored ball that was drawn

import React, { useState, useRef } from 'react';
import Likert from 'react-likert-scale';
import './TestPhase.css';
import TestImage from './TestImage';
import Data from './Data';
import { likertChoicesTest } from './likertScale';
import { buttonStyle } from './dimensions';
import { shuffle, orderByFrequency } from './convenienceFunctions';

import { comb_array, expanded_comb_array } from './randomizedParameters';



const TestPhase = (props) => {
    
    //keeps track of the participant's response to the causal question
    const [responseOne, setResponseOne] = useState("unclicked");
    const [responseTwo, setResponseTwo] = useState("unclicked");
    const [responseThree, setResponseThree] = useState("unclicked");
    const [responseFour, setResponseFour] = useState("unclicked");




    //when the participant clicks on the likert scale, a button appears that allows one to go
    //to the next trial
    const nextTrialButton = (responseOne > 0 & responseTwo > 0 & responseThree > 0 & responseFour > 0) ? <button style={buttonStyle}
    onClick={() => handleClick()}>
        NEXT {'>'}{'>'}</button> : null;

    // const skipButton = <button style={buttonStyle}
    // onClick={() => handleClick()}>
    //     DEV SKIP {'>'}{'>'}</button>;
        
    //when the participant clicks to go to the next page, 
    //record his response, and go to the next trial
    const handleClick = () => {
        Data.responses.push(
            {
                //the test number (e.g. 1 if this was the first question asked)
                trial: props.testNumber,
                //the participant's response (our main DV)
                responseOne: responseOne,
                responseTwo: responseTwo,
                responseThree: responseThree,
                responseFour: responseFour,
                //the combination of colors in the urn, i.e. the number of balls of the most frequent color,
                //followed by the number of balls of the second most frequent color, etc
                combination: combination
            }
        );
        console.log(Data);
        props.incrementTest(props.testNumber);      
    }
    
    //the likert scale
    const likertOptionsOne =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseOne(val.value);
        },
        id: 1
    };

    const likertOptionsTwo =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseTwo(val.value);
        },
        id: 2
    };

    const likertOptionsThree =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseThree(val.value);
        },
        id: 3
    };

    const likertOptionsFour =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseFour(val.value);
        },
        id: 4
    };

    const combination = comb_array[props.testNumber];
    const ballColors = expanded_comb_array[props.testNumber];

    const orderedColors = orderByFrequency(ballColors);
    console.log(orderedColors);
    const first = orderedColors[0];
    const second = orderedColors[1];
    const third = orderedColors[2];
    const fourth = orderedColors[3];



    console.log(second);
    //the question 
    const header = <span  className="causalQuestion">
       
        <h3 style={{marginLeft: "20vw", marginRight:"20vw"}} text-align="center">How would you describe what you think 
        will happen if someone draws a ball from the box?
        </h3>
       
        
    </span>

    
    
    

    
    //display the urns
    const img = <TestImage ballColors = {ballColors} phase={props.phase} 
    testNumber={props.testNumber} test_ids={props.test_ids} shuffledUrnIds={props.shuffledUrnIds}/>;

    //put likert options in a shuffled array

    const questions = useRef(shuffle([
        <span><h3 >The person will draw a {first} ball</h3>
        <div style={{marginRight:"10vw", marginLeft: "10vw"}}><Likert {...likertOptionsOne} /></div></span>,
        <span><h3 >The person will draw a {first} ball or a {second} ball</h3>
        <div style={{marginRight:"10vw", marginLeft: "10vw"}}><Likert {...likertOptionsTwo} /></div></span>,
        <span><h3 >The person will draw a {first} ball or a {second} ball or a {third} ball</h3>
        <div style={{marginRight:"10vw", marginLeft: "10vw"}}><Likert {...likertOptionsThree} /></div></span>,
        <span><h3 >The person will draw a {first} ball or a {second} ball or a {third} ball or a {fourth} ball</h3>
        <div style={{marginRight:"10vw", marginLeft: "10vw"}}><Likert {...likertOptionsFour} /></div></span>
    ])) ;

    return (
        <span className="metaContainer">
            {header}
            <div className="container">
                <div className="urnsTest" >{img}</div>
                <div className="scoreboardTest" style={{ marginTop: "5vw"}}>
                    {questions.current[0]}
                    {questions.current[1]}
                    {questions.current[2]}
                    {questions.current[3]}
                    <div style={{marginLeft:"30vw"}}>{nextTrialButton}</div>
                    
                    
                    
                   
                </div>
            </div>
                
                
            
            
        </span>
        
        

    )

}


export default TestPhase;

