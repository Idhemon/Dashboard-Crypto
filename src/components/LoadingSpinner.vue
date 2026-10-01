<script setup lang="ts"></script>

<template>
    <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">Loading...</p>
    </div>
</template>

<style scoped>
.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    color: var(--color-text-muted);
}

.spinner {
    width: 3rem;
    height: 3rem;
    border: 0.4rem solid var(--color-border);
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    font-size: 1.2rem;
    font-weight: 500;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

</style>