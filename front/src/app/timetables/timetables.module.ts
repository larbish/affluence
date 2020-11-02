import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SavedTableComponent } from './saved-table/saved-table.component';
import { TimetablesComponent } from './timetables.component';
import { TimetablesService } from './timetables.service';
import { UploadTableComponent } from './upload-table/upload-table.component';

const routes: Routes = [{ path: '', component: TimetablesComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule, NgbNavModule],
	declarations: [TimetablesComponent, SavedTableComponent, UploadTableComponent],
	providers: [TimetablesService],
})
export class TimetablesModule {}
