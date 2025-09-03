import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VisitorFormComponent } from './visitor-form/visitor-form';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, VisitorFormComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  visitorFormCompleted = false;
  showBanner = true;
  isAdminPage = false;
  counters = [
    { label: 'Tamamlanan Proje', value: 8, animatedValue: 8 },
    { label: 'Kazanılan Ödül', value: 2, animatedValue: 2 },
    { label: 'Takım Üyesi', value: 30, animatedValue: 30 },
    { label: 'Uçuş Testi', value: 22, animatedValue: 22 }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.animateCounters();
    
    // Route değişikliklerini dinle
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminPage = event.url.includes('/admin');
        console.log('Route changed:', event.url, 'isAdminPage:', this.isAdminPage);
      });
      
    // İlk yüklemede de kontrol et
    this.isAdminPage = this.router.url.includes('/admin');
  }

  onVisitorFormCompleted() {
    this.visitorFormCompleted = true;
  }

	onGoToAdminLogin() {
		console.log('Ana component admin login navigation');
		console.log('Current route:', this.router.url);
		
		// Overlay'i kapat ve admin login'e git
		this.visitorFormCompleted = true;
		
		// Route değiştir
		this.router.navigate(['/admin-login']).then(
			(success) => {
				console.log('Navigation successful:', success);
				console.log('New route:', this.router.url);
			},
			(error) => {
				console.error('Navigation failed:', error);
			}
		);
	}

	isAdminRoute(): boolean {
		return this.isAdminPage;
	}  animateCounters() {
    this.counters.forEach((counter, idx) => {
      const duration = 1200; // ms
      const frameRate = 24;
      const totalFrames = Math.round(duration / (1000 / frameRate));
      let frame = 0;
      const increment = counter.value / totalFrames;
      const interval = setInterval(() => {
        frame++;
        counter.animatedValue = Math.round(increment * frame);
        if (frame >= totalFrames) {
          counter.animatedValue = counter.value;
          clearInterval(interval);
        }
      }, 1000 / frameRate);
    });
  }
  blogPosts = [
    {
      title: 'SEMA Aviation Teknofest 2025 Hazırlıkları',
      desc: 'Takımımız Teknofest 2025 için yeni İHA prototipleri ve otonom sistemler üzerinde çalışıyor. Gelişmeleri buradan takip edebilirsiniz.',
      date: '30 Ağustos 2025',
      link: ''
    },
    {
      title: 'Yarışma Başarılarımız',
      desc: '2024 ve 2025 yıllarında elde ettiğimiz ödüller ve yarışma deneyimlerimiz hakkında detaylar.',
      date: '15 Temmuz 2025',
      link: ''
    },
    {
      title: 'Yeni Takım Üyeleri Aranıyor!',
      desc: 'SEMA Aviation ekibine katılmak ister misin? Başvuru detayları ve aranan pozisyonlar için tıkla.',
      date: '1 Haziran 2025',
      link: ''
    },
    {
      title: 'Otonom Uçuş Testi Başarıyla Tamamlandı',
      desc: 'Takımımız, yeni geliştirdiği otonom İHA ile ilk uçuş testini başarıyla tamamladı. Detaylar için blogumuzu takip edin.',
      date: '20 Mayıs 2025',
      link: ''
    },
    {
      title: 'SEMA Aviation’dan Sosyal Sorumluluk Projesi',
      desc: 'Gençlere havacılık sevgisi aşılamak için düzenlediğimiz sosyal sorumluluk projemiz büyük ilgi gördü.',
      date: '10 Nisan 2025',
      link: ''
    }
  ];
  faqs = [
    { q: 'SEMA Aviation hangi alanlarda faaliyet gösteriyor?', a: 'İnsansız hava araçları, otonom sistemler ve havacılık teknolojileri alanında faaliyet göstermekteyiz.' },
    { q: 'Takıma nasıl katılabilirim?', a: 'Başvuru dönemlerinde sosyal medya hesaplarımızdan veya iletişim formumuzdan başvuru yapabilirsiniz.' },
    { q: 'Projelerinizde hangi teknolojiler kullanılıyor?', a: 'Otonom kontrol, yapay zekâ, görüntü işleme, gömülü yazılım ve havacılık elektroniği gibi teknolojiler kullanıyoruz.' },
    { q: 'Yarışmalara katılım için sponsorluk desteği alıyor musunuz?', a: 'Evet, sponsorluk desteği ile projelerimizi daha ileriye taşıyoruz. İletişim bölümünden bize ulaşabilirsiniz.' }
  ];
  openedFaq: number | null = null;
  openedProject: number | null = null;
  // Proje galerisi için görseller ve index (sadece nesne tipli)
  galleryImages = [
    {
      src: 'assets/project1.jpg',
      title: 'Savaşan İHA Yarışması 2024',
      desc: '2024 Savaşan İHA Yarışması’nda takımımızın geliştirdiği otonom İHA.'
    },
    {
      src: 'assets/project2.jpeg',
      title: 'Hava Savunma Sistemleri 2025',
      desc: '2025 Hava Savunma Sistemleri Yarışması’nda sergilenen savunma projemiz.'
    },
    {
      src: 'assets/project3.jpeg',
      title: 'Savaşan İHA Yarışması 2025',
      desc: '2025 Savaşan İHA Yarışması’nda otonom ve yapay zekâ tabanlı İHA’mız.'
    },
    {
      src: 'assets/project4.jpeg',
      title: 'Uluslararası İHA Yarışması 2025',
      desc: '2025 Uluslararası İHA Yarışması’nda sergilenen insansız hava aracı projemiz.'
    }
  ];
  galleryIndex = 0;
}
