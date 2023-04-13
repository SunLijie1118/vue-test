<template>
    <div>
        <sticky-table url="searchTable.url" urlType="searchTable.urlType"></sticky-table>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import stickyTable from '@/components/stickyTable.vue';
import { searchTableConfig } from './dashboard';

const searchTable: any = ref(searchTableConfig);

</script>
