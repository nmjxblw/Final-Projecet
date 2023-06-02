class firstFloorLevel1 extends Base {
    constructor(){
        super("floor one level 1", "guardian")
    }

    exPreload(){
        this.load.image("guardian","guardian_with_mask.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");

    }

    onEnter(){

        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;
        this.card = this.createCard("guardian");        
        this.changeText(this.eventText, dataPath.eventText);
        
        this.time.delayedCall(500, () => {
            this.eventCard(dataPath.eventCard1);
        });

        this.time.delayedCall(3500, () => {
            this.eventCard(dataPath.eventCard2);
        });
    

        this.time.delayedCall(6500, () => {
            this.eventCard(dataPath.eventCard3, 1000);
        });
    
    
        this.dragrotate(this.card);

    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("guardian");
        this.gotoScene("floor one level 2");
    }
}