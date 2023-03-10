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
            <li class="search-add">
                <a-input-search v-model:value="searchValue" :placeholder="searchPlaceholder" @search="onSearch"
                    @focus="changeStatus('focus')" @blur="changeStatus('blur')" />
                <a-dropdown-button @click="createClick" v-if="searchShow" @visibleChange="createChange($event)">
                    创作者中心
                    <template #overlay>
                        <a-menu @click="createOptClick">
                            <a-menu-item v-for="opt in createOptions" :key="opt.key">
                                {{ opt.title }}
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <template #icon><caret-down-outlined v-if="searchIcon" /><caret-up-outlined
                            v-if="!searchIcon" /></template>
                </a-dropdown-button>
            </li>
            <li class="nav-item vip-entry"></li>
            <li class="nav-item notification"></li>
            <li class="nav-item user">
                <a-popover trigger="click" placement="bottomRight">
                    <template #content>
                        <div class="user-card">
                            <div class="avatar"></div>
                            <div class="user-detail"></div>
                        </div>
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
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue';
const router = useRouter()
const route = useRoute()

const selectedKeys = ref<Array<Number>>([]);
// 搜索部分
const searchValue = ref<String>();
const searchShow = ref<Boolean>(true);
const searchIcon = ref<Boolean>(true);
const searchWidth = reactive({
    width: '200px'
});
const searchPlaceholder = ref<String>('探索稀土掘金');
const createOptions = [
    {
        key: 1,
        title: '写文章'
    },
    {
        key: 2,
        title: '发沸点'
    },
    {
        key: 3,
        title: '写笔记'
    },
    {
        key: 4,
        title: '写代码'
    },
    {
        key: 5,
        title: '草稿箱'
    },
];
const onSearch = () => {

}
const changeStatus = (status: string) => {
    if (status === 'focus') {
        searchPlaceholder.value = '搜索文章/小册/标签/用户';
        searchShow.value = false;
        searchWidth.width = '357px';
    } else {
        searchPlaceholder.value = '探索稀土掘金';
        searchShow.value = true;
        searchWidth.width = '200px';
    }
}
const createChange = (event: boolean) => {
    searchIcon.value = event;
}
const createClick = () => {

}
const createOptClick = () => {

}
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
<style lang="scss" scoped>
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

.right-side-nav {
    display: flex;

    .search-add {
        display: flex;
        align-items: center;

        .ant-btn-group {
            margin: 0 12px;
        }

        .ant-input-search {
            width: v-bind('searchWidth.width');
        }
    }
}

.user {
    cursor: pointer;
}

.user img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
</style>





