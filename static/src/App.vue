<script setup lang="ts">
import topNav from '@/components/topNav.vue';
</script>

<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%'}">
            <topNav />
        </a-layout-header>
        <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
            <router-view></router-view>
        </a-layout-content>
    </a-layout>
</template>
<style>
</style>
