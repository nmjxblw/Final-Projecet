class firstFloorLevel2 extends Base {
    constructor(){
        super("floor one level 2", "door")
    }

    exPreload(){
        this.load.image("door","card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");

    }

    onEnter(){

        this.changeText(this.eventText,`You have arrived at the first floor of the dungeon.\nImmediately, you are attacked by a monster.`);
        this.left_choice_text = "Attack the monster";
        this.right_choice_text = "Attack the monster";
        this.card = this.createCard("door");
        this.dragrotate(this.card); 
    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("door");
        this.gotoScene("floor one level 3");
    }
}