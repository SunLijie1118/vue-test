<template>
    <div class="menu">
        <div class="logo" @click="goToDashboard()">
            <img src="@/assets/logo.svg" alt="稀土掘金">
            <span class="title">稀土掘金</span>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item v-for="nav in firstRoutes" :key="nav.meta?.id" @click="goTo(nav)">{{ nav.name }}</a-menu-item>
        </a-menu>
    </div>
</template>
<script lang="ts" setup>
import { firstRoutes } from '@/router/router.config';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const selectedKeys = ref<Array<Number>>([]);
const getMatchedRoutes = () => {
    const matched = firstRoutes.filter(item => item.path === route.path);
    if (matched.length) {
        selectedKeys.value = [matched[0].meta.id];
    }

}
const goTo = (nav: any) => {
    selectedKeys.value = [nav['meta']['id']];
    if (route.path !== nav.path) {
        router.push(nav.path);
    }
}

const goToDashboard = ()=>{
    if (route.path !== '/dashboard') {
        router.push('/dashboard');
    }
}
watch(() => route.path, getMatchedRoutes)
</script>
<style scoped>
.menu {
    max-width: 1440px;
    margin: auto;
}

.logo {
    float: left;
    margin-right: 12px;
    cursor: pointer;
}

.logo img {
    width: 36px;
    height: 28px;
}

.title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    vertical-align: middle;
    margin-left: 8px;
}
</style>





