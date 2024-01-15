import React from 'react';
import Link from "next/link";
import {FRONTEND_BASE} from "@/app/api/urls";
import StaticLinks from "@/app/(components)/Layouts/StaticLinks";

function Footer(props) {

    return (<footer
        className='min-w-max m-0 font-semibold justify-center bg-gradient-to-l from-gray-300 via-20% to-gray-500'>
        <StaticLinks />
        <h5 className="content-center text-center my-2" style={{minWidth: "360px"}}>All Right Reserved &copy;
            <a className='hover:cursor-pointer text-red-950' title="Members: Kamran, Ghazal, Erfan, Ghambar">
                KMDB &nbsp;
            </a>
            <span id='footer-year'>{props.year}</span>
        </h5>
    </footer>);
}

export default Footer;