import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  counters = [
    { label: 'Tamamlanan Proje', value: 12, animatedValue: 0 },
    { label: 'Kazanılan Ödül', value: 7, animatedValue: 0 },
    { label: 'Takım Üyesi', value: 18, animatedValue: 0 },
    { label: 'Uçuş Testi', value: 34, animatedValue: 0 }
  ];

  ngOnInit() {
    this.animateCounters();
  }

  animateCounters() {
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
