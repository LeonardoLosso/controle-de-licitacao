import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { inject } from "@angular/core";

import { UserService } from "./services/user.service";

export const authGuard = () => {
    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.estaLogado()) {
        return true;
    } else {
        router.navigate(['auth/login']);
        return false;
    }
};

export const loginGuard = () => {
    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.estaLogado()) {
        router.navigate(['/']);
        return false;
    } else return true;
};

export const permGuard = (route: ActivatedRouteSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);
    const recursoId = route.data['recursoId'];

    if (!userService.verificaPermissao(recursoId)) {
        router.navigate(['/']);
        return false;
    } else {
        return true;
    }
};