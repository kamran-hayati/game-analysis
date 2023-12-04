import React from 'react';

function Footer(props) {
    return (
        <footer
            className='flex flex-row font-semibold justify-center bg-gradient-to-l from-gray-300 via-20% to-gray-500 m-1 mt-0'>
            <h5>All Right Reserved &copy;
                <a className='hover:cursor-pointer text-red-950' title="Members: Kamran, Ghazal, Erfan, Ghambar">KMDB</a>
                <span id='footer-year'>{props.year}</span>
            </h5>
        </footer>
    );
}

export default Footer;