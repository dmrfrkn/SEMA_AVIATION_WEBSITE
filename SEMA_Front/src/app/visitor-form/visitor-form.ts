import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'visitor-form',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './visitor-form.html',
	styleUrls: ['./visitor-form.scss']
})
export class VisitorFormComponent {
	name: string = '';
	email: string = '';
	phone: string = '';
	@Output() formCompleted = new EventEmitter<void>();

	submitForm() {
		if (this.name && this.email && this.phone) {
			this.formCompleted.emit();
		}
	}
}
