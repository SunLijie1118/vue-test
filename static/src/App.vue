<script setup lang="ts">
import topNav from '@/layout/topNav.vue';
import leftNavVue from '@/layout/leftNav.vue';
</script>

<template>
    <a-layout>
        <a-layout-header>
            <topNav />
        </a-layout-header>
        <a-layout-content>
            <div class="layout">
                <nav>
                    <leftNavVue />
                </nav>
                <section>
                    <Transition name="fade">
                        <router-view></router-view>
                    </Transition>
                </section>
                <aside></aside>
            </div>
        </a-layout-content>
    </a-layout>
</template>
<style lang="scss" scoped>
.layout {
    min-width: 1280px;
    display: flex;

    section {
        margin: 20px;
        background: #fff;
        flex: 1;
    }

    nav {
        flex: 0 1 180px;
        margin-top: 20px;
    }

    aside {
        flex: 0 1 200px;
        margin-top: 20px;
    }

}

.fade-enter-active {
    transition: all 0.3s ease-out;
}

.fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
