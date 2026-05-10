import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import {AppFloatingConfigurator} from "@/app/layout/component/app.floatingconfigurator";

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, AppFloatingConfigurator],
    template: `        <a class="flex items-center cursor-pointer" (click)="router.navigate(['/landing'])">
            <img src="/demo/images/galleria/logo.png" alt="TuPisoYa Logo" class="h-16 md:h-24 mr-20">
        </a>

        <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:hidden!" pStyleClass="@next" enterFromClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
            <i class="pi pi-bars text-2xl!"></i>
        </a>

        <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/landing'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary-500 transition-colors">
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/nosotros'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary-500 transition-colors">
                        <span>Nosotros</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/servicios'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary-500 transition-colors">
                        <span>Servicios</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/contacto'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary-500 transition-colors">
                        <span>Contacto</span>
                    </a>
                </li>
            </ul>
            <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                <button pButton pRipple label="Iniciar Sesión" routerLink="/login" [rounded]="true" [text]="true"></button>
                <button pButton pRipple label="Registrarse" routerLink="/register" [rounded]="true"></button>
                <app-floating-configurator [float]="false"/>
            </div>
        </div> `
})
export class TopbarWidget {
    constructor(public router: Router) {}
}
