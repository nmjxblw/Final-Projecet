class baseBattle extends Base {

    eventload() {
        // this.events.on('1-right', this.action1, this);
        // this.events.on('1-left', this.action2, this);

        // this.events.on('2-right', this.action3, this);
        // this.events.on('2-left', this.action4, this);

        // this.events.on('3-right', this.action5, this);
        // this.events.on('3-left', this.action6, this);

    }


    onEnter() {

        this.monsterHP = 3;


        this.left_choice_text = "开始战斗"
        this.right_choice_text = "开始战斗"
        this.card = this.createCard("card1");

        this.event_text = this.createEventText("骷髅兵向你袭来");

        this.dragrotate(this.card);

        this.scene_turn = 1;
        

    }

    //递归函数，用于实现while loop
    judgeChoice() {
        console.log(`当前场景回合数：${this.scene_turn}`);

        if (this.scene_turn  === 1 ) {
            if (this.player_choice === "right") {
                
                this.action5();
            }
           
            else if (this.player_choice === "left") {
                
                this.action5();
            }
            this.scene_turn++;
        }
        else if (this.scene_turn % 2 === 0 && this.monsterHP > 0) {
            if (this.player_choice === "right") {
                
                this.action3();
            }
            else if (this.player_choice === "left") {
                
                this.monsterHP--;
                if(this.monsterHP > 0)
                {
                    this.action4();
                }
                
                
                
            }
            this.scene_turn++;
        }
        else if (this.scene_turn % 2 === 1 && this.monsterHP > 0) {
            if (this.player_choice === "right") {
                
                this.action1();
            }
            else if (this.player_choice === "left") {
                
                this.monsterHP--;
                PlayerHP--;
                this.shakeTween(this.cameras.main);
                if(this.monsterHP > 0)
                {
                    this.action2();
                }
                
            }
            this.scene_turn++;
        }
        else
        {
            this.action6();
            
        }

        
    }

    action1() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, "骷髅兵准备移动: " + this.monsterHP + PlayerHP);
        

        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";
    }

    action2() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, `骷髅兵准备移动: `+ this.monsterHP + PlayerHP);

        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";

        
    }

    action3() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, "骷髅兵准备攻击: "+ this.monsterHP + PlayerHP);

        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";
    }

    action4() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, `骷髅兵准备攻击: `+ this.monsterHP + PlayerHP);
        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";
    }

    action5(){
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, "1.骷髅兵准备移动: " + this.monsterHP + PlayerHP);
        

        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";
    }

    action6(){
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, "你获得了胜利 ");
        

        this.left_choice_text = "离开战斗";
        this.right_choice_text = "离开战斗";

        
    }
    
}
    


    
