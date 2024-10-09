/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, DataService, routes } from 'src/app/core/core.index';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { ApiService } from 'src/app/core/services/api/api.service';


interface SubMenu {
  menuValue: string;
  route?: string;
  base?: string;
  showSubRoute?: boolean;
}

interface url{
  url:string
}

interface SubMenuItem {
  sub_menu_id: number;
  main_menu_id: number;
  tittle: string;
  route: string;
  base: string;
  separateRoute: number;
  menuValue: string;
  icon: string;
  showAsTab: number;
  can_view: number;
  can_edit: number;
  can_delete: number;
  user_group: number;
  status: number | boolean;
}
interface MenuItem {
  menu_group_id: number;
  menuValue: string;
  route: string;
  icon: string;
  hasSubRoute: number;
  showSubRoute: string;
  base: string;
  can_view: boolean | number;
  can_edit: boolean | number;
  can_delete: boolean | number;
  user_group: number;
  status: boolean | number;
  sub_menu?: SubMenuItem[];
}
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnDestroy {
  public routes = routes;
  public mobileSidebar = false;

  base = 'dashboard';
  page = '';
  last = '';
  currentRoute = '';

  side_bar_data:any[] = [];
  user_type = localStorage.getItem('type_id');
  constructor(
    public router: Router,
    private data: DataService,
    private sideBar: SideBarService,
    private auth: AuthService,
    public api:ApiService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.sideBar.toggleMobileSideBar.subscribe((res:string) => {
      if (res == "true") {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });

    this.api.get('menu_items1.php?user_group='+this.user_type).then((data = []) =>
    {

      this.side_bar_data = data;

        return true;
    }).catch(error =>
    {
        console.log('Login Page : ', error);
    });

  }

 async hasActiveSubMenu(menu: MenuItem) {
    return menu.sub_menu ? menu.sub_menu.some(subMenu => subMenu.status === 1 || subMenu.status === true) : false;
  }

  // menu_selection()
  // {
  //   this.side_bar_data
  //   array.forEach(this.side_bar_data => {

  //   });
  // }


  private getRoutes(route: url): void {
    const splitVal = route.url.split('/');
    this.currentRoute = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];

  }

  async miniSideBarMouseHover(position: string) {
    if (position == 'over') {
      this.sideBar.expandSideBar.next("true");
    } else {
      this.sideBar.expandSideBar.next("false");
    }
  }

  async expandSubMenus(menu: SubMenu): Promise<void> {
    // Save the selected menu value in session storage
    sessionStorage.setItem('menuValue', menu.menuValue);

        for (const mainMenus of this.side_bar_data) {
          if (mainMenus.menu != null) {

            for (const resMenu of mainMenus.menu) {

              if (resMenu.menuValue === menu.menuValue) {
                resMenu.showSubRoute = !resMenu.showSubRoute;
                resMenu.showSubRoute = true;
              } else {
                resMenu.showSubRoute = false;
              }
            }
          }
        }

  }


  async navigateAuth(menu: any, submenu : any)
  {
    localStorage.setItem('can_view', submenu.can_view);
    localStorage.setItem('can_edit', submenu.can_edit);
    localStorage.setItem('can_delete', submenu.can_delete);
    if (menu.menuValue == 'Authentication') localStorage.removeItem('authenticated');
  }

  ngOnDestroy(): void {
    this.sideBar.resetMiniSidebar();
  }
  public logOut(): void {
    this.auth.logout();
  }
}
