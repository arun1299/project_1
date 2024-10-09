import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data/data.service';
import { MenuItem, mainMenus } from '../../models/models';
@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  public toggleSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMiniSidebar') ?? "false"
  );

  public toggleMobileSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMobileSidebar') ?? "false"
  );

  public expandSideBar: BehaviorSubject<string> = new BehaviorSubject<string>("false");

  public layoutPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutPosition') ?? '1'
  );
  public layoutDirection: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutDirection') ?? 'ltr'
  );
  public primarySkinStyle: BehaviorSubject<string> =
    new BehaviorSubject<string>(
      localStorage.getItem('primarySkinStyle') ?? '0'
    );

  constructor(private data: DataService) {
    if (localStorage.getItem('isMiniSidebar') == 'true') {
      this.expandSideBar.next("false");
    } else {
      this.expandSideBar.next("true");
    }
  }

  public switchSideMenuPosition(): void {
    if (localStorage.getItem('isMiniSidebar')) {
      this.toggleSideBar.next("false");
      this.expandSideBar.next("true");
      localStorage.removeItem('isMiniSidebar');
      this.data.sideBar.forEach((mainMenus:mainMenus) => {
        mainMenus.menu.forEach((resMenu: MenuItem) => {
          const menuValue = sessionStorage.getItem('menuValue');
          if (menuValue && menuValue == resMenu.menuValue) {
            resMenu.showSubRoute = true;
          }
        });
      });
    } else {
      this.toggleSideBar.next('true');
      this.expandSideBar.next("false");
      localStorage.setItem('isMiniSidebar', 'true');
      this.data.sideBar.forEach((mainMenus: mainMenus) => {
        mainMenus.menu.forEach((resMenu: MenuItem) => {
          resMenu.showSubRoute = false;
        });
      });
    }
  }

  public switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next("false");
      localStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next("true");
      localStorage.setItem('isMobileSidebar', 'true');
    }
  }

  public changeLayout(position: string): void {
    this.layoutPosition.next(position);
    localStorage.setItem('layoutPosition', position);
  }
  public changePrimarySkinStyle(style: string): void {
    if (localStorage.getItem('primarySkinStyle') == style) {
      this.primarySkinStyle.next('0');
      localStorage.setItem('primarySkinStyle', '0');
    } else {
      this.primarySkinStyle.next(style);
      localStorage.setItem('primarySkinStyle', style);
    }
  }

  public resetMiniSidebar(): void {
    this.toggleSideBar.next("false");
    this.toggleSideBar.next("false");
    localStorage.removeItem('isMiniSidebar');
  }
}
