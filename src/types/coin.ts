//Données d'une crypto
export interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
}

//Prix à une date précise sur le graphique
export interface CoinPrice {
    date: string;
    price: number;
}

//Réponse brute de l'API pour les prix d'une crypto sur une période donnée
export interface CoinPriceResponse {
    prices: [number, number][];
}