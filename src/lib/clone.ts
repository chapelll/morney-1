function clone(data: any) {
    return JSON.parse(JSON.stringify(data)) 
    //深拷贝函数
}

export default clone