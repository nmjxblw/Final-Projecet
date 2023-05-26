class testlevel extends Base{

    eventload(){
        this.events.once('action1Complete', this.startAction2, this);
    }


    onEnter() {

        let text1 = "嘻嘻"
        let text2 = "哈哈"
        let card = this.creatcard("card1");

        this.choose1 = "choose1-1Complete";
        this.choose2 = "choose1-2Complete";


        this.dragrotate(card,text1,text2,choose1,choose2);
    }

    action1()
    {

    }
}