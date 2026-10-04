<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Coin, CoinPrice } from '@/types/coin';
import { getCoinPrices, getCoinDetails } from '@/services/coingecko';
import CoinChart from '@/components/CoinChart.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const router = useRouter();
const props = defineProps<{
  id: string;
}>();
const coin = ref<Coin | null>(null);
const prices = ref<CoinPrice[]>([]);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

const isPositive = computed(() => (coin.value?.price_change_percentage_24h ?? 0) >= 0)

onMounted(async () => {
  try {
    const [coinData, priceData] = await Promise.all([
      getCoinDetails(props.id),
      getCoinPrices(props.id, 7), // Prix pour les 7 derniers jours
    ]);
    coin.value = coinData;
    prices.value = priceData;
  } catch (error) {
    errorMessage.value = 'Impossible de charger les détails de la cryptomonnaie. Réessayez plus tard.';
  } finally {
    isLoading.value = false;
  }
});

</script>

<template>
    <main class="detail">
        <button @click="router.push('/')" class="back-btn">Retour</button>
    
        <LoadingSpinner v-if="isLoading" />
        <ErrorMessage v-else-if="errorMessage" :message="errorMessage" />
        <div v-else-if="coin" class="coin-header">
      <img :src="coin.image" :alt="coin.name" class="coin-logo-lg" />
      <div>
        <h1>{{ coin.name }} <span class="symbol">{{ coin.symbol.toUpperCase() }}</span></h1>
        <p class="price">
          {{ coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
        <span :class="isPositive ? 'positive' : 'negative'">
          {{ isPositive ? '▲' : '▼' }} {{ Math.abs(coin.price_change_percentage_24h).toFixed(2) }}%
        </span>
        </p>
      </div>
    </div>
    
    <CoinChart v-if="prices.length" :prices="prices" />

    <div v-if="coin" class="stats">
        <div class="stat-box">
          <p class="stat-label">Capitalisation</p>
          <p class="stat-value">{{ coin.market_cap.toLocaleString('fr-FR') }} €</p>
        </div>
        <div class="stat-box">
          <p class="stat-label">Volume 24h</p>
          <p class="stat-value">{{ coin.total_volume.toLocaleString('fr-FR') }} €</p>
        </div>
    </div>

    </main>
</template>

<style scoped>
.detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
.back-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
.back-btn:hover {
  color: var(--color-text);
}
.coin-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.coin-logo-lg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.symbol {
  color: var(--color-text-muted);
  font-size: 1rem;
  font-weight: 400;
}
.price {
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.positive { color: var(--color-positive); font-size: 0.95rem; }
.negative { color: var(--color-negative); font-size: 0.95rem; }
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}
.stat-box {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}
.stat-label {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  margin: 0 0 0.25rem;
}
.stat-value {
  font-weight: 600;
  margin: 0;
}
</style>