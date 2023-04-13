import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import router from '@/router';

interface ParamsProps<T = any> {
    [propName: string]: T
}

interface httpOptions {
    params?: ParamsProps;
    timeout?: number;
}

// 构建一个axios对象实例
const baseURL = import.meta.env.BASE_URL.toString();
const http = axios.create({
    baseURL,
    timeout: 30 * 60 * 1000,
    withCredentials: true,
});

const getCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const crumb = cookies[i].split('=');
        if (name === crumb[0]) {
            return crumb[1];
        }
    }
}

// 添加请求拦截器
http.interceptors.request.use(
    (request: AxiosRequestConfig): any => {
        // 添加请求头信息 需要添加的cookie中的内容，可替换成需要的
        const cookie = getCookie('xxx');
        const xxxtoken: ParamsProps = cookie ? { 'xxx': cookie } : {};
        if (request.method === 'post') {
            xxxtoken['Content-Type'] = 'application/json';
        }
        request.headers = xxxtoken;
        return request;
    },
    (error: AxiosError) => {
        Promise.reject(error);
    }
);

// 添加响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // 此处可以对错误返回状态做统一处理
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                // 例如没有权限时返回到登录页面
                case 401:
                    router.push('/login');
                    // 或者
                    window.location.href = 'xxxxxxxxxxxxx';
            }
        }
    }
)

export const get = (url: string, params?: ParamsProps, timeout?: number): Promise<T> => {
    const options: httpOptions = {};
    if (params) {
        options.params = params;
    }
    if (timeout) {
        options.timeout = timeout;
    }
    return new Promise((resolve, reject) => {
        http.get(url, options)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export const post = (url: string, params?: ParamsProps, timeout?: number): Promise<T> => {
    const options: httpOptions = {};
    if (timeout) {
        options.timeout = timeout
    }
    return new Promise((resolve, reject) => {
        http.post(url, params, options)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export const put = (url: string, params?: ParamsProps, timeout?: number): Promise<T> => {
    const options: httpOptions = {};
    if (timeout) {
        options.timeout = timeout
    }
    return new Promise((resolve, reject) => {
        http.put(url, params, options)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}