# The Luma - Müşteri Kurulum, Mülkiyet ve Proje Teslim Rehberi

Merhaba İlayda Hanım,

Web sitenizin tüm mülkiyetinin (barındırma/sunucu, admin paneli ve iletişim formu) tamamen sizin adınıza ve resmi şirket e-postanız üzerine tescil edilmesi, projenin eksiksiz şekilde size devredilmesi için aşağıdaki 3 kısa işlemi tamamlamanızı rica ediyoruz.

> **🔒 Güvenlik Güvencesi:**  
> E-posta şifrenizi veya hesap parolalarınızı **kesinlikle bizimle paylaşmanıza gerek yoktur.** Sadece sistemlerin size otomatik olarak üreteceği genel bağlantı anahtarlarını (Token / Key) iletmeniz yeterlidir.

---

## 1. Web Sitesi Barındırma & Sunucu (Vercel)
**Amacı:** Web sitenizin 7/24 kesintisiz, hızlı ve güvenli olarak internette yayınlanacağı sunucudur. Sitenin tüm sunucu mülkiyeti ve alan adınız (`thelumaa.com.tr`) tamamen sizin hesabınızda barınacaktır.

### Adım Adım Ne Yapılacak?
1. **Kayıt Olun:** [https://vercel.com/signup](https://vercel.com/signup) adresine gidin.
2. Resmi e-posta adresinizle (örn: `info@thelumaa.com.tr` veya Google ile) ücretsiz hesap oluşturun (**Continue with Email / Google**).
3. Plan sorarsa **"Hobby" (Kişisel / Ücretsiz)** seçeneğini seçin. İsim olarak "The Luma" veya adınızı yazabilirsiniz.
4. **Bağlantı Anahtarını (Token) Alın:**
   - Doğrudan şu bağlantıyı açın: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)  
     *(Veya sağ üstteki profil resminize tıklayıp **Settings** -> sol menüden **Tokens** sayfasına girin).*
   - **"Create Token"** butonuna tıklayın.
   - İsim (Token Name) kutusuna: `The Luma Deploy` yazın.
   - **Expiration (Süre)** seçeneğinde: **"No Expiration"** (Süresiz) veya **"1 Year"** (1 Yıl) seçin *(kurulum ve gelecekteki güncellemelerin kesintiye uğramaması için)*.
   - **"Create"** butonuna basın.
   - Ekranda beliren uzun Token kodunu kopyalayın.

*📌 **Bize İletilecek Bilgi:** Vercel Token*

---

## 2. İletişim Formu (Web3Forms)
**Amacı:** Web sitesindeki iletişim formundan müşterilerin doldurduğu mesajların (Ad-Soyad, E-posta, Telefon, Konu ve Mesaj) doğrudan gelen kutunuza düşmesini sağlar.

### Adım Adım Ne Yapılacak?
1. **Bağlantıya Gidin:** [https://web3forms.com](https://web3forms.com) adresini açın.
2. Sayfanın ortasındaki kutucuğa form bildirimlerinin gelmesini istediğiniz e-posta adresinizi yazın.
3. Yanındaki **"Create your Access Key"** butonuna tıklayın.
4. E-postanıza gelen onay mailini açın.
5. Mailin içindeki **Access Key** kodunu kopyalayın.

*📌 **Bize İletilecek Bilgi:** Web3Forms Access Key*

---

## 3. İçerik ve Blog Yönetim Paneli (Sanity CMS)
**Amacı:** Sitedeki blog yazılarını, atölye/workshop takvimini ve fotoğrafları hiçbir teknik kodlama bilmeden kendi panelinizden kolayca yönetebilmeniz içindir.

### Adım Adım Ne Yapılacak?
1. **Kayıt Olun:** [https://www.sanity.io/get-started](https://www.sanity.io/get-started) adresinden e-postanızla ücretsiz üye olun.
2. **Yönetim Paneline Geçin:** [https://sanity.io/manage](https://sanity.io/manage) adresini açın.
3. Sağ üstteki **"Create project"** butonuna tıklayın, proje adı olarak **"The Luma"** yazıp onaylayın.
4. Açılan projenin sayfasında sol üstte göreceğiniz **Project ID** (örnek: `r5fc2yyx` gibi bir kod) değerini kopyalayın.
5. (İsteğe bağlı): Üstteki **"API"** sekmesine tıklayın, **"Tokens"** bölümünden **"Add API token"** butonuna basın. İsme `Website`, yetkiye `Editor` verip oluşturulan Token'ı kopyalayın.

*📌 **Bize İletilecek Bilgi:** Sanity Project ID (ve varsa API Token)*

---

## 📋 Bize İletilecek Özet Şablon

İşlemleri tamamladıktan sonra aşağıdaki 3 maddeyi bize iletmeniz yeterlidir:

```text
1. Vercel Token:         [TANIMLANDI ✅ - lumailayda@gmail.com]
2. Web3Forms Access Key: [TANIMLANDI ✅]
3. Sanity Project ID:    r5fc2yyx [HAZIR ✅]
```

Bu 3 anahtarı bize ilettiğinizde projenizin tüm dosyaları ve kurulumu tek seferde doğrudan sizin Vercel sunucunuza yüklenecek ve site tamamen sizin üzerinizden yayına girmiş olacaktır.
