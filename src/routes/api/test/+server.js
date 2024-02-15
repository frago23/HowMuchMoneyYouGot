import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
const supportedCurrencies = ['RON', 'EUR', 'CHF', 'USD'];

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json();

    if (!body.currency) {
        return json({ error: 'Missing currency' }, { status: 400 });
    }

    const mockResponse = {
        "CHF": 0.1909535926,
        "EUR": 0.2010029876,
        "USD": 0.2156984966
    }

    const toFetch = supportedCurrencies.filter(c => c !== body.currency);
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${body.currency}&currencies=${toFetch.join(',')}`;

    const response = await fetch(url);

    if (!response.ok) {
        return json({ error: 'Failed to fetch' }, { status: response.status });
    }

    const data = await response.json();
    return json(data, { status: 200 });
}