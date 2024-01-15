'use client';

import InterviewSessionPage from "@/app/interview/InterviewSessionPage";
import {fetchInterviews} from "@/app/api/protectedRoutes/interview/crudRepository";
import InterviewsPanel from "@/app/(components)/interview/InterviewsPanel";
import {useGameAnalysisAppContext} from "@/app/GameAnalysisProviders";
import React, {useEffect, useState} from "react";
import SummaryPage from "@/app/interview/SummaryPage";
import {NextSessionStatus, SessionStatusEnum} from "@/app/api/protectedRoutes/interview/session-manager";

function InterviewPage(props) {
    const ctx = useGameAnalysisAppContext();
    const [interviews, setInterviews] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sessionStatus, setSessionStatus] = useState(SessionStatusEnum.WAIT[1]);

    const startInterviewSession = (e) => {
        e.preventDefault();
        const nxtStat = NextSessionStatus(sessionStatus);
        if (nxtStat === SessionStatusEnum.WAIT[1]) {
            setSessionStatus(NextSessionStatus(sessionStatus));
        }
        console.debug({StartInterviewSession: sessionStatus});
    }

    const reFetchInterviews = () => {
        fetchInterviews({ctx, setLoading, setErrors, setInterviews})
    }


    useEffect(() => {
        fetchInterviews({ctx, setLoading, setErrors, setInterviews})
    }, []);

    if (loading) {
        return <div id="interview-page-loading" className="loading text-center items-center flex-grow text-yellow-950">
            Loading...
        </div>
    } else if (Array.isArray(errors)) {
        return <div id="interview-page-errors" className="border border-red-950 bg-yellow-200 text-red-950">
            <ul>{errors.map((error, i) => (<li key={i.toString()}>
                {error}
            </li>))}
            </ul>
            <div className="w-full items-center text-center content-center">
                <button
                    className="w-7/12 border border-yellow-950 hover:border-emerald-950"
                    onClick={() => reFetchInterviews()}
                >
                    Try Again
                </button>
            </div>
        </div>
    }
    return (
        <div className="m-1 p-1">
            <h1 className="text-center">Interview Page</h1>
            <div
                className=""
                style={{}}
            >
                <div className="loading">
                    <button
                        onClick={startInterviewSession}
                        className="min-w-full"
                        disabled={sessionStatus !== SessionStatusEnum.WAIT[1]}
                    >
                        Start An Interview Session
                    </button>
                </div>
                <div className="align-top items-baseline border border-green-700" style={{maxHeight: "300px"}}>
                <InterviewsPanel interviews={interviews} />
                </div>
                {/*<SummaryPage token={token}/>*/}
                <div className="align-top items-baseline border border-yellow-700 min-h-max scroll-auto" style={{minHeight: "420px"}}>
                <InterviewSessionPage />
                </div>
            </div>
        </div>
    );
}

/*export const getServerSideProps = async ({token}) => {
    const interviews = await fetch('https://localhost:1337/api/inviews', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })

    return {
        interviews: await interviews
    }
}*/

export default InterviewPage;