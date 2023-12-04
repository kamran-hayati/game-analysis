"use client";

import React, {useState} from 'react';
import {Icon} from "semantic-ui-react";

function GenresForm({
                        genresDataset,
                        initialGenres
                    }) {
    const [genres, setGenres] = useState(initialGenres);
    const [genre, setGenre] = useState({name: '', description: ''});

    console.log({GenresForm: genres})
    function handleSubmit(e) {
        // processing form
        e.preventDefault()
        console.log({submit: genres})
    }

    function handleReset(e) {
        // resetting form
        e.preventDefault()
        setGenres(initialGenres);
        console.log({reset: genres})
    }

    function createGenreInput() {
        setGenres([...genres,])
    }

    /**
     * if it's setting name value field it tries to prepare suggestion from the other genres may have been stored
     * in the database so that it can be avoided in such cases.
     * @param e     an event whether the value can be extracted from.
     * @param key   index of genres variable.
     * @param field name of the field in specified genre via given key.
     */
    function offerGenre(e, key, field) {
        e.preventDefault();
        const value = e.target.value;
        const newGenres = [...genres];
        if (field === 'name') {
            setGenre({...genre, name: value});
        } else {
            setGenre({...genre, description: value});
        }
        console.log({key, field});
        newGenres[key] = value;
        setGenres(newGenres);
        return;
        const matches = genresDataset.filter(g => {
            const re = new RegExp(`*${value}*`, 'ig').exec(g);
            return re.length > 1 ? re.slice(1) : '';
        })
        console.log({value, matches});
    }

    return (
        <div>
            <h1 className='font-serif text-center'>Available Genres with an option to create new ones!!</h1>
            <form style={{margin: '0'}} onSubmit={handleSubmit} onReset={handleReset}>
                {genres.map(({id, attributes}, key) => (<div key={key}>
                    <input
                        name={attributes.name}
                        type='text'
                        placeholder='Genres such as: sterategy, RTS, Sandbox, RPG, Adventure, etc.'
                        id='genre'
                        className='text-blue-950 bg-red-50 font-mono font-bold border-2 focus:bg-red-200 w-11/12 p-2'
                        onChange={e => offerGenre(e, key, 'name')}
                        value={attributes.name}
                    />
                    <textarea
                        onChange={e => offerGenre(e, key, 'description')}
                        value={attributes.description}
                        className='text-blue-950 bg-red-50 font-mono font-bold border-2 focus:bg-red-200 w-11/12 h-3/4'
                    ></textarea>
                </div>))}
                <div onClick={createGenreInput} className='mx-2'>
                    <Icon name='plus circle' link={true}/>
                </div>
                <hr className='border rounded border-b-8 border-emerald-950 w-full'/>
                <div
                    className='flex justify-center p-2 m-4 columns-2xl align-middle font-sans font-bold hover:border-cyan-950'>
                    <button
                        type='reset'
                        className='border-emerald-300 p-2 m-4 text-emerald-950 hover:text-emerald-50 hover:border-emerald-950 hover:bg-green-950'
                        onClick={handleSubmit}
                    >Make Genres
                    </button>
                    <button
                        type='reset'
                        className='border-emerald-300 p-2 m-4 text-red-900 hover:text-emerald-50 hover:border-emerald-950 hover:bg-red-950'
                        onClick={handleReset}
                    >Reset Form
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GenresForm;