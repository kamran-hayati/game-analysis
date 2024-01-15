'use client';

import React, {useState} from 'react';
import {mkHeaders, resources} from "@/app/api/urls";
import {Popup, PopupContent, PopupHeader} from "semantic-ui-react";

function RegisterForm({props, minPasswordLength = 8, citation = "IUST Game Analysis"}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [matchPsw, setMatchPsw] = useState(false);
    const [errors, setErrors] = useState(null);
    const [fnError, setFNError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [popupVisibility, setPopupVisibility] = useState(false);
    const [isAcceptTermOfService, setAccepted] = useState(false);

    function onUsername(e) {
        const {value} = e.target;
        setUsername(value);
    }

    function onEmail(e) {
        const {value} = e.target;
        setEmail(value);
    }

    function addError(err) {
        if (passwordError === null || passwordError.filter(e => e === err).length === 0) {
            setPasswordError(passwordError === null ? [err] : [...passwordError, err]);
        }
    }

    function removeError(err, errorType = 'password') {
        if (errorType.toLowerCase() === 'fn' && passwordError === null) {
            setFNError([err]);
            return;
        } else if (errorType.toLowerCase() === 'email' && passwordError === null) {
            setEmailError([err]);
            return;
        } else if (errorType.toLowerCase() === 'password' && passwordError === null) {
            setPasswordError([err]);
            return;
        } else if (errorType.toLowerCase() === 'confirm' && passwordError === null) {
            setConfirmPasswordError([err]);
            return;
        }

        const i = passwordError.indexOf(err);
        if (Array.isArray(passwordError) && i !== -1) {
            const newPassError = [];
            for (let j = 0; j < i; j++) {
                newPassError.push(passwordError[j]);
            }
            for (let j = i + 1; j < passwordError.length; j++) {
                newPassError.push(passwordError[j]);
            }
            setPasswordError(newPassError);
        }
    }

    function onPassword(e) {
        const {value} = e.target;
        setPassword(value);
        const errPatterns = [
            [/az/, "Password must contains at least a case character A-Z"],
            [/AZ/, "Password must contains at least a non-case character a-Z"],
            [/0-9/, "Password must contains at least a number 0-9"],
            [/\W/, "Password must contains at least neither of non-alphabet nor non-numeric character such as !@#$ etc."],
            [/.{8,}/, `Password must contains at least ${minPasswordLength} character`]
        ]
        errPatterns.forEach(pattern => {
            if (pattern[0].test(value)) {
                addError(pattern[1]);
            } else {
                removeError(pattern[1]);
            }
        })
    }

    function onConfirm(e) {
        const {value} = e.target;
        setMatchPsw(value === password && password.length > 0);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!isAcceptTermOfService) return;
        const registerPath = 'auth/local/register';
        const resource = resources(registerPath)
        const {url, method} = resource.create;
        const body = JSON.stringify({username, email, password})
        console.log({registration: {username, email, password, resource: {url: url(), method}, body}});
        fetch(url(), {headers: {'Content-Type': 'application/json'}, method, body})
            .then(res => res.json())
            .then(console.log)
            .catch(console.error)
    }

    function errorList(errors) {
        if (Array.isArray(errors))
            return errors.map((err, i) => <li key={i}>{err}</li>);
        else
            return '';
    }

    return (
        <div className="min-w-fit w-5/12 mt-1 items-center content-center m-auto">
            <form className="min-w-full bg-blue-300 border-green-950 m-auto">
                <fieldset className="text-center items-center">
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={onUsername}
                        className={`${fnError ? "border-red-900" : ""} min-w-full border-blue-400 hover:border-green-500`}
                    />
                </fieldset>
                <fieldset className="text-center items-center">
                    <input
                        type="text"
                        placeholder="email@example.com"
                        onChange={onEmail}
                        style={{}}
                        className={`${fnError ? "border-red-900" : ""} min-w-full border-blue-400 hover:border-green-500`}
                    />
                </fieldset>
                <fieldset className="text-center items-center">
                    <input
                        type="password"
                        placeholder="Passwor"
                        onChange={onPassword}
                        style={{}}
                        className={`${fnError ? "border-red-900" : ""} min-w-full border-blue-400 hover:border-green-500`}
                    />
                </fieldset>
                <fieldset className="text-center items-center">
                    <input
                        type="password"
                        placeholder="Confirm Passwor"
                        onChange={onConfirm}
                        style={{}}
                        className={`${fnError ? "border-red-900" : ""} min-w-full border-blue-400 hover:border-green-500`}
                    />
                </fieldset>
                <fieldset className="text-center items-center m-2 text-gray-800 flex justify-items-center">
                    <label htmlFor='accept-terms'>
                        <input
                            type="checkbox" name="acceptTerms" id="accept-terms" checked={isAcceptTermOfService}
                            className="min-w-full min-h-full pt-0 mt-0 mb-3"
                            style={{width: '1.5rem', height: '1.5rem'}}
                            onChange={() => setAccepted(!isAcceptTermOfService)}
                        />
                    </label>
                    &nbsp;
                    I Accept The&nbsp;
                    <div
                        onClick={(e) => setPopupVisibility(!popupVisibility)}
                        className="underline cursor-pointer"
                    >
                        Term of Services
                    </div>

                </fieldset>
                <fieldset className="text-center items-center m-2 text-blue-200">
                    <button
                        className="font-bold hover:border-yellow-950 border-green-950 m-auto mr-2 border p-3 w-5/12 bg-blue-700 hover:text-red-950"
                        type="submit"
                        onClick={onSubmit}
                    >
                        Register
                    </button>
                    <button
                        className="font-bold hover:border-red-950 border-green-950 m-auto ml-2 border p-3 w-5/12 bg-red-700 hover:text-red-950"
                        type="reset"
                    >
                        Reset
                    </button>
                </fieldset>
            </form>
            <div id="register-form-errors" className="text-red-900">
                {Array.isArray(fnError) ?
                    <ul><em className="font-bold">Full Name Error</em>{errorList(fnError)}</ul> : ''}
                {Array.isArray(emailError) ?
                    <ul><em className="font-bold">Email Error</em>{errorList(emailError)}</ul> : ''}
                {Array.isArray(passwordError) ?
                    <ul><em className="font-bold">Password Error</em>{errorList(password)}</ul> : ''}
                {Array.isArray(confirmPasswordError) ?
                    <ul>
                        <em className="font-bold">Password Confirmation Error</em>{errorList(confirmPasswordError)}
                    </ul> : ''}
                {Array.isArray(errors) && (<ul><em className="font-bold">General Errors</em>{errorList(errors)}</ul>)}
            </div>
            <div
                className="min-w-full min-h-full border border-emerald-950 shadow-orange-950 cursor-pointer"
                style={{zIndex: 10, borderRadius: '5px', visibility: popupVisibility ? "visible" : "hidden"}}
                onClick={() => setPopupVisibility(false)}
            >
                <div className="text-center font-bold">Term Of Services</div>
                <div className=""><p>This application is for educational purposes and completely free
                    of charge. You can cite this application as {citation}
                </p></div>
            </div>
        </div>
    );

}

export default RegisterForm;