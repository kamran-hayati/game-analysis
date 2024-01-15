import React from 'react';

function Main(props) {
    return (
        <main className="min-h-screen items-center p-2 bg-gradient-to-br from-green-300 via-10% to-gray-300 ml-1 mr-1">
            <div className="w-full font-mono">
                {props.children}
            </div>
        </main>
    );
}

export default Main;