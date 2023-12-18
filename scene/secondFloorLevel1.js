class secondFloorLevel1 extends Base {
  constructor() {
    //The door after the first floor opens to enter the second floor
    super("floor two level 1", "open the gate of first floor");
  }

  onEnter() {
    this.left_choice_text = dataPath.left;
    this.right_choice_text = dataPath.right;

    this.changeText(this.eventText, dataPath.eventText);
    this.card.setTexture("gate");

    this.dragrotate(this.card);
  }

  //Determine player choice
  judgeChoice() {
    if (this.player_choice != "") {
      this.goToLevel2();
    }
  }

  goToLevel2() {
    this.card.label = false;
    this.rotateOutAndMakeNewCard("elf");

    this.openDoor.play();
    this.delayTime = 1000;

    this.time.delayedCall(this.delayTime, () => {
      this.gotoScene("floor two level 2");
    });
  }
}
