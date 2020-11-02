import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TimetablesComponent } from './timetables.component';
import { TimetablesService } from './timetables.service';

describe('TimetablesComponent', () => {
	let component: TimetablesComponent;
	let fixture: ComponentFixture<TimetablesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
			declarations: [TimetablesComponent],
			providers: [TimetablesService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TimetablesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
