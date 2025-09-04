import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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
	@Output() adminLoginRequested = new EventEmitter<void>();

	constructor(private visitorService: VisitorService, private router: Router) {}

	submitForm() {
		if (this.fullName && this.email && this.phone && this.kvkkConsent) {
			const visitor = {
				fullName: this.fullName,
				email: this.email,
				phone: this.phone,
				kvkkConsent: this.kvkkConsent
			};

			// localStorage için ayrı bir obje oluştur (ID ve tarih ile)
			const visitorForStorage = {
				id: Date.now(),
				...visitor,
				registrationDate: new Date().toLocaleDateString('tr-TR')
			};

			// localStorage'a kaydet
			const existingVisitors = JSON.parse(localStorage.getItem('visitors') || '[]');
			existingVisitors.push(visitorForStorage);
			localStorage.setItem('visitors', JSON.stringify(existingVisitors));

			// API'ye de gönder
			this.visitorService.addVisitor(visitor).subscribe({
				next: () => {
					this.formCompleted.emit();
				},
				error: (err) => {
					// API hatası olsa bile localStorage'a kaydedildiği için devam et
					console.warn('API hatası:', err);
					this.formCompleted.emit();
				}
			});
		}
	}

	goToAdminLogin() {
		console.log('Admin button clicked - using event emit');
		this.adminLoginRequested.emit();
	}
}
