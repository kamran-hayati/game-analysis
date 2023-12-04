"use client";

import React from "react";
import {Table, Container} from 'semantic-ui-react'

// Define a dataset array with objects representing each row of the table
const dataset = [
    {
        id: 1,
        game_genre: 'Action',
        game_name: 'Call of Duty',
        game_url: '[Call of Duty]',
        interview_id: 101,
        question_about_game: 'What is your favorite weapon in the game?',
        description: 'A first-person shooter game with various modes and missions.'
    },
    {
        id: 2,
        game_genre: 'Adventure',
        game_name: 'The Legend of Zelda',
        game_url: '[The Legend of Zelda]',
        interview_id: 102,
        question_about_game: 'How do you solve the puzzles in the game?',
        description: 'A fantasy game where you explore a vast world and fight enemies.'
    },
    {
        id: 3,
        game_genre: 'Strategy',
        game_name: 'Civilization',
        game_url: '[Civilization]',
        interview_id: 103,
        question_about_game: 'What is your preferred civilization in the game?',
        description: 'A turn-based game where you build and lead a civilization through history.'
    }
]

// Define a colors array with the colors you want for each row of the table
const colors = ['red', 'green', 'blue']

// Define a component for the table
const SummaryTable = ({theads, tbodies, tcaption}) => {
    // Use a Container component with textAlign prop to center the table
    return (
        <div className="container">
            {/* Use a Table component with celled prop to create a table with cell borders */}
            <table border={1} className="p-4 m-4 rounded-b self-center table border-2 shadow-amber-500 boldered">
                {/* Use a Table.Header component to create the table header */}
                <thead>
                {/* Use a Table.Row component to create a table row */}
                <tr className="text-center bg-red-200 font-bold">
                    {/* Use Table.HeaderCell components to create table headers */}
                    <td>id</td>
                    <td>game_genre</td>
                    <td>game_name</td>
                    <td>game_url</td>
                    <td>interview_id</td>
                    <td>question_about_game</td>
                    <td>description</td>
                </tr>
                </thead>
                {/* Use a Table.Body component to create the table body */}
                <tbody>
                {/* Use a forEach loop to iterate over the dataset array and create a table row for each object */}
                {
                    dataset.map((data, index) => (<tr key={index}
                                                      className={
                                                          (index % 2 === 0 ? "bg-blue-50" : "bg-gray-50")
                                                              .concat(' hover:bg-green-100 p-0.5')
                                                      }
                        >
                            {/* Use Table.Cell components to create table cells with the data values */}
                            <td>{data.id}</td>
                            <td>{data.game_genre}</td>
                            <td>{data.game_name}</td>
                            <td>{data.game_url}</td>
                            <td>{data.interview_id}</td>
                            <td>{data.question_about_game}</td>
                            <td>{data.description}</td>
                        </tr>)
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default SummaryTable;
