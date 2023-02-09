<script setup lang="ts">
import topNav from '@/components/topNav.vue';
</script>

<template>
    <a-layout>
        <a-layout-header>
            <topNav />
        </a-layout-header>
        <a-layout-content>
            <router-view></router-view>
        </a-layout-content>
    </a-layout>
</template>
<style>
</style>
