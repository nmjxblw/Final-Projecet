class secondFloorLevel3 extends Base {
    constructor(){
        super("floor two level 3","Open Treasure Chest")
    }

    onEnter() {

        currentPosition ="floor two level 3";

        this.card.setTexture("elf");
        this.left_choice_text = dataPath.left1
        this.right_choice_text = dataPath.right1

        this.card.label = false;
        this.changeText(this.eventText, dataPath.eventText1);

        this.time.delayedCall(3000, () => {
            
            this.changeText(this.eventText, dataPath.eventText2);
        })

        this.time.delayedCall(6000, () => {
            this.changeText(this.eventText, dataPath.eventText3);
            this.card.label = true;
        })
        

        this.dragrotate(this.card);

        this.scene_turn = 1;


    }

    //递归函数，用于实现while loop
    judgeChoice() {
        if (this.player_choice != "") {
            if (this.scene_turn == 1) {
                this.action1();
            }
            else if(this.scene_turn == 2)
            {
                this.action2();
            }
            else if(this.scene_turn == 3)
            {
                this.action3();
            }
            else if(this.scene_turn == 4)
            {
                this.action4();
            }
            
            
        }
        this.scene_turn++;
    }

    action1() {
        if (this.player_choice == "left")
        {
            this.changeText(this.eventText, dataPath.eventText5);
            this.card.label = false;
            this.rotateOutAndMakeNewCard("card1");

            this.time.delayedCall(3000, () => {
                this.card.label = true;
                this.changeText(this.eventText, dataPath.eventText6);
            })

            this.left_choice_text = dataPath.left2;
            this.right_choice_text = dataPath.right2;

        }
        else
        {
            this.changeText(this.eventText, dataPath.eventText4);

            this.rotateOutAndMakeNewCard("card1");
            this.time.delayedCall(3000, () => {
                this.gotoScene("floor three level 1");
            })
        }
        
    }
    action2()
    {
        if (this.player_choice == "left")
        {
            this.changeText(this.eventText, dataPath.eventText7);
            this.rotateOutAndMakeNewCard("card1");

            this.unlock.play();

            this.left_choice_text = dataPath.left2;
            this.right_choice_text = dataPath.right2;

        }
        else
        {
            console.log(saveData);
            this.changeText(this.eventText, dataPath.eventText8);
            this.card.label = false;

            this.rotateOutAndMakeNewCard("card1");
            this.time.delayedCall(3000, () => {
                
                this.gotoScene("floor four level 1")
            })
        }

    }

    action3()
    {
        if(this.player_choice == "left")
        {
            this.changeText(this.eventText, dataPath.eventText9);
            this.card.label = false;

            this.unlock.play();

            this.time.delayedCall(3000, () => {
                this.chestCreak.play();
            })
    
            this.time.delayedCall(5000, () => {
                this.card.label = true;
                this.changeText(this.eventText, dataPath.eventText10);  
            })

            this.rotateOutAndMakeNewCard("card1");
    
            this.left_choice_text = dataPath.left3;
            this.right_choice_text = dataPath.right3;
        }
        else
        {
            this.changeText(this.eventText, dataPath.eventText8);
            this.card.label = false;

            this.rotateOutAndMakeNewCard("card1");
            this.time.delayedCall(3000, () => {
                
                this.gotoScene("floor four level 1")
            })
        }
    }

    action4()
    {
        this.rotateOutAndMakeNewCard("card1");
        this.gotoScene("floor three level 1");
    }
}