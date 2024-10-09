import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, CommonService, DataService, routes,} from '../core/core.index';
import { SideBarService } from '../core/services/side-bar/side-bar.service';
import { MenuItem, mainMenu, mainMenus } from '../core/models/models';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationComponent implements OnDestroy
{
  public authenticated = false;
  public miniSidebar = false;
  public autohide = false;
  public expandMenu : boolean | string= false;
  public mobileSidebar = false;

  public base = '';
  public page = '';
  public last = '';

  public routes = routes;
  public hideheader =false;
  public sidebar =false;

  constructor(
    private auth: AuthService,
    private sideBar: SideBarService,
    public router: Router,
    private data: DataService,
    private common: CommonService
  ) {

    this.common.baseRoute.subscribe((res: string) =>
    {
      this.base = res?.replace('-', ' ');
    });
    this.common.pageRoute.subscribe((res: string) =>
    {
      this.page = res?.replace('-', ' ');
    });
    this.common.lastRoute.subscribe((res: string) =>
    {
      this.last = res?.replace('-', ' ');
    });
    // <* condition to check weather login *>
    this.auth.checkAuth.subscribe((res: string) =>
    {
      if (res == 'true') {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    });

    router.events.subscribe((event) =>
    {
      if (event instanceof NavigationEnd) {
        this.sessionOut();
      }
    });

    // <* condition to check side bar position *>
    this.sideBar.toggleSideBar.subscribe((res: string) =>
    {
      //console.log("Side Bar :", res);
      if (res === 'true')
      {
        this.miniSidebar = true;
        this.autohide = true;
      } else {
        this.miniSidebar = false;
        this.autohide = false;
      }
    });
    // <* condition to check side bar position *>

    // <* condition to check mobile side bar position *>
    this.sideBar.toggleMobileSideBar.subscribe((res: string) =>
    {
      if (res == 'true' || res == "true") {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    // <* condition to check mobile side bar position *>
    this.sideBar.expandSideBar.subscribe((res:  boolean | string) =>
    {
      this.expandMenu = res;
      // <* to collapse submenu while toggling side menu*>
      if (res === false && this.miniSidebar === true) {
        this.data.sideBar.forEach((mainMenus: mainMenus) => {
          mainMenus.menu.forEach((resMenu: MenuItem) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      // <* to expand submenu while hover toggled side menu*>
      if (res === true && this.miniSidebar === true)
      {
        this.data.sideBar.forEach((mainMenus: mainMenu) => {
          mainMenus.menu.forEach((resMenu: MenuItem) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
      if(res === 'true' && this.autohide === true)
      {
        this.miniSidebar = false;
      }
      else if(res === 'false' && this.autohide === true)
      {
        this.miniSidebar = true;
      }
    });
    // <* to check session time *>
    this.sessionOut();
    // <* to check session time *>
  }

  ngOnDestroy(): void
  {
    sessionStorage.clear();
  }

  private sessionOut(): void
  {
    const loginTime: Date|string = localStorage.getItem('timeOut') ?? Date();
    const timeOut: Date = new Date(loginTime); // convert to date object

    if (new Date().getHours() > timeOut.getHours())
    {
      this.auth.logout();
    }
  }
}
