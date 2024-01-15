'use client';

import StartInterview from "@/app/(components)/interview/StartInterview";
import {useEffect, useState} from "react";
import {
    NextSessionStatus,
    SessionStatusEnum,
    SessionStatusList,
    SessionStatuses,
    PreviousSessionStatus
} from '@/app/api/protectedRoutes/interview/session-manager'
import InterviewFromComponent from "@/app/(components)/interview/InterviewFromComponent";
import crypto from "crypto";

const mkInterviewContext = (
    id = -1, interviewer = {}, interviewee = {}, title = '', polarized_scores = [], description
) => ({id, interviewer, interviewee, title, polarized_scores, description});

export function ProgressBar({step, steps}) {
    const progress = (Array.isArray(step) ? step[0] : (step || 0)) + 1;
    console.log({ProgressBar: {step, steps, progress}})
    return <div
        className="min-w-full grid grid-cols-2"
    >
        <div
            id="session-progress-bar-left"
            style={{minWidth: `${Math.ceil(progress / steps)}%`, height: '30px'}}
            className="bg-green-500 mr-0"
        ></div>
        <div
            id="session-progress-bar-right"
            style={{minWidth: `${100 - Math.ceil(progress / steps)}%`, height: '30px'}}
            className="bg-blue-100 ml-0 m-auto"
        ></div>

    </div>
}

export const DEBUG = true;

const InterviewSession = (props) => {
    const defaultValues = {id: -1, interviewer: {}, interviewee: {}, title: '', polarized_scores: []};
    const sid = crypto.randomUUID;
    const [id, setId] = useState(defaultValues.id);
    const [interviewer, setInterviewer] = useState(defaultValues.interviewer);
    const [interviewee, setInterviewee] = useState(defaultValues.interviewee);
    const [polarized_scores, setPolarizedScores] = useState(defaultValues.polarized_scores);
    const [title, setTitle] = useState(defaultValues.title);
    const [description, setDescription] = useState(defaultValues.description);
    const [startedAt, setStartedAt] = useState(null);
    const [endedAt, setEndedAt] = useState(null);
    const [sessionEnum, setSessionEnum] = useState(SessionStatusEnum);
    const [currentSeason, setCurrentSession] = useState(SessionStatusEnum.WAIT);

    function proceedSession() {
        console.log({currentSeason})
        if (currentSeason !== SessionStatusEnum.TERMINATE) {
            const nxtState = NextSessionStatus(currentSeason);
            setCurrentSession(nxtState);
            console.log({nextSession: nxtState});
        }
    }

    function onSubmit(e) {

    }

    function logger(msg) {
        return DEBUG ? console.log : () => console.debug
    }

    const getter = {title, description, interviewer, interviewee, polarized_scores, startedAt, endedAt};
    const setter = {
        setTitle, setDescription, setInterviewer, setInterviewee, setPolarizedScores, setStartedAt, setEndedAt
    };
    const params = {sid, currentSeason};
    const callbacks = {logger: (msg) => logger(msg), proceedSession};
    return <div>
        <ProgressBar step={currentSeason} steps={Object.keys(SessionStatusEnum).length || 4}/>
        <InterviewFromComponent/>
        <button
            className=""
            style={{}}
            onClick={proceedSession}
        >Next Step
        </button>
    </div>

};

function InterviewSessionPage(props) {
    const [currentGames, setCurrentGames] = useState([]);

    function handleFormSubmit(e) {
        console.log({handleFormSubmit: "NotImplementedYet"})
    }

    return (
        <div>
            <InterviewSession/>
            <StartInterview currentGames={currentGames} setCurrentGames={setCurrentGames}/>
        </div>
    )
}

export default InterviewSessionPage;
