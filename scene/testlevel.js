class testlevel extends Base {

    eventload() {
        this.events.once('choose1-1Complete', this.action1, this);
        this.events.once('choose1-2Complete', this.action2, this);

        this.events.once('choose2-1Complete', this.action3, this);
        this.events.once('choose2-2Complete', this.action4, this);
    }


    onEnter() {

        let text1 = "点击左边的按钮"
        let text2 = "点击右边的按钮"
        this.card = this.createCard("card1");

        this.choose1_1 = "choose1-1Complete";
        this.choose1_2 = "choose1-2Complete";

        this.choose1_text1 = this.createEventText("开关1,你选择了: ");


        
        
        this.dragrotate(this.card,text1,text2,this.choose1_1,this.choose1_2);
        
    }

    action1() {
        this.changeText(this.choose1_text1, "你死了");
    }

    action2()
    {
        this.changeText(this.choose1_text1, `锁打开了
还剩一把锁，你选择：`);

        this.choose2_1 = "choose2-1Complete";
        this.choose2_2 = "choose2-2Complete";
        let text1 = "点击左边的按钮"
        let text2 = "点击右边的按钮"

        this.card2 = this.creatcard("card2");
        
    
        this.dragrotate(this.card2,text1,text2,this.choose2_1,this.choose2_2);
        
    }

    action3()
    {
        this.changeText(this.choose1_text1,"你死了");
    }

    action4()
    {
        this.changeText(this.choose1_text1,`随着两把锁都打开，宝箱解锁了
你从宝箱里获得了神秘的盾牌`);
    }
}