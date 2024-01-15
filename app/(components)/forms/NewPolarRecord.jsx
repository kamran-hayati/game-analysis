import {useState} from "react";

export default function NewPolarRecord({l2rGames}) {
    const [leftPole, setLeftPole] = useState('');
    const [rightPole, setRightPole] = useState('');
    const [scores, setScores] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        postPolarRecord({leftPole, rightPole, scores});
    }

    return (
        <form
            id='new-polar-record'
            className='flex flex-col m-auto p-2'
            onSubmit={handleSubmit}
        >

        </form>
    )
}