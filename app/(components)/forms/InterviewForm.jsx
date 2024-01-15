import {useState} from "react";
import {getStaticProps} from "next/dist/build/templates/pages";

/**
 * Interviewer, Team_id, Interviewee, games, polarRecords
 * @constructor
 */
export function InterviewForm() {
    const {team} = getStaticProps();
    // ({id:-1, name: '', description:'', members:[]})
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form id='interview-form' onSubmit={handleSubmit}
        className="flex flex-col border-2 border-green-950 shadow-indigo-800 bg-gray-700 text-blue-200"
        >
            <input hidden={true} name='team' value={team}/>

        </form>
    )
}