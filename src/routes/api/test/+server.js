import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json();
    console.log(body);
    const k = 'fca_live_QNPnvEMMHO2z5eylG3tDDk7mHDvCyVWjUfuElQCH';
    
    const mockResponse = {
        "CHF": 0.92,
        "EUR": 4.92,
        "USD": 4.22
    }

    // const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${k}&base_currency=RON&currencies=EUR,USD,CHF`;

    // console.log(url);
    // const response = await fetch(url);

    // console.log(response.status)
    // console.log(response.statusText)

    // if (!response.ok) {
    //     return json({ error: 'Failed to fetch' }, { status: response.status });
    // }

    // const data = await response.json();
    return json(mockResponse, { status: 200 });
}