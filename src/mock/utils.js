export const getParams = (path) => {
    let paramsArr = path.split('?')[1];
    let params = {};
    if (paramsArr.length > 0) {
        let arrPara = paramsArr.split('&');
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            params[arr[0]] = arr[1];
        }
    }
    return params;
}