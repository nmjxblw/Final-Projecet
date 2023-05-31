class secondFloorLevel1 extends Base {
    constructor(){
        //第一层结束后的大门，打开进入第二层
        super("floor two level 1","open the gate of first floor")
    }

    onEnter() {


        initializeLocal();

        this.left_choice_text = dataPath.left
        this.right_choice_text = dataPath.right
        this.card = this.createCard("card1");

        this.changeText(this.eventText, dataPath.eventText);

        this.dragrotate(this.card);

        this.scene_turn = 1;


    }

    //递归函数，用于实现while loop
    judgeChoice() {
        if (this.player_choice != "") {
            if (this.scene_turn == 1) {
                this.action1();
            }
        }
    }

    action1() {
        this.rotateOutAndMakeNewCard("card1");
        this.gotoScene("floor two level 2");    
    }
}