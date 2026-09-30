import axios from 'axios';
import type { Coin, CoinPrice, CoinPriceResponse} from '../types/coin';


const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 10000, // 10 seconds timeout
});

// Récupère la liste des cryptos avec prix, variation, etc.
export async function getMarkets(currency = "eur"): Promise<Coin[]> {
    const { data } = await api.get<Coin[]>('/coins/markets', {
        params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
        }
    });
    return data;
}

// Récupère le détail d'une seule crypto
export async function getCoinDetails(id: string, currency = "eur"): Promise<Coin> {
    const { data } = await api.get<Coin[]>(`/coins/markets`, {
        params: {
            vs_currency: currency,
            ids: id
        }
    });
    const coin = data[0];
        if (!coin) {
            throw new Error(`Crypto ${id} introuvable`);
        }
    return coin;
}

// Récupère les prix d'une crypto sur une période donnée
export async function getCoinPrices(id: string, days: 7, currency = "eur"): Promise<CoinPrice[]> {
    const { data } = await api.get<CoinPriceResponse>(`/coins/${id}/market_chart`, {
        params: {
            vs_currency: currency, days
        }
    });
    return data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString('fr-FR'),
        price
    }));
}
