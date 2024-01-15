"use client";

import React, {useEffect, useState} from 'react';
import SearchBoxGame from "@/app/(components)/interview/SearchBoxGame";
import {useGameAnalysisAppContext} from "@/app/GameAnalysisProviders";
import {fetchGames} from "@/app/api/protectedRoutes/interview/crudRepository";
import SearchBoxGenre from "@/app/(components)/interview/SearchBoxGenre";
import {Router} from "next/router";
import {RouterContext} from "next/dist/shared/lib/router-context.shared-runtime";

function StartInterview({onCreatingGame, onSelectingGame, currentGames, setCurrentGames}) {
    const ctx = useGameAnalysisAppContext();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSelectingGame(games) {
        onSelectingGame(games);
        console.log({games})
    }

    function handleSelectingGameGenres(genres) {
        onSelectingGenres(genres);
    }

    function onSelectingGenres(genres) {
        // TODO
        console.log({genres})
    }

    function reFetchGames() {
        fetchGames({ctx, setLoading, setErrors, setCurrentGames})
    }

    useEffect(reFetchGames, []);

    /**
     * it'll be performed after submitting the form.
     * @param newGame {*[]}
     */
    function onNewGame(newGame) {
        newGames
            .filter(game => game.name.localeCompare(newGame.name))
            .length === 0 && setNewGames([...newGames, newGame]);
    }

    function reduceToGenres() {
        const reduced = currentGames
            .map(({attributes}) => attributes.genres)
            .map(({data}) => data.map(({id, attributes}) => ({id, name: attributes.name})))
            .flat(1);
        const distinctGenres = {};
        for (let entry of reduced) {
            const {id, name} = entry;
            distinctGenres[id] = name;
        }
        const keyVal2idName = Object.keys(distinctGenres).map(id => ({id, name: distinctGenres[id]}))
        console.log({reduced, distinctGenres, keyVal2idName});
        return keyVal2idName;
    }

    function reduceToGames() {
        return currentGames.map(({id, attributes}) => ({
            id,
            name: attributes?.name,
            genres: attributes?.genres
        }));
    }

    if (loading) {
        return <div className="loading">Loading Games</div>
    } else if (errors && Array.isArray(errors)) {
        return <ul>{errors.map(error => <li key={error[0]}>{error[0]}: {error[1]}</li>)}</ul>
    } else if (Array.isArray(currentGames) && currentGames.length > 0) {
        console.log({currentGamesInStartInterviewJSX: currentGames})
        return <div className="bg-yellow-400 w-full h-2/6">
            <SearchBoxGame data={reduceToGames()} onSelect={games => handleSelectingGame(games)}/>
            <SearchBoxGenre data={reduceToGenres()} onSelect={genres => handleSelectingGameGenres(genres)}/>
            {/*<GameForm onCreateNewGame={game => onNewGame(game)}/>*/}
        </div>
    }
    return (
        <div className="bg-red-700 text-green-200">
            An Error Thrown
        </div>
    );
}

export default StartInterview;