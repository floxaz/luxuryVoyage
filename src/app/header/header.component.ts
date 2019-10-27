import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isHome: boolean;
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                if(event.url !== '/') {
                    this.isHome = false;
                } else {
                    this.isHome = true;
                }
            }
        })
    }
}