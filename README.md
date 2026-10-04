# 📊 Dashboard Crypto

Dashboard de suivi de cryptomonnaies en temps réel, construit avec Vue 3 et TypeScript. Consultez les prix, variations et graphiques d'évolution des principales cryptomonnaies grâce à l'API publique CoinGecko.

**🔗 Démo en ligne :** [dashboardcrypto-sand.vercel.app](https://dashboardcrypto-sand.vercel.app/)


## ✨ Fonctionnalités

- 📈 Liste des principales cryptomonnaies avec prix, variation 24h et capitalisation en temps réel
- 🔍 Recherche instantanée pour filtrer les cryptos par nom ou symbole
- 📊 Page détail par crypto avec graphique d'évolution du prix sur 7 jours
- ⏳ Gestion des états de chargement et des erreurs API
- 🎨 Interface sombre, responsive, inspirée des dashboards financiers

## 🛠️ Stack technique

- **Framework** : Vue 3 (Composition API, `<script setup>`)
- **Langage** : TypeScript
- **Routing** : Vue Router
- **Graphiques** : Chart.js + vue-chartjs
- **Appels API** : Axios
- **Build** : Vite
- **API externe** : [CoinGecko API](https://www.coingecko.com/en/api)

## 🏗️ Architecture

Le projet sépare clairement la logique métier de l'affichage :

```
src/
├── services/coingecko.ts   # appels API centralisés (seul point de contact avec CoinGecko)
├── types/coin.ts           # interfaces TypeScript partagées
├── views/                  # Home.vue, CoinDetail.vue — orchestrent l'état (loading/error/data)
└── components/             # composants réutilisables, sans logique API (SearchBar, CoinList, CoinChart...)
```

Les composants ne connaissent jamais l'existence de l'API : ils reçoivent des données typées en props et émettent des événements, ce qui les rend facilement réutilisables et testables.

## 🚀 Lancer le projet en local

```bash
# Cloner le dépôt
git clone https://github.com/Idhemon/Dashboard-Crypto.git
cd Dashboard-Crypto

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## 📌 Pistes d'évolution

- Watchlist personnalisée persistée en local
- Sélecteur de devise (EUR / USD / GBP)
- Backend léger (Node/Express + MySQL) pour historiser les prix et persister une watchlist par utilisateur

## 👤 Auteur

**Mehdi Warid** — [GitHub](https://github.com/Idhemon)
