import { Component } from '@angular/core';
import { AuthService, routes } from 'src/app/core/core.index';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  public miniSidebar = false;
  public routes = routes;
  public user_name  = localStorage.getItem('name')
  public user_type = localStorage.getItem('type')

  elem=document.documentElement

  constructor(private auth: AuthService, private sideBar: SideBarService) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }



  public logOut(): void {
    this.auth.logout();
  }
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileIcon(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  fullscreen() {
    if(!document.fullscreenElement) {
      this.elem.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  }
}
