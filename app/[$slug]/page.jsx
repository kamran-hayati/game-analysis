import {fetchStaticMarkdown, markdownToHtml} from "@/app/(config)/markdown";
import RegisterForm from "@/app/(components)/forms/RegisterForm";
import React from "react";
import LogoutForm from "@/app/(components)/forms/LogoutForm";
import LoginForm from "@/app/(components)/forms/LoginForm";


async function NAPage(props) {
    const {$slug} = props.params;

    if ($slug === 'register')
        return <RegisterForm />

    if ($slug === 'logout')
        return <LogoutForm />

    if ($slug === 'login')
        return <LoginForm />

    const {error, content, data} = fetchStaticMarkdown($slug);

    console.log({$slug, content, data})

    const body = [await markdownToHtml(content)];

    if (error) {
        console.log({$slugError: error, $slug})
        body[0] = markdownToHtml(fetchStaticMarkdown('404'));
    }

    console.log({aboutData: data});
    return <div dangerouslySetInnerHTML={{__html: body[0]}}/>
}

export default NAPage;