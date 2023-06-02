class firstFloorLevel2 extends Base {
    constructor(){
        super("floor one level 2", "door")
    }

    onEnter(){

        this.changeText(this.eventText, dataPath.eventText);
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;
        this.card.setTexture("door");
        this.dragrotate(this.card); 
    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("door");
        this.gotoScene("floor one level 3");
    }
}