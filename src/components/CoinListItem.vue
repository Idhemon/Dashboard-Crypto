<script setup lang="ts">
import { computed } from 'vue';
import type { Coin } from '@/types/coin';

const props = defineProps<{
  coin: Coin;
}>();

const isPositive = computed(() => props.coin.price_change_percentage_24h >= 0);
</script>

<template>
    <RouterLink :to="`/coin/${props.coin.id}`" class="coin-list-item">
        <div class="coin-info">
            <img :src="coin.image" :alt="coin.name" class="coin-logo" />
            <div>
                <p class="coin-name">{{ coin.name }}</p>
                <p class="coin-symbol">{{ coin.symbol.toUpperCase() }}</p>
            </div>
        </div>
        <p class="coin-price">
            {{ coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
        </p>
            <p class="coin-change" :class="isPositive ? 'positive' : 'negative'">
                {{ isPositive ? '▲' : '▼' }} {{ Math.abs(coin.price_change_percentage_24h).toFixed(2) }}%
            </p>
    </RouterLink>    
</template>

<style scoped>
.coin-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--color-text);
  transition: background-color 0.15s;
}
.coin-list-item:hover {
  background-color: var(--color-surface-hover);
}
.coin-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.coin-logo {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.coin-name {
  font-weight: 600;
  margin: 0;
}
.coin-symbol {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin: 0;
}
.coin-price {
  font-weight: 500;
  text-align: right;
}
.coin-change {
  text-align: right;
  font-weight: 600;
  font-size: 0.9rem;
}
.positive { color: var(--color-positive); }
.negative { color: var(--color-negative); }
</style>