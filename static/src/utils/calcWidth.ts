import type { TableColumns, Table } from '@/types';

/**
 * 判断字符是否是中文
 * @param codeAt 字符的Unicode编码大小
 * @returns 是否是中文
 */
export const isChinese = (codeAt: number): boolean => {
    return codeAt >= 19968 && codeAt <= 40891;
}

/**
 * 计算字符串相当于多少个字符，之后根据font-size的大小计算该内容所占据的宽度
 * @param value 字符串的内容
 * @returns 返回字符串相当于字符的个数
 */
export const valueLength = (value: string): number => {
    let length = 0;
    let ch: string;
    let count = 0;
    for (let i = 0; i < value.length; i++) {
        ch = value[i];
        const codeAt = ch.charCodeAt(0);
        if (codeAt >= 65 && codeAt <= 90) {
            // 英文字符
            length += 1.2;
        } else if (isChinese(codeAt)) {
            // 中文字符
            length += 1.6;
        } else {
            count++;
            if (count < 20) {
                length += 0.8;
            } else if (count <= 10) {
                length += 0.5;
            } else {
                length += 0.8;
            }
        }
    }
    return length;
}

/**
 * 根据表头的内容计算每列的最小宽度，表头不允许换行
 * @param header table中表头的配置项
 * @param sortKeys table中排序的keys
 */
export const calcTableHeadWidth = (header: Array<TableColumns>, sortKeys: Array<string>) => {
    header.forEach(item => {
        item.minWidth = Math.ceil(valueLength(item.title) * 12) + (sortKeys.indexOf(item.key) > -1 ? 20 : 0);
    })
}

/**
 * 根据表格中表头和每项的内容自动计算表格每列的宽度
 * @param outerWidth 外面留有table的DOM的宽度
 * @param table table的配置项
 * @param header table的表头配置项
 * @param sortKeys table中排序的keys
 */
export const calcTableWidth = (outerWidth: number, table: Table, header: Array<TableColumns>, sortKeys: Array<string> = []) => {
    // 表格每列的最大宽度
    let maxWidth = 500;
    if (table.hasOwnProperty('maxWidth')) {
        maxWidth = table.maxWidth || 500;
    }
    calcTableHeadWidth(header, sortKeys);
    const fixedTemp = header.filter(val => { return val.fixed });
    // 留有100px的余量
    // table.fixedWidth表示表格中序号、复选框等占据的宽度
    // fixedTemp.length * 32是因为table中padding占据一定的宽度，需要减去
    const domWidth = (outerWidth || document.body.clientWidth) - (table.fixedWidth || 0) - fixedTemp.length * 32 - 100;
    header.forEach((item: TableColumns) => {
        const values = [];
        table.list.forEach(data => {
            const val = data[item.key];
            const type = Object.prototype.toString.call(val);
            if (type === '[object String]') {
                values.push(Math.ceil(valueLength(String(val)) * 10));
            } else if ('[object Array]' || type === '[object Object]') {
                values.push(120);
            } else {
                values.push(80);
            }
        });
        // 用户强制设置某些列的宽度
        if (item.setWidth) {
            values.push(item.setWidth);
        }
        item.width = Math.min(Math.max(...values, item.minWidth || 0), domWidth - 100, maxWidth);
    });
    if (fixedTemp.length) {
        let sum = 0;
        fixedTemp.forEach((item: TableColumns) => {
            sum += item.width || 0;
        });
        // 所有固定列的宽度不能超过屏幕宽度，否则横向滚动条不生效，不能滚动
        if (sum >= domWidth) {
            const avg = Math.floor(domWidth / fixedTemp.length);
            for (let i = 0; i < header.length; i++) {
                if (header[i].fixed &&
                    (header[i].width || 0) > (header[i].minWidth || 0) &&
                    (header[i].width || 0) > avg
                ) {
                    header[i].width = Math.min(Math.max((header[i].minWidth || 0), avg), maxWidth);
                }
            }
        }
    }
    let widthSum = 0;
    header.forEach((item: TableColumns) => {
        widthSum = widthSum + (item.width || 0) + 32;
    });
    // 减去17是因为滚动条的宽度
    if (widthSum < (outerWidth || document.body.clientWidth) - 17 - (table.fixedWidth || 0)) {
        const avg = Math.floor(((outerWidth || document.body.clientWidth) - 17 - (table.fixedWidth || 0) - widthSum) / header.length);
        header.forEach((item: TableColumns) => {
            item.width = (item.width || 0) + avg;
        });
    }
    return header;
}