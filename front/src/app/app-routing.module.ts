import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
	},
	{
		path: 'timetables',
		loadChildren: () => import('./timetables/timetables.module').then((m) => m.TimetablesModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
