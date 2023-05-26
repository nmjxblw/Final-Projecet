class testlevel extends Base{

    eventload(){
        this.events.once('choose1-1Complete', this.action1, this);
        this.events.once('choose1-2Complete', this.action2, this);
    }


    onEnter() {

        let text1 = "点击左边的按钮"
        let text2 = "点击右边的按钮"
        this.card = this.creatcard("card1");

        this.choose1_1 = "choose1-1Complete";
        this.choose1_2 = "choose1-2Complete";

        this.choose1_text1 = this.createtext("开关1,你选择了: ");


        //this.card2 = this.creatcard("card1");
        if(this.card.label == true)
        {
            this.dragrotate(this.card,text1,text2,this.choose1_1,this.choose1_2);
        }
        
        //this.dragrotate(card2,text1,text2,this.choose1,this.choose2);
    }

    action1()
    {
        this.destorytext(this.choose1_text1);
        this.choose1_result1 = this.createtext("你死了");
        
    }

    action2()
    {
        this.destorytext(this.choose1_text1);
        this.choose1_result2 = this.createtext("你也死了");
    }
}