class secondFloorLevel3 extends Base {
    constructor(){
        super("floor two level 3","Open Treasure Chest")
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
        this.gotoScene("floor two level 2");
        
    }
}