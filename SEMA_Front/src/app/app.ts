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
