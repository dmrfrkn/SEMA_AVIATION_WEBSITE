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

interface SiteContent {
  banner: {
    show: boolean;
    text: string;
  };
  counters: Array<{
    label: string;
    value: number;
  }>;
  projects: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
  }>;
  team: {
    description: string;
    image: string;
  };
  news: Array<{
    id: number;
    title: string;
    content: string;
    date: string;
  }>;
  contact: {
    email: string;
    instagram: string;
  };
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
  activeTab: string = 'visitors';
  siteContent: SiteContent = {
    banner: { show: true, text: '' },
    counters: [],
    projects: [],
    team: { description: '', image: '' },
    news: [],
    contact: { email: '', instagram: '' }
  };
  selectedProject: any = null;
  selectedNews: any = null;
  isEditingProject: boolean = false;
  isEditingNews: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Admin girişi kontrolü
    if (!sessionStorage.getItem('isAdmin')) {
      this.router.navigate(['/admin-login']);
      return;
    }
    
    this.username = sessionStorage.getItem('adminUser') || 'Admin';
    this.loadVisitors();
    this.loadSiteContent();
  }

  loadSiteContent() {
    // Site içeriğini localStorage'dan yükle veya varsayılan değerler ata
    const content = localStorage.getItem('siteContent');
    if (content) {
      this.siteContent = JSON.parse(content);
    } else {
      // Varsayılan içerik
      this.siteContent = {
        banner: {
          show: true,
          text: 'SEMA Aviation, Teknofest 2026 finalinde! Takımımıza başarılar dileriz.'
        },
        counters: [
          { label: 'Tamamlanan Proje', value: 8 },
          { label: 'Kazanılan Ödül', value: 2 },
          { label: 'Takım Üyesi', value: 30 },
          { label: 'Uçuş Testi', value: 22 }
        ],
        projects: [
          { id: 1, title: 'İHA Geliştirme Projesi', description: 'Otonom uçuş sistemli İHA', image: 'assets/project1.jpg' },
          { id: 2, title: 'Drone Yarışı', description: 'Hız ve manevra yarışı', image: 'assets/project2.jpeg' }
        ],
        team: {
          description: 'SEMA Aviation, İstanbul Medeniyet Üniversitesi bünyesinde kurulmuş dinamik bir havacılık takımıdır.',
          image: 'assets/takim_foto.jpeg'
        },
        news: [
          { id: 1, title: 'Teknofest 2026 Finali', content: 'Takımımız finale kaldı!', date: new Date().toISOString() }
        ],
        contact: {
          email: 'semaaviation23@gmail.com',
          instagram: '@semaaviation'
        }
      };
      this.saveSiteContent();
    }
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
    this.selectedProject = null;
    this.selectedNews = null;
    this.isEditingProject = false;
    this.isEditingNews = false;
  }

  // Site içerik yönetim metodları
  saveSiteContent() {
    localStorage.setItem('siteContent', JSON.stringify(this.siteContent));
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Banner yönetimi
  toggleBanner() {
    this.siteContent.banner.show = !this.siteContent.banner.show;
    this.saveSiteContent();
  }

  updateBannerText() {
    this.saveSiteContent();
  }

  // Counter yönetimi
  updateCounter(index: number) {
    this.saveSiteContent();
  }

  // Proje yönetimi
  addProject() {
    const newProject = {
      id: Date.now(),
      title: 'Yeni Proje',
      description: 'Proje açıklaması',
      image: 'assets/project1.jpg'
    };
    this.siteContent.projects.push(newProject);
    this.selectedProject = { ...newProject };
    this.isEditingProject = true;
  }

  editProject(project: any) {
    this.selectedProject = { ...project };
    this.isEditingProject = true;
  }

  saveProject() {
    if (this.selectedProject) {
      const index = this.siteContent.projects.findIndex(p => p.id === this.selectedProject.id);
      if (index !== -1) {
        this.siteContent.projects[index] = { ...this.selectedProject };
      }
      this.saveSiteContent();
      this.cancelEdit();
    }
  }

  deleteProject(id: number) {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      this.siteContent.projects = this.siteContent.projects.filter(p => p.id !== id);
      this.saveSiteContent();
    }
  }

  // Haber yönetimi
  addNews() {
    const newNews = {
      id: Date.now(),
      title: 'Yeni Haber',
      content: 'Haber içeriği',
      date: new Date().toISOString()
    };
    this.siteContent.news.push(newNews);
    this.selectedNews = { ...newNews };
    this.isEditingNews = true;
  }

  editNews(news: any) {
    this.selectedNews = { ...news };
    this.isEditingNews = true;
  }

  saveNews() {
    if (this.selectedNews) {
      const index = this.siteContent.news.findIndex(n => n.id === this.selectedNews.id);
      if (index !== -1) {
        this.siteContent.news[index] = { ...this.selectedNews };
      }
      this.saveSiteContent();
      this.cancelEdit();
    }
  }

  deleteNews(id: number) {
    if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      this.siteContent.news = this.siteContent.news.filter(n => n.id !== id);
      this.saveSiteContent();
    }
  }

  // Takım ve iletişim güncelleme
  updateTeamInfo() {
    this.saveSiteContent();
  }

  updateContactInfo() {
    this.saveSiteContent();
  }

  logout() {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminUser');
    this.router.navigate(['/']);
  }
}
