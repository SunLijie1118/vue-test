export interface TableColumns {
    title: string;
    dataIndex: string;
    key: string;
    width?: number;
    fixed?: 'left' | 'right';
    fixedWidth?: number;
    show?: boolean;
    minWidth?: number;
    setWidth?: number;
    ellipsis?: boolean;
}

export interface Table {
    loading: boolean;
    pageIndex: number;
    pageSize: number;
    total: number;
    list: Array<{ [key: string]: unknown }>;
    fixedWidth?: number;
    maxWidth?: number;
}
