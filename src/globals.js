//全局变量
let Timer = 0;//临时计时器
let Volume = 0.5;//音量大小，范围:[0-1],float
let GameOver = false;//用于检测玩家是否死亡
let saveDataJsonFilePath = './assets/SaveData.json';//存储SaveData.json的路径，string
let saveData;//玩家临时存档，最终存档存储于localStorage中
let gameData;//游戏数据（关卡数值和其他信息，在'./assets/InGameData.json'中定义以后调用）

//全局函数
//加载存档
function loadSaveData() {
    //1.先检测是否有localStorage，如果有则将数据赋予全局变量saveData
    saveData = localStorage.getItem("saveData");
    //2.如果没有则从saveData.json中复制
    fetch(saveDataJsonFilePath)
        .then((response) => {
            response.json();
        })
        .then((jsonData) => {
            //2.如果没有localStorage则从saveData.json中复制数据再赋值
            if (typeof saveData === 'undefined') {
                saveData = jsonData;
                localStorage.setItem('saveData', JSON.stringify(jsonData));
            }
            else {
                //3.假设localStorage存在，检验是否存在异常数据（数据缺失或者undefined）
                saveDataCheck();
            }
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
    console.log('saveData:' + saveData);
    console.log('localStorage:' + localStorage);
    return;
}

//写入存档
function writeSaveData() {
    //1.先检测saveData是否赋值
    if (typeof saveData === 'undefined') {
        console.warn(`正在调用写入存档函数,saveData未赋值!调用加载存档函数为saveData赋值。`);
        //调用加载存档函数为saveData赋值
        loadSaveData();
    }

    //将saveData中的数据导入localStorage
    localStorage.setItem('saveData', JSON.stringify(saveData));
    //检验数据合法性
    saveDataCheck();
    return;
}

//检测saveData中数据是否异常（数据缺失或者undefined）
function saveDataCheck() {
    var flag = false;
    var TempSaveData = localStorage.getItem('saveData');
    //如果TempSaveData存在则将TempSaveData解析为 JavaScript 对象并赋值给localStorageData
    var localStorageData = TempSaveData ? JSON.parse(TempSaveData) : {};

    fetch(saveDataJsonFilePath)
        .then((response) => {
            response.json();
        })
        .then((jsonData) => {
            for (var key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    if (!(key in localStorageData) || localStorageData[key] === undefined) {
                        //localStorage存在异常数据 = saveData也存在异常数据，flag为真
                        flag = true;
                        localStorageData[key] = jsonData[key];
                    }
                }
            }
            if (flag) {
                //回写数据
                localStorage.setItem('saveData', JSON.stringify(localStorageData));
                saveData = localStorage.getItem("saveData");
            }
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
    return;
}

//删除玩家本地数据并初始化
function initializeLocal(){
    localStorage.clear();
    loadSaveData();
    return;
}