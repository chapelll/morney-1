
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0

function createId() {
    id++
    window.localStorage.setItem('_idMax',id.toString())
    return id
}

/* 
    id生成器  
    每次创建标签时都会调用这个id生成器，id生成器会从localStorage
    中取出最大的那个id(没有就取0)，然后新创建的标签的id就会是这个取出的id+1，以此类推。每当id+1，就会更换localStorage中的id最大值
*/
export default createId