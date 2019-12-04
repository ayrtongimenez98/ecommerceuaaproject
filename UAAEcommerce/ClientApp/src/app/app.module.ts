import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SiteModule } from './site/site.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule, MatDividerModule, MatTabsModule, MatTreeModule, MatSidenavModule } from '@angular/material';
import { CarouselComponent } from './site/carousel/carousel.component';
import { BeersComponent } from './site/beers/beers.component';
import { BarComponent } from './site/bar/bar.component'
import { CerveceriaComponent } from './site/cerveceria/cerveceria.component';
import {AdminGuard} from './guards/admin.guard';
import { PageNotFoundComponent } from './site/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    BeersComponent,
    BarComponent,
    PageNotFoundComponent,
    CerveceriaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", loadChildren: "./site/site.module#SiteModule", pathMatch: "full" },
      { path: '**', component: PageNotFoundComponent }
    ], { anchorScrolling: "enabled", scrollPositionRestoration:"enabled" }),
    SiteModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUDOXaYOjdWCMXZR4t8RRNCWzRLhA21zk'
    }),
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatTreeModule,
    MatSidenavModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
