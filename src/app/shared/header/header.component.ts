import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/autenticacao/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuName!: string;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { 
  }
  user$ = this.userService.retornarUser();

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getChild(this.activatedRoute);
        route.data.subscribe(data => {
          this.menuName = data['menuName'];
        });
      });
  }

  retornaNome(): string{
    let userName = "";
    this.user$.subscribe(user => userName = user?.userName ?? "");
    return userName
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['auth/login']);
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
