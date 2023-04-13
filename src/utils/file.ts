import * as path from 'path';

export const resolve = (...pathSegments: string[]) => {
    return path.resolve(...pathSegments);
}