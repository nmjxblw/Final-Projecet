//全局变量
let Timer = 0;//临时计时器
let Volume = 0.5;//音量大小，范围:[0-1],float
let GameOver = false;//用于检测玩家是否死亡
let saveDataJsonFilePath = 'json/SaveData.json';//存储SaveData.json的路径，string
let saveData;
let gameData;//游戏数据（关卡数值和其他信息，在'../json/InGameData.json'中定义以后调用）
let dataPath;//数据路径定义，具体路径在base的shortCut中定义
let transitionDuration = 1000;//过渡时间1s
let death = false;
let currentPosition;
//全局函数
//快速访问js
function quickSaveData() {
    fetch(saveDataJsonFilePath)
        .then((response) => {
            response.json()
                .then((jsonData) => {
                    console.log(jsonData);
                    saveData = jsonData;
                });
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}