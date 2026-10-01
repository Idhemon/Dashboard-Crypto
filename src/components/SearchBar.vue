<script setup lang="ts">
const model = defineModel<string>({
    default: ''
});
</script>

<template>
        <input 
        type="text" 
        placeholder="Rechercher une crypto..." 
        v-model="model" 
        class="search-input" 
        />   
</template>

<style scoped>
.search-input {
    width: 100%;
    max-width: 360px;
    padding: 0.65rem 1rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    color: var(--color-text);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.15s;
}

.search-input:focus {
    border-color: var(--color-accent);
}

.search-input::placeholder {
    color: var(--color-text-muted);
}
</style>