/** 查询npm空闲包名 */
function isEndFor_z(char) {
    return String.fromCharCode(char.charCodeAt(char.length - 1)) === 'z'
}

function getNextCode(char = '') {  // 获取下一个字母
    if (isEndFor_z(char)) return null   // 需要进位
    else return String.fromCharCode(1 + char.charCodeAt(char.length - 1))
}

function getNextCodeForString(string = '') {  // 自动进位
    string = Array.from(string)
    let isCarry = null
    let count = 0
    for (let i = string.length - 1; i >= 0; i--) {
        isCarry = getNextCode(string[i])
        if (isCarry !== null) {  // 不进位
            string[i] = isCarry
            break
        } else {
            string[i] = 'a'
            count++
        }
    }
    if (string.length === count) {
        string = string.map(() => 'a')
        string.push('a')
    }
    return string.join('')
}


async function findNpmPackageName(start, end) {
    const spaceList = []
    if (start.length > end.length) return console.warn('start长度大于end，永远不会退出查询')
    setInterval(()=>{
        console.log('空闲列表:',spaceList);
    },10000)
    while (start !== end) {
        start = getNextCodeForString(start)
        console.log('当前查询',start);
        const url = 'https://registry.npmjs.org/' + start
        const res = await (await fetch(url)).text()
        const resJson = JSON.parse(res)
        console.log(start,':',resJson?.description);
        if (resJson.error ===  'Not found'){
            console.log('找到空闲名称',start);
            spaceList.push(start)
        }
    }
    console.log('查询完成,空闲列表如下');
    console.log(spaceList);
    console.log('滴滴-完成啦');
}

findNpmPackageName('zva', 'zzz').then()

