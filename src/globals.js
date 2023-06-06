//全局变量
let Timer = 0;//临时计时器
let GameOver = false;//用于检测玩家是否死亡
let saveDataJsonFilePath = 'json/SaveData.json';//存储SaveData.json的路径，string
let saveData = localStorage.getItem('saveData') ? JSON.parse(localStorage.getItem('saveData')) : {};//玩家临时存档，最终存档存储于localStorage中,JavaScript Object
let gameData;//游戏数据（关卡数值和其他信息，在'../json/InGameData.json'中定义以后调用）
let dataPath;//数据路径定义，具体路径在base的shortCut中定义
// let Volume = saveData ? saveData.volume : 0.5;//音量大小，范围:[0-1],float
let transitionDuration = 1000;//过渡时间1s
let death = false;
let currentPosition;
let bgm;
//全局函数
//加载存档
function loadSaveData() {
    //console.log("已调用loadSaveData()");
    //2.如果没有则从saveData.json中复制
    fetch(saveDataJsonFilePath)
        .then((response) => {
            response.json()
                .then((jsonData) => {
                    //2.如果没有localStorage则从saveData.json中复制数据再赋值
                    if (typeof saveData === 'undefined' || !saveData || saveData === {}) {
                        //console.log("检测到saveData为空");
                        //console.log("当前jsonData为:");
                        //console.log(jsonData);
                        saveData = jsonData;
                        localStorage.setItem('saveData', JSON.stringify(jsonData));
                    }
                    else {
                        //3.假设localStorage存在，检验是否存在异常数据（数据缺失或者undefined）
                        saveDataCheck();
                    }
                    //console.log("当前saveData为:");
                    //console.log(saveData);
                });
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}

//写入存档
function writeSaveData() {
    //console.log("已调用writeSaveData()");
    //1.先检测saveData是否赋值
    if (typeof saveData === 'undefined' || !saveData || saveData === {}) {
        console.warn(`正在调用写入存档函数,saveData未赋值!调用加载存档函数为saveData赋值。`);
        //调用加载存档函数为saveData赋值
        loadSaveData();
    }

    //将saveData中的数据导入localStorage
    localStorage.setItem('saveData', JSON.stringify(saveData));
    //检验数据合法性
    saveDataCheck();
}

//检测saveData中数据是否异常（数据缺失或者undefined）
function saveDataCheck() {
    //console.log("已调用saveDataCheck()");
    var flag = false;
    //判断localstorage中是否有‘saveData’键，如果有将数据解析成JavaScript对象并赋值给localStorageData
    var localStorageData = localStorage.getItem('saveData') ? JSON.parse(localStorage.getItem('saveData')) : {};

    fetch(saveDataJsonFilePath)
        .then((response) => {
            response.json()
                .then((jsonData) => {
                    for (var key in jsonData) {
                        if (jsonData.hasOwnProperty(key)) {
                            if (!(key in localStorageData) || localStorageData[key] === undefined) {
                                //localStorage存在异常数据 = saveData也存在异常数据，flag为真
                                console.warn(`localStorage存在异常数据于键[${key}]`)
                                flag = true;
                                localStorageData[key] = jsonData[key];
                            }
                        }
                    }
                    if (flag) {
                        //回写数据
                        //console.log("开始回写数据");
                        localStorage.setItem('saveData', JSON.stringify(localStorageData));
                        saveData = localStorageData;
                        //console.log("回写完成");
                    }
                    //console.log(saveData);
                });
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}

//删除玩家本地数据并初始化
function initializeLocal() {
    localStorage.clear();
    loadSaveData();
}

//快速访问js
function quickSaveData() {
    fetch(saveDataJsonFilePath)
        .then((response) => {
            response.json()
                .then((jsonData) => {
                    console.log(jsonData);
                    saveData = jsonData;
                    localStorage.setItem('saveData', JSON.stringify(jsonData));
                });
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}