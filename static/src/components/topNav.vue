<template>
    <div class="menu">
        <div class="logo" @click="goToDashboard()">
            <img src="@/assets/logo.svg" alt="稀土掘金">
            <span class="title">稀土掘金</span>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item v-for="nav in firstRoutes" :key="nav.meta?.id" @click="goTo(nav)">{{ nav.name }}</a-menu-item>
        </a-menu>
        <ul class="right-side-nav">
            <li class="search-add"></li>
            <li class="nav-item vip-entry"></li>
            <li class="nav-item notification"></li>
            <li class="nav-item user">
                <a-popover trigger="click" placement="bottomRight">
                    <template #content>
                        <div class="user-card"></div>
                        <div class="user-list"></div>
                        <div class="opt-btn"></div>
                    </template>
                    <img src="@/assets/images/user.svg" alt="" loading="lazy">
                </a-popover>
            </li>
        </ul>
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

const goToDashboard = () => {
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
    display: flex;
    justify-content: space-between;
}

.logo {
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

.right-side-nav {}

.user {
    cursor: pointer;
}

.user img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
</style>





