const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        // mode: Phaser.Scale.ScaleModes.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    ////scene: [baseBattle],
    //scene: [secondFloorLevel1, secondFloorLevel2],
    scene: [
        // openning,
        // warnning,
        // title,
        // credit,
        // thirdFloorLevel1,
        // thirdFloorLevel2,
        thirdFloorLevel3,
        // thirdFloorLevel4,
        //thirdFloorLevel5,
        credit,
        title,
    ],
    backgroundColor: 0x000000,
    title: "Game",
});

