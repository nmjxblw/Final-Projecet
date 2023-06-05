class firstFloorLevel0 extends GameScene {
    constructor(){
        super("floor one level 0", "intro")
    }

    exCreate(){

        this.cameras.main.fadeIn(transitionDuration, 0, 0, 0);
        //设置背景图片
        this.backgroundImage = this.add.image(0, 0, "background3").setOrigin(0).setDepth(-1);

        //设置文本框
        this.add.rectangle(0, 0, 1920, 1080, 0x000000).setOrigin(0).setDepth(1).setAlpha(0.5);

        //文本
        this.Text1 = this.add.text(this.w * 0.05, this.h * 0.1, `Once upon a time, there is a land filled with magic and mysterious elements, 
        
        
and within it, there is a dungeon full of mystery. `)
            .setColor("#ffffff")
            .setOrigin(0)
            .setDepth(4)
            .setFontSize(30)
            .setFontFamily("Century Gothic")
            .setAlpha(0)   
        

        this.Text2 = this.add.text(this.w * 0.05, this.h * 0.3, `A powerful dragon lives within the dungeon and would bring tragedy to the world once every few years.`)
            .setColor("#ffffff")
            .setOrigin(0)
            .setDepth(4)
            .setFontSize(30)
            .setFontFamily("Century Gothic")
            .setAlpha(0)

        this.Text3 = this.add.text(this.w * 0.05, this.h * 0.4, `However, as a prophecy tells, one day a brave man would come with the great sword full of unexplainable power, 
        

and they would use it to defeat the dragon.`)
            .setColor("#ffffff")
            .setOrigin(0)
            .setDepth(4)
            .setFontSize(30)
            .setFontFamily("Century Gothic")
            .setAlpha(0) 

        this.Text4 = this.add.text(this.w * 0.05, this.h * 0.6, `You are an adventurer. Your hometown is destroyed by the dragon during the previous attack.`)
            .setColor("#ffffff")
            .setOrigin(0)
            .setDepth(4)
            .setFontSize(30)
            .setFontFamily("Century Gothic")
            .setAlpha(0) 

        this.Text5 = this.add.text(this.w * 0.05, this.h * 0.7, `As you see the fire burn through your hometown, you are filled with sorrow and anger, 
        

and you swear to defeat the dragon with the great sword from the prophecy.`)
            .setColor("#ffffff")
            .setOrigin(0)
            .setDepth(4)
            .setFontSize(30)
            .setFontFamily("Century Gothic")
            .setAlpha(0) 

        this.tweens.add({
                targets: this.Text1,
                alpha: 1,
                delay: 1000,
                duration: 1500,
                ease: 'Linear',
            });

        this.tweens.add({
                targets: this.Text2,
                alpha: 1,
                delay: 4000,
                duration: 1500,
                ease: 'Linear',
            });

        this.tweens.add({
                targets: this.Text3,
                alpha: 1,
                delay: 7000,
                duration: 1500,
                ease: 'Linear',
            });

        this.tweens.add({
                targets: this.Text4,
                alpha: 1,
                delay: 10000,
                duration: 1500,
                ease: 'Linear',
            });

        this.tweens.add({
                targets: this.Text5,
                alpha: 1,
                delay: 13000,
                duration: 1500,
                ease: 'Linear',
            });

        this.time.delayedCall(40000, () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => { this.scene.start("floor one level 1") });
        });
    
        this.input.on("pointerdown", () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => { this.scene.start("floor one level 1") });
        });

}
}