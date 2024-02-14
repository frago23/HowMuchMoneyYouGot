import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { t } = await request.json();
    console.log(t);
    return json('server value');
}