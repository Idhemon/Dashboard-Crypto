<script setup lang="ts">
defineProps<{
    message: string;
}>()    
</script>

<template>
    <div class="error-message">
        <span> ⚠️ Erreur </span>
        <p>{{ message }}</p>
    </div>
</template>

<style scoped>
.error-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: rgba(234, 57, 67, 0.1);
    border: 1px solid var(--color-negative);
    color: var(--color-negative);
    border-radius: var(--border-radius);
    padding: 1rem 1.25rem;
    margin: 1rem 0;
}
</style>
