import axios from "axios";
import {mkHeaders, resources} from "@/app/api/urls";
import {getStaticProps} from "next/dist/build/templates/pages";

async function postPolarRecord({leftPole, rightPole, scores}) {
    const {create} = resources('polarRecords');
    const {url, method} = create();
    const {token} = getStaticProps();
    const header = mkHeaders(token);
    const response = await axios({url, data: {leftPole, rightPole, scores}, method});
    return await response.data;
}