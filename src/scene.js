const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        // mode: Phaser.Scale.ScaleModes.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    ////scene: [baseBattle],
    scene: [debug_scene,secondFloorLevel1,secondFloorLevel2,secondFloorLevel3,reborn],
    // scene: [ 
    //     // openning,
    //     // warnning,
    //     // title,
    //     // firstFloorLevel1,
    //     // firstFloorLevel2,
    //     // firstFloorLevel3,
    //     // firstFloorLevel4,
    //     // firstFloorLevel5,
    //     // secondFloorLevel1,
    //     // secondFloorLevel2,
    //     // secondFloorLevel3,
    //     thirdFloorLevel1,
    //     thirdFloorLevel2,
    //     thirdFloorLevel3,
    //     thirdFloorLevel4,
    //     thirdFloorLevel5,
    //     reborn,
    // ],
    backgroundColor: 0x000000,
    title: "Game",
});

