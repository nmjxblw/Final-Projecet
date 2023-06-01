class secondFloorLevel3 extends Base {
    constructor(){
        super("floor two level 3","Open Treasure Chest")
    }

    onEnter() {

        if (saveData == {}) {
            
            quickSaveData();
        }
        
        

        if(saveData.player.sword == 1)
        {
            this.changeText(this.eventText, `After the great pain, with a burst of light, you find that the pain is gone.

You open your eyes and find yourself back at the moment after you defeated the giant`);
        this.input.enabled = false;
        this.card.setTexture("sword");

        this.time.delayedCall(5000, () => {
            this.changeText(this.eventText, `You don't know what's happening, 
when you find the sword in your hand is shining with a strange light

You see, this may be the mysterious power of the sword that the Guardian speaks of`);   
        })

        this.time.delayedCall(10000, () => {
            
            
            this.changeText(this.eventText, `With the experience of the last time, this time you will not repeat the same mistake`);   
        })

            this.left_choice_text = dataPath.left1
            this.right_choice_text = dataPath.right1
    
            this.input.enabled = false;
    
            this.time.delayedCall(13000, () => {
                this.card.setTexture("elf");
                this.changeText(this.eventText, dataPath.eventText1);
            })

            this.time.delayedCall(16000, () => {
                this.card.setTexture("elf");
                this.changeText(this.eventText, dataPath.eventText2);
            })
    
            this.time.delayedCall(19000, () => {
                this.input.enabled = true;
                this.changeText(this.eventText, dataPath.eventText3);
                this.eventCard(`When you die, the power of the sword will resurrect you.`);
                
                this.time.delayedCall(3500, () => {
                    this.eventCard(`You will be reborn at the beginning of the current scene.`);
                });
                
            })
        }
        else
        {
            this.card.setTexture("elf");
            this.left_choice_text = dataPath.left1
            this.right_choice_text = dataPath.right1
    
            this.input.enabled = false;
            this.changeText(this.eventText, dataPath.eventText1);
    
            this.time.delayedCall(3000, () => {
                
                this.changeText(this.eventText, dataPath.eventText2);
            })
    
            this.time.delayedCall(6000, () => {
                this.changeText(this.eventText, dataPath.eventText3);
                this.input.enabled = true;
            })
        }

        



        

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
            this.input.enabled = false;
            this.rotateOutAndMakeNewCard("card1");

            this.time.delayedCall(3000, () => {
                this.input.enabled = true;
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

            this.left_choice_text = dataPath.left2;
            this.right_choice_text = dataPath.right2;

        }
        else
        {
            saveData.player.sword++;
            console.log(saveData);
            this.changeText(this.eventText, dataPath.eventText8);
            this.input.enabled = false;

            this.rotateOutAndMakeNewCard("card1");
            this.time.delayedCall(3000, () => {
                
                this.scene.restart();
            })
        }

    }

    action3()
    {
        if(this.player_choice == "left")
        {
            this.changeText(this.eventText, dataPath.eventText9);
            this.input.enabled = false;
    
            this.time.delayedCall(5000, () => {
                this.input.enabled = true;
                this.changeText(this.eventText, dataPath.eventText10);  
            })

            this.rotateOutAndMakeNewCard("card1");
    
            this.left_choice_text = dataPath.left3;
            this.right_choice_text = dataPath.right3;
        }
        else
        {
            saveData.player.sword++;
            this.changeText(this.eventText, dataPath.eventText8);
            this.input.enabled = false;

            this.rotateOutAndMakeNewCard("card1");
            this.time.delayedCall(3000, () => {
                
                this.scene.restart();
            })
        }
    }

    action4()
    {
        this.rotateOutAndMakeNewCard("card1");
        this.gotoScene("floor three level 1");
    }
}