import type { TableColumns } from '@/types';

export const searchTableConfig: {
    url: string;
    urlType: string;
    tableColumns: Array<TableColumns>
} = {
    url: '/search/list',
    urlType: 'POST',
    tableColumns: [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action'
        },
    ],
};