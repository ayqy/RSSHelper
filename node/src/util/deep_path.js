/**
 * 获取对象深层级的属性值
 * 例如：
 *      获取a.b.c.d[0]    deepPath(a,['b','c','d',0]);
 * */
module.exports = (obj, path) => {
    let target = obj;
    const n = path.length;
    if (n > 0) {
        for (let i = 0; i < n; i++) {
            if ('object' == typeof target) {
                target = target[path[i]];
            } else {
                target = undefined;
                break;
            }
        }
    }
    return target;
};