import React from 'react';

const nop = (param = undefined) => {
}

function InterviewFromComponent(
    getter = {
        title: '',
        description: '',
        interviewer: {},
        interviewee: {},
        polarized_scores: []
    },
    setter = {
        setTitle: (title) => nop,
        setDescription: (description) => nop,
        setInterviewer: (interviewer) => nop,
        setInterviewee: (interviewee) => nop,
        setPolarizedScores: (leftPole, scores, rightPole) => nop
    },
    params = {sid: undefined, currentSeason: undefined},
    cb = {logger: nop, proceedSession: nop}) {
    console.log({getter, params})
    return (
        <div>Session ID: {params.sid} &nbsp; | &nbsp; Current Season: {params.currentSeason}</div>
    );
}

export default InterviewFromComponent;