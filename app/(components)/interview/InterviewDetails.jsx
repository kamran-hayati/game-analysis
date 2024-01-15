'use client';

import React from 'react';

/**
 * interviewer": {
 *           "data": {
 *             "attributes": {
 *               "username
 * @param interview
 * @param key
 * @returns {JSX.Element}
 * @constructor
 */
function InterviewDetails({interview, key}) {
    const {id, attributes} = interview;
    const {interviewer, interviewee, createdAt, updatedAt} = attributes

    return (
        <div key={key} className="text-red-950 my-1 w-full m-auto">
            <div className="border border-yellow-700 mb-2 px-1">Interviewer: <span
                key={interviewee?.id || `interviewer-${id}`}>
                {interviewer?.data?.attributes?.username || `interviewee ${id}`}</span></div>
            <div className="border border-yellow-700 mb-2 px-1">Interviewee: <span
                key={interviewee?.id || `interviewee-${id}`}>
                {interviewee?.data?.attributes?.username || `interviewee ${id}`}</span></div>
        </div>
    );
}

export default InterviewDetails;