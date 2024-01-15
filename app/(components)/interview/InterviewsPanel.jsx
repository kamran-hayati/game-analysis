'use client';

import React, {useState} from 'react';
import InterviewDetails from "@/app/(components)/interview/InterviewDetails";
import InterviewSearchBox from "@/app/(components)/interview/SearchBoxInterview";
import startInterview from "@/app/(components)/interview/StartInterview";
import {NextSessionStatus, SessionStatusEnum} from "@/app/api/protectedRoutes/interview/session-manager";


function InterviewsPanel({interviews}) {
    const [interview, setInterview] = useState(null);

    const showDetails = (id) => {
        const filteredInterview = interviews.filter(intvu => intvu.id === id);
        if (filteredInterview.length === 1) {
            setInterview(filteredInterview[0]);
        }
    }

    const titlesHook = () => {
        return interviews.map(interview => (<li
            key={interview.id}
            onClick={() => showDetails(interview.id)}
            style={{cursor: "pointer"}}
        >
            {interview.attributes?.title || `Interview ${interview.id}`}
        </li>))
    }

    return (
        <div className="min-w-full mb-0">
            <InterviewSearchBox
                key="interview-search-bar-id"
                interviewTitles={interviews.map(interview => ({
                    id: interview.id,
                    title: (interview.attributes?.title || `Title ${interview.id}`),
                    description: interview.description
                }))}
            />
            <div className="grid grid-cols-2 m-0 gap-0 flex-grow scroll-auto h-screen w-screen z-0"
                 style={{zIndex: "1"}}>
                <div className="from-blue-200 via-green-100 to-blue-400 w-5/6" id="interview-panel-left"
                     style={{}}
                >{titlesHook()}</div>
                <div className="from-blue-400 via-green-100 to-blue-100 w-10/12 ml-0" id="interview-panel-right"
                     style={{}}
                >
                    {
                        interview
                            ?
                            <InterviewDetails key={interview.id} interview={interview}/>
                            :
                            <div>
                                {Array.isArray(interviews) && interviews.length > 0
                                    ?
                                    <div>Click on the left panel to see details</div>
                                    :
                                    <div>InterviewsPanel is empty. <em>The reason could be either of server issues that
                                        make it to not fetching data properly or you{"\'"}ve not done an interview
                                        yet.</em>
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default InterviewsPanel;