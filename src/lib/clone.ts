function clone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data)) 
    //深拷贝函数
}

export default clone