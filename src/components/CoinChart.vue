<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import type {CoinPrice} from '@/types/coin';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps<{
  prices: CoinPrice[];
}>();

const chartData = computed(() => ({
  labels: props.prices.map((p) => p.date),
  datasets: [
    {
      label: 'Prix (EUR)',
      data: props.prices.map((p) => p.price),
      borderColor: '#6366f',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0
    },
  ]

}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: { color: '#8b94a8' }, 
      grid: { color: '#2a3344' }
    },
    y: {
      ticks: { color: '#8b94a8' }, 
      grid: { color: '#2a3344' }
    },
  },
};
</script>

<template>
    <div class="chart-wrapper">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.chart-wrapper {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;
}
</style>