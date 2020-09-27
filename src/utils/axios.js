import axios from 'axios'
var instance = axios.create({
    baseURL: 'http://localhost:3000', // 基础url,如果是多环境配置这样写，也可以像下面一行的写死。
    timeout: 6000 ,// 请求超时时间,
    headers:{
        'content-Type': 'application/json'
    }
})

export default instance