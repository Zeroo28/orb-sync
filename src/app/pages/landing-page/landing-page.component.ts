import { Component, OnInit } from '@angular/core';

import { OrbInstance, Position } from '@app/types/orb';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  private orb?: OrbInstance;
  private lastWindowPosition?: Position;

  ngOnInit(): void {
    this.orb = new OrbInstance(this.getPosition());

    // every 200ms check if the window was moved
    setInterval(() => {
      const windowPosition = new Position(window.screenX, window.screenY);

      if (this.lastWindowPosition) {
        if (
          windowPosition.x !== this.lastWindowPosition.x ||
          windowPosition.y !== this.lastWindowPosition.y
        ) {
          this.orb!.updatePosition(this.getPosition());
        }
      }

      this.lastWindowPosition = windowPosition;

      this.updateOrbLine();
    }, 200);
  }

  private getPosition() {
    const posX = window.screenX + window.innerWidth / 2;
    const posY = window.screenY + window.innerHeight / 2;

    return new Position(posX, posY);
  }

  private updateOrbLine() {
    const orbs = [localStorage.getItem('orb-1'), localStorage.getItem('orb-2')]
      .map((orb) => {
        if (orb) {
          return JSON.parse(orb) as OrbInstance;
        }
        return null;
      })
      .filter((orb) => orb);

    const line = document.getElementsByClassName('line')[0] as HTMLElement;
    if (!line) return;

    if (orbs.length < 2) {
      line.style.display = 'none';
      return;
    }

    const { x: orb1X, y: orb1y } = (orbs[0] as OrbInstance).screenPosition;
    const { x: orb2X, y: orb2Y } = (orbs[1] as OrbInstance).screenPosition;

    const angle = Math.atan2(orb2Y - orb1y, orb2X - orb1X) * (180 / Math.PI);

    line.style.display = 'block';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transition = 'transform 0.5s ease-in';
  }
}
