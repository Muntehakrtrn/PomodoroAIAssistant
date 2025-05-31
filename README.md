# PomodoroAIAssistant
## Proje Hakkında

**Pomodoro AI Asistan**, kısa çalışma ve mola sürelerinin (“Pomodoro Tekniği”) verimini artırmak için geliştirilmiş bir uygulamadır.
Uygulama, Electron platformu üzerinde çalışır ve aşağıdaki sunar:

- 25 dakikalık çalışma / 5 dakikalık mola döngüsü  
- Yapay zekâ destekli motivasyon cümleleri  
- Her günün tarihi ve anlamının hatırlatılması  
- Kişisel haftalık / günlük çalışma planı oluşturma ve kaydetme  
- NoSQL (NeDB) ile “etüt” sayısı takibi  
- JSON yedekleme (store.json)  
- SQLite tabanlı **sessions** tablosu ile CRUD işlemleri (db.js)  

Uygulamayı başarıyla kullanabilenler:
- Düzenli çalışma alışkanlığı kazanır,  
- Öz düzenleme ve zaman yönetimi becerilerini geliştirir,  
- Teknolojik okuryazarlık bilgisi artar.
- 
## Özellikler

1. **Pomodoro Zamanlayıcısı**  
   - 25 dakikalık “Çalışma” periyodu  
   - 5 dakikalık “Mola” periyodu  
   - Süre bittiğinde otomatik mod geçişi ve sesli uyarı  
   - “Başlat”, “Durdur” ve “Sıfırla” butonları ile kontrol  

2. **Motivasyon Cümleleri**  
   - JSON dosyasından çekilen motivasyon cümleleri  
   - Uygulama açıldığında rastgele bir cümle gösterimi  
   - Cümlenin her gün otomatik olarak değişmesi  

3. **Tarihin Önemi Hatırlatmaları**  
   - Anlamlı günler listesi (CSV veya JSON)  
   - Tarih ile ilgili önemli bilgilerin kullanıcıya sunulması  
   - Özel günlerde ek uyarılar  

4. **Kişisel Çalışma Planı**  
   - Kullanıcıdan alınan haftalık / günlük plan verisi  
   - Planların veritabanına kaydedilmesi  
   - Kayıtlı planların listelenmesi, güncelleme ve silme  
   - “Plan Formu” ile kolay veri girişi  

5. **Etüt Sayısı Takibi (NoSQL - NeDB)**  
   - Her Pomodoro (25dk) tamamlandığında “etüt” sayısını bir NeDB veritabanına kaydeder  
   - Uygulama açıldığında toplam etüt sayısını gösterir  
   - “Etüt Sıfırla” butonu ile kayıtlı etüt sayısını temizleme  

6. **Veri Kalıcılığı (SQLite + JSON)**  
   - `sessions` tablosu (SQLite)  
   - CRUD operasyonları: `createSession()`, `getSessions()`, `clearSessions()`  
   - JSON tabanlı store dosyası: `store.js`, `store.json`  
   - Hem NeDB hem SQLite yedekleme desteği  

7. **Katmanlı Mimari & Tasarım Desenleri**  
   - **Data Katmanı**: `src/data/nedbStore.js`, `src/data/db.js`, `src/data/store.js`  
   - **Business Katmanı**: `src/business/timer.js` (Observer Deseni - EventEmitter)  
   - **Presentation Katmanı**: `src/presentation/index.html`, `src/presentation/app.js`  
   - Tasarım desenleri: Observer, DAO (Repository), Singleton (DB bağlantısı), Module Pattern  

