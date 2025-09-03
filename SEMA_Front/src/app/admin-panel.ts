import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Visitor {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  registrationDate: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.scss']
})
export class AdminPanelComponent implements OnInit {
  username: string = '';
  visitors: Visitor[] = [];
  selectedVisitor: Visitor | null = null;
  isEditing: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Admin girişi kontrolü
    if (!sessionStorage.getItem('isAdmin')) {
      this.router.navigate(['/admin-login']);
      return;
    }
    
    this.username = sessionStorage.getItem('adminUser') || 'Admin';
    this.loadVisitors();
  }

  loadVisitors() {
    // Local storage'dan ziyaretçi verilerini yükle
    const visitorsData = localStorage.getItem('visitors');
    if (visitorsData) {
      this.visitors = JSON.parse(visitorsData);
    }
  }

  editVisitor(visitor: Visitor) {
    this.selectedVisitor = { ...visitor };
    this.isEditing = true;
  }

  saveVisitor() {
    if (this.selectedVisitor) {
      const index = this.visitors.findIndex(v => v.id === this.selectedVisitor!.id);
      if (index !== -1) {
        this.visitors[index] = { ...this.selectedVisitor };
        localStorage.setItem('visitors', JSON.stringify(this.visitors));
      }
      this.cancelEdit();
    }
  }

  deleteVisitor(id: number) {
    if (confirm('Bu ziyaretçiyi silmek istediğinizden emin misiniz?')) {
      this.visitors = this.visitors.filter(v => v.id !== id);
      localStorage.setItem('visitors', JSON.stringify(this.visitors));
    }
  }

  cancelEdit() {
    this.selectedVisitor = null;
    this.isEditing = false;
  }

  logout() {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminUser');
    this.router.navigate(['/']);
  }
}
