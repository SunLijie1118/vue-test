<template>
    <a-table :dataSource="tableColumnsType" :columns="table.list" :scroll="{ x: scrollX }" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue'
import type { TableColumns, Table, Params } from '@/types';
import { URL_TYPE } from '@/types';

const props = defineProps({
    // 数据请求的接口路径
    url: {
        type: String,
        required: true,
        default: ''
    },
    // 接口类型
    urlType: {
        type: String as PropType<URL_TYPE>,
        required: true,
        default: URL_TYPE.GET
    },
    // 表格中除了分页外的其他请求参数
    searchParams: {
        type: Object as PropType<Params>,
        default: {}
    },
    // 表格的设置
    tableColumns: {
        type: Object as PropType<Array<TableColumns>>,
        required: true,
        default: []
    },
    // 表格插槽
    columnSlot: {
        type: Object as PropType<Params>,
        default: {}
    },
    // 是否展示复选框
    checkboxShow: {
        type: Boolean,
        default: true
    },
    checkedKey: {
        type: String,
        default: ''
    },
    // 是否展示序号
    indexShow: {
        type: Boolean,
        default: true
    },
    // 操作一列的宽度
    operateWidth: {
        type: Number,
        default: 245
    },
    // 操作一例的模板
    operateSlot: {
        type: Object as PropType<any>,
        default: undefined
    },
    sortKeys: {
        type: Array<String>,
        default: []
    },
    maxWidth: {
        type: Number,
        default: 500
    }
});
const emit = defineEmits(['getCheckedList']);

const table = ref<Table>({
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    list: [],
    fixedWidth: 240 + props.operateWidth
});
const tableColumnsType = ref<Array<TableColumns>>([]);
const scrollX = ref<number>(props.operateWidth);

const mapOfSort = ref<Params>({});

const checkbox = ref<{
    numberOfChecked: number;
    isAllDisplayDataChecked: boolean;
    isIndeterminate: boolean;
    mapOfCheckedId: Params
}>({
    numberOfChecked: 0,
    isAllDisplayDataChecked: false,
    isIndeterminate: false,
    mapOfCheckedId: {},
});

const checkAll = (value: boolean) => {
    table.value.list.filter(item => !item.disabled).forEach((item: any) => {
        checkbox.value.mapOfCheckedId[item[props.checkedKey]] = value;
    });
}
const refreshStatus = () => {
    checkbox.value.numberOfChecked = table.value.list.filter(
        item => checkbox.value.mapOfCheckedId[item[props.checkedKey] as string]
    ).length;
    checkbox.value.isAllDisplayDataChecked = table.value.list.filter(item => !item.disabled)
        .every(item => checkbox.value.mapOfCheckedId[item[props.checkedKey] as string]) &&
        checkbox.value.numberOfChecked > 0;
    checkbox.value.isIndeterminate = table.value.list.filter(item => !item.disabled)
        .some(item => checkbox.value.mapOfCheckedId[item[props.checkedKey] as string]) &&
        !checkbox.value.isAllDisplayDataChecked;
    emit('getCheckedList', table.value.list.filter(item => checkbox.value.mapOfCheckedId[item[props.checkedKey] as string]));
}
</script>
