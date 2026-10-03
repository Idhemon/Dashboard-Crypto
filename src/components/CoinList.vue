<script setup lang="ts">
import type { Coin } from '@/types/coin';
import CoinlistItem from '@/components/CoinListItem.vue';

defineProps<{
  coins: Coin[];
}>();
</script>

<template>
  <div class="coin-list">
    <div class="coin-list__header">
      <span>Nom</span>
      <span>Prix</span>
      <span>24h</span>
    </div>
    <CoinlistItem v-for="coin in coins" :key="coin.id" :coin="coin" />
  </div>
</template>

<style scoped>
.coin-list {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}
.coin-list-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 0.75rem 1.25rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  border-bottom: 1px solid var(--color-border);
}
.coin-list-header span:not(:first-child) {
  text-align: right;
}
</style>