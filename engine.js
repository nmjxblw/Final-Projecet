class GameScene extends Phaser.Scene{
    init(){}

    constructor(key,name){
        super(key);
        this.name = name;
        //提取name中的数字转化为int，并用this.level存储
        this.level = parseInt(this.name.replace(/[^0-9]/ig,""));
    }

    preload(){
        this.load.path = "./assets/";
    }

    create(){

        //设置编写游戏时常用的数据
        this.setShortCut();

        //调用加载游戏内UI函数
        this.loadUI();
    }

    //设置编写游戏时常用的数据
    setShortCut(){

        //以config为标准获得游戏画布的长和宽
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        //以镜头为准，获得镜头的中心
        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;
    }

    //加载游戏UI
    loadUI(){
        //加载UI背景，凸显UI
        //放置全屏按钮
        //放置设置按钮并具有如下功能：1.返回游戏 2.返回标题 3.转到游戏设置 （可选：4.保存进度 5.加载进度） 
        //放置音量按钮：鼠标单击打开音量调节（bar）和静音功能
    }
}