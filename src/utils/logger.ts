import { configure, getLogger } from 'log4js';
import { ROOT_PATH } from './constant';
import { resolve } from './file';

export const getLog = () => {
    configure({
        appenders: {
            cheese: {
                type: "dateFile",
                filename: resolve(ROOT_PATH, 'logs/log'),
                pattern: '.yyyy-MM-dd.log',
                alwaysIncludePattern: true,
                maxLogSize: 200,
                encoding: 'utf-8'
            }
        },
        categories: {
            default: {
                appenders: ["cheese"],
                level: "info"
            }
        },
    });
    return getLogger('cheese');
}