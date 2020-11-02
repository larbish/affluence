import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerHostPreInterceptor } from './components/http-interceptors/server-host.pre-interceptor';
import { HttpExampleService } from './components/http-services/http-example.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [AppComponent, HomeComponent, HeaderComponent],
	imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
	// Http Pre Interceptor used to set server host at each http call
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ServerHostPreInterceptor, multi: true },
		HttpExampleService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
