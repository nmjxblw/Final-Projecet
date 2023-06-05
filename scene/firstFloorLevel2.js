class firstFloorLevel2 extends Base {
    constructor(){
        super("floor one level 2", "door")
    }

    onEnter(){
        game.sound.stopAll();
        this.bgm.play();
        this.changeText(this.eventText, dataPath.eventText);
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;
        this.card.setTexture("gate");
        this.dragrotate(this.card); 
    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("gate");
        this.gotoScene("floor one level 3");
    }
}