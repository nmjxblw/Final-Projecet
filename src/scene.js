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
    scene: [secondFloorLevel1,secondFloorLevel2,secondFloorLevel3],
    //  scene: [
    //     // thirdFloorLevel1,
    //      thirdFloorLevel2,
    //      //thirdFloorLevel3,
    //      //thirdFloorLevel4,
    //  ],
    // scene: [
    //     firstFloorLevel1,
    //     firstFloorLevel2,
    //     firstFloorLevel3,
    //     firstFloorLevel4,
    //     firstFloorLevel5
    // ],
    backgroundColor: 0x000000,
    title: "Game",
});

