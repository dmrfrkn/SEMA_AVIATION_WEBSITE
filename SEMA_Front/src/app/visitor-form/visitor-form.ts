import { Component, Output, EventEmitter } from '@angular/core';
import { VisitorService } from './visitor.service';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'visitor-form',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './visitor-form.html',
	styleUrls: ['./visitor-form.scss']
})
export class VisitorFormComponent {
	fullName: string = '';
	email: string = '';
	phone: string = '';
	kvkkConsent: boolean = false;
	@Output() formCompleted = new EventEmitter<void>();

	constructor(private visitorService: VisitorService) {}

	submitForm() {
		if (this.fullName && this.email && this.phone && this.kvkkConsent) {
			const visitor = {
				fullName: this.fullName,
				email: this.email,
				phone: this.phone,
				kvkkConsent: this.kvkkConsent,
				createdAt: new Date().toISOString()
			};
			this.visitorService.addVisitor(visitor).subscribe({
				next: () => {
					this.formCompleted.emit();
				},
				error: (err) => {
					alert('Ziyaretçi kaydı başarısız: ' + err.message);
				}
			});
		}
	}
}
