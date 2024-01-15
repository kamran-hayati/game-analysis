'use client';

import Cookie from "js-cookie";
import {resources} from "@/app/api/urls";
import {abstractFetch} from "@/app/api/protectedRoutes/interview/index";

export function fetchInterviews({ctx, setLoading, setErrors, setInterviews}) {
    const params = {ctx, setErrors, setLoading, setData: setInterviews, resourceName: 'interviews'};
    abstractFetch(params);
}

export function fetchGames({ctx, setLoading, setErrors, setCurrentGames}) {
    const params = {ctx, setErrors, setLoading, setData: setCurrentGames, resourceName: 'games'};
    abstractFetch(params);
}