/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet><ngx-spinner-pages></ngx-spinner-pages></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private menuService: NbMenuService,public authService: AuthService,private router:Router
    ) {
    
  }

  ngOnInit(): void {
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });

    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
  onContecxtItemSelection(title) {
    if(title=="Log out")
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      }
      else {
        console.log("faild..")
      }
    }
    );

  }


}
