class thirdFloorLevel1 extends Base{
    constructor(){
        //当前场景为第三层大门前
        super("floor three level 1","floor three level 1")
    }

    exPreload(){
        this.load.image("door","card1.png");
        this.load.image("card1","card1.png");
        this.load.image("card2","card2.png");
    }

    onEnter(){

        this.left_choice_text = dataPath["left"];
        this.right_choice_text =  dataPath["right"];

        this.createEventText(dataPath["event"]);

        this.card = this.createCard("door");

        this.eventCard(dataPath["eventCard"]);
        
        this.dragrotate(this.card);
    }

    judgeChoice(){
        
    }
}