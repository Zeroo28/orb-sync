class OrbInstance {
  screenPosition: Position;
  id: number;

  constructor(position: Position) {
    this.id = 0;
    this.screenPosition = position;

    this.create();
  }

  private create() {
    // check whcih orb we are creating ( 1 or 2 )
    // i.e if 1 exists, create 2

    console.debug('localstorage', localStorage);

    if (localStorage.getItem('orb-1')) {
      this.id = 2;
      console.debug('orb 2 created');
    } else {
      this.id = 1;
      console.debug('orb 1 created');
    }

    localStorage.setItem(`orb-${this.id}`, JSON.stringify(this));

    console.debug('orb created', this);
    console.debug('localstorage', localStorage);
  }

  public updatePosition(position: Position) {
    this.screenPosition = position;
    localStorage.setItem(`orb-${this.id}`, JSON.stringify(this));
  }
}

class Position {
  constructor(public x: number, public y: number) {
    x = parseFloat(x.toFixed(2));
    y = parseFloat(y.toFixed(2));
  }
}

export { OrbInstance, Position };
