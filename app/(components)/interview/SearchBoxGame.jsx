"use client";

import React, {useEffect, useState} from 'react';
import {useGameAnalysisAppContext} from "@/app/GameAnalysisProviders";
import {fetchGames} from "@/app/api/protectedRoutes/interview/crudRepository";


function SearchBoxGame({onSelect, data}) {
    const [selectedList, setSelectedList] = useState([]);
    const [checkbox, setCheckbox] = useState([]);

    function onSearch(e) {
        const {value} = e.target;
        const checkbox = data.filter(game => new RegExp(`${value}`, 'ig').test(game.name))
        setCheckbox(checkbox);
        console.log({onSearchCurrentGame: data})
    }

    function onChange(e) {
        const {value} = e.target;
        if (selectedList.filter(selected => selected.id === value).length === 0) {

        }
    }

    function onCheck(e, g) {
        const {checked} = e.target;
        console.log({checked, g})
    }

    function getAttribute(game, name) {
        if (name in game) {
            return game[name];
        } else if (name in game?.attributes) {
            return game.attributes[name];
        }
        return null;
    }

    return (
        <div style={{margin: 0}} className="text-center">
            <form className="bordered form-group grid grid-cols-1 content-center item-center m-auto w-full"
            >
                <div className="flex flex-col w-full m-auto" style={{minWidth: '400px', maxWidth: '800px'}}>
                    <div className="w-full m-auto">
                        <input
                            type="text"
                            onChange={onSearch}
                            className="w-full"
                            style={{minWidth: '400px', maxWidth: '800px'}}
                        />
                    </div>
                    <div className="min-w-full xm-auto" style={{minWidth: '400px', maxWidth: '800px'}}>
                        <select
                            className="min-w-full"
                            value={selectedList}
                            onChange={onChange}
                            onSelect={onChange}
                            multiple={true}
                        >
                            {data.map(g => <option
                                value={g.id}
                                key={g.id}
                                className="min-w-full"
                                style={{}}>
                                {getAttribute(g, 'name') || `Game #${g.id}`}
                            </option>)}
                        </select>
                    </div>
                </div>
                <div className="w-full m-auto">
                    <ul className="w-full flex justify-around float-left">
                        {selectedList.map(g => <li key={g.id}>{getAttribute(g, 'name')}</li>)}
                    </ul>
                </div>
            </form>
            <form>
                {checkbox.map(chk => <label htmlFor={`${chk.id}`} key={chk.id.toString()}>
                    <input
                        type="checkbox" key={chk.id} id={chk.id}
                        onChange={(e) => onCheck(e, chk)}
                    />{chk.name}
                </label>)}
            </form>
        </div>
    );
}

export default SearchBoxGame;