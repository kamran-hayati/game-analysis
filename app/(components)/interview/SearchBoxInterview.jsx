"use client";

import React, {useState} from 'react';
import {Icon} from "semantic-ui-react";
import Image from "next/image";

/**
 *
 * @param onSelect
 * @param data Array of key-valued id-name
 * @returns {JSX.Element}
 * @constructor
 */
function SearchBoxInterview({onSelect, interviewTitles, on}) {
    const [selectedInterview, setSelectedInterview] = useState([]);
    const [checkbox, setCheckbox] = useState([]);
    const [visibility, setVisibility] = useState(['hidden', 'visible'][0]);

    function onSearch(e) {
        const {value} = e.target;
        const checkbox = interviewTitles.filter(game => new RegExp(`${value}`, 'ig').test(game.name))
        setCheckbox(checkbox);
    }

    function onChange(e) {
        const {value} = e.target;
        if (selectedInterview.filter(selected => selected.id === value).length === 0) {

        }
    }

    function onCheck(e, g) {
        const {checked} = e.target;
        console.log({checked, g})
    }

    function onSearchClicked(id) {
        console.log({onSearchClickedId: id})
    }

    function toggleModal() {
        console.log({toggleModal: "Toggling Modal ..."})
    }

    return (
        <div className="">
            <div className="">

                <form className="w-full m-auto">
                    <button
                        className="submit float-right"
                        onClick={(e) => {
                            e.preventDefault()
                            console.log('clicked')
                        }}
                    >
                        <Image src="/icons/search_40px.png" alt="search" width={40} height={40}/>
                    </button>
                    <label htmlFor='search-input'><input
                        className="input-w-full"
                        type="text"
                        placeholder="Search an interview..."
                        name="search"
                        id="search-input"
                        style={{marginLeft: "1rem"}}
                        onChange={onSearch}
                        autoComplete="off"/>
                        <strong className="icon-close" onClick={toggleModal}>X</strong>
                    </label>
                    <div className="advanced-search"><i className="icon-setting"></i></div>
                </form>

                <div className="align-middle items-center content-center text-center mb-8 m-auto"
                     style={{width: '200px', height: '40px'}}>
                    <div className="loading" style={{width: '75px', height: '20px'}}>
                        <svg
                            style={{width: "50px", height: "20px"}}
                            className="align-middle m-auto content-center text-center items-center"
                            // xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="27.5" cy="57.5" r="5" fill="rgb(255, 67, 126)">
                                <animate attributeName="cy" calcMode="spline"
                                         keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                                         values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur=".7s"
                                         begin="-0.6s"></animate>
                            </circle>
                            <circle cx="42.5" cy="57.5" r="5" fill="rgb(222,34,93)">
                                <animate attributeName="cy" calcMode="spline"
                                         keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                                         values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur=".7s"
                                         begin="-0.44999999999999996s"></animate>
                            </circle>
                            <circle cx="57.5" cy="57.5" r="5" fill="rgb(189,1,60)">
                                <animate attributeName="cy" calcMode="spline"
                                         keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                                         values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur=".7s"
                                         begin="-0.3s"></animate>
                            </circle>
                            <circle cx="72.5" cy="57.5" r="5" fill="rgb(129,1,60)">
                                <animate attributeName="cy" calcMode="spline"
                                         keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                                         values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur=".7s"
                                         begin="-0.15s"></animate>
                            </circle>
                        </svg>
                        {/*Loading*/}
                    </div>
                    <div style={{visibility, backgroundColor: 'lightgreen', zIndex:"10", marginTop: "10px"}} className="z-10">
                        <div className="interview-result">
                            <header className="interview-headers">
                                <div className="text-center text-red-800">Search Results</div>
                            </header>
                            {interviewTitles
                                ?
                                interviewTitles.map(interview => (<div key={interview.id} className="search-result">
                            <span
                                title={interview.title}
                                key={interview.id}
                                onClick={() => onSearchClicked(interview.id)}
                            >
                                <div className="interview-poster">
                                    interview poster
                                </div>

                                <div className="text">
                                    {interview.description}
                                </div>
                            </span>
                                </div>))
                                :
                                <></>
                            }
                        </div>
                        <div>Down Below Section</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBoxInterview;