<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Coin } from '@/types/coin';
import { getMarkets } from '@/services/coingecko';
import SearchBar from '@/components/SearchBar.vue';
import CoinList from '@/components/CoinList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const coins = ref<Coin[]>([]);
const search = ref('');
const isLoading = ref(true);
const errorMessage= ref<string | null>(null);

const filteredCoins = computed(() => {
    const query = search.value.toLowerCase().trim();
    if (!query) {
        return coins.value;
    }
    return coins.value.filter((c) =>
    c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query)
  );
});

onMounted(async () => {
    try {
        const data = await getMarkets();
        coins.value = data;
    } catch (error) {
        errorMessage.value = 'Impossible de charger les cryptomonnaies. Réessayez plus tard.';
    } finally {
        isLoading.value = false;
    }
});

</script>

<template>
  <main class="home">
    <h1>Liste des cryptomonnaies</h1>
    <SearchBar v-model="search" />

    <LoadingSpinner v-if="isLoading" />
    <ErrorMessage v-else-if="errorMessage" :message="errorMessage" />
    <CoinList v-else :coins="filteredCoins" />
  </main>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.25rem;
}

</style>