import fs from 'fs';
import {join} from 'path';
import {remark} from 'remark';
import html from 'remark-html';
import mater from 'gray-matter';


export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

export function fetchStaticMarkdown(name, appStaticFolder = 'app/_markdowns') {
    try {
        const fullPath = join(appStaticFolder, `${name}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        return mater(fileContents);
    } catch (e) {
        console.log({e})
        return {error: true, content: e.message}
    }
}