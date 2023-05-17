var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var volumeBar;
var volumeSlider;

function preload() {
    // 加载资源
}

function create() {
    // 创建音量调节栏背景
    var volumeBackground = this.add.graphics();
    volumeBackground.fillStyle(0x888888, 0.8);
    volumeBackground.fillRect(100, 200, 200, 20);

    // 创建音量调节栏
    volumeBar = this.add.graphics();

    // 创建滑块
    volumeSlider = this.add.graphics();
    volumeSlider.fillStyle(0xffffff, 1);
    volumeSlider.fillRect(100, 195, 10, 30);

    // 启用输入事件
    volumeSlider.setInteractive({ draggable: true });
    this.input.setDraggable(volumeSlider);

    // 拖动滑块事件
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        // 限制滑块的拖动范围在音量调节栏内部
        if (dragX < 100) {
            dragX = 100;
        } else if (dragX > 300) {
            dragX = 300;
        }

        // 更新音量调节栏的显示
        volumeBar.clear();
        volumeBar.fillStyle(0xffffff, 1);
        volumeBar.fillRect(100, 200, dragX - 100, 20);

        // 根据滑块位置计算音量大小
        var volume = (dragX - 100) / 200;
        // TODO: 根据音量大小进行相关操作，例如设置游戏的音量
    });
}
