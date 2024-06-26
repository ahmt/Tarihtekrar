import React, { useState, useEffect } from 'react';
import './componentscss/Question.css';
import { db, auth } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const questions = [
  
    {
      "id": 1,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin bilinen ilk yazılı belgeleri hangi devlete aittir?",
      "options": ["Göktürkler", "Hunlar", "Uygurlar", "Selçuklular", "Avarlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 2,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orhun Abideleri hangi Türk devletine aittir?",
      "options": ["Göktürkler", "Hunlar", "Uygurlar", "Kırgızlar", "Avarlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 3,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türkler arasında bilinen ilk devlet kurucusu kimdir?",
      "options": ["Bilge Kağan", "Mete Han", "Attila", "Bumin Kağan", "Tonyukuk"],
      "correct": "Mete Han"
  },
  {
      "id": 4,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Uygurların başkenti neresidir?",
      "options": ["Ordu-Balık", "Ötüken", "Buhara", "Kaşgar", "Semerkand"],
      "correct": "Ordu-Balık"
  },
  {
      "id": 5,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin kullandığı ilk alfabe hangisidir?",
      "options": ["Göktürk alfabesi", "Uygur alfabesi", "Arap alfabesi", "Latin alfabesi", "Kiril alfabesi"],
      "correct": "Göktürk alfabesi"
  },
  {
    "id": 6,
    "topic": "İlk Müslüman Türk Devletleri",
    "question": "İlk Müslüman Türk devleti hangisidir?",
    "options": ["Karahanlılar", "Gazneliler", "Selçuklular", "Harzemşahlar", "Eyyubiler"],
    "correct": "Karahanlılar"
},
{
    "id": 7,
    "topic": "İlk Müslüman Türk Devletleri",
    "question": "Karahanlılar devletinin kurucusu kimdir?",
    "options": ["Bilge Kağan", "Mete Han", "Saltuk Buğra Han", "Alparslan", "Tuğrul Bey"],
    "correct": "Saltuk Buğra Han"
},
{
    "id": 8,
    "topic": "İlk Müslüman Türk Devletleri",
    "question": "Gazneliler Devleti en parlak dönemini hangi hükümdar zamanında yaşamıştır?",
    "options": ["Gazneli Mahmud", "Tuğrul Bey", "Alparslan", "Sultan Sencer", "Melikşah"],
    "correct": "Gazneli Mahmud"
},
{
    "id": 9,
    "topic": "İlk Müslüman Türk Devletleri",
    "question": "Karahanlılar döneminde yapılan ünlü medrese hangisidir?",
    "options": ["Samarra Medresesi", "Semerkand Medresesi", "Kaşgar Medresesi", "Buhara Medresesi", "Nişabur Medresesi"],
    "correct": "Semerkand Medresesi"
},
{
    "id": 10,
    "topic": "İlk Müslüman Türk Devletleri",
    "question": "Gazneli Mahmud'un ünvanı nedir?",
    "options": ["Şah", "Sultan", "Han", "Hakan", "Emir"],
    "correct": "Sultan"
},{
  "id": 11,
  "topic": "Osmanlı Devleti Siyasi",
  "question": "Osmanlı Devleti hangi tarihte kurulmuştur?",
  "options": ["1299", "1453", "1071", "1517", "1683"],
  "correct": "1299"
},
{
  "id": 12,
  "topic": "Osmanlı Devleti Siyasi",
  "question": "Osmanlı Devleti'nin kurucusu kimdir?",
  "options": ["Osman Gazi", "Orhan Gazi", "Yavuz Sultan Selim", "Kanuni Sultan Süleyman", "Fatih Sultan Mehmet"],
  "correct": "Osman Gazi"
},
{
  "id": 13,
  "topic": "Osmanlı Devleti Siyasi",
  "question": "Osmanlı Devleti'nde Yükselme Dönemi hangi padişah döneminde başlamıştır?",
  "options": ["Fatih Sultan Mehmet", "Yavuz Sultan Selim", "Kanuni Sultan Süleyman", "II. Bayezid", "I. Selim"],
  "correct": "Fatih Sultan Mehmet"
},
{
  "id": 14,
  "topic": "Osmanlı Devleti Siyasi",
  "question": "Osmanlı Devleti'nin ilk başkenti neresidir?",
  "options": ["Söğüt", "Bursa", "Edirne", "İstanbul", "Ankara"],
  "correct": "Bursa"
},
{
  "id": 15,
  "topic": "Osmanlı Devleti Siyasi",
  "question": "Osmanlı Devleti'nde en uzun süre tahtta kalan padişah kimdir?",
  "options": ["Kanuni Sultan Süleyman", "II. Abdülhamid", "I. Süleyman", "IV. Murad", "I. Ahmed"],
  "correct": "Kanuni Sultan Süleyman"
},
{
  "id": 16,
  "topic": "Osmanlı Devleti Kültür ve Uygarlık",
  "question": "Osmanlı Devleti'nde ilk anayasası olan Kanun-i Esasi hangi yıl ilan edilmiştir?",
  "options": ["1876", "1908", "1923", "1839", "1919"],
  "correct": "1876"
},
{
  "id": 17,
  "topic": "Osmanlı Devleti Kültür ve Uygarlık",
  "question": "Osmanlı Devleti'nde 'Lale Devri' hangi padişah döneminde yaşanmıştır?",
  "options": ["III. Ahmed", "II. Osman", "IV. Murad", "I. Mahmud", "I. Abdülhamid"],
  "correct": "III. Ahmed"
},
{
  "id": 18,
  "topic": "Osmanlı Devleti Kültür ve Uygarlık",
  "question": "Osmanlı Devleti'nde ilk matbaa hangi tarihte kurulmuştur?",
  "options": ["1492", "1727", "1808", "1848", "1922"],
  "correct": "1727"
},
{
  "id": 19,
  "topic": "Osmanlı Devleti Kültür ve Uygarlık",
  "question": "Osmanlı Devleti'nde yapılan en ünlü cami hangisidir?",
  "options": ["Ayasofya", "Süleymaniye", "Selimiye", "Fatih", "Sultanahmet"],
  "correct": "Süleymaniye"
},
{
  "id": 20,
  "topic": "Osmanlı Devleti Kültür ve Uygarlık",
  "question": "Osmanlı Devleti'nde 'Divan-ı Hümayun' hangi padişah döneminde kurulmuştur?",
  "options": ["Orhan Gazi", "I. Murad", "Fatih Sultan Mehmet", "Yavuz Sultan Selim", "Kanuni Sultan Süleyman"],
  "correct": "Orhan Gazi"
},
{
  "id": 21,
  "topic": "Kurtuluş Savaşı Hazırlık Dönemi",
  "question": "Amasya Genelgesi hangi tarihte yayınlanmıştır?",
  "options": ["1919", "1920", "1921", "1922", "1923"],
  "correct": "1919"
},
{
  "id": 22,
  "topic": "Kurtuluş Savaşı Hazırlık Dönemi",
  "question": "Erzurum Kongresi'nin toplanma amacı nedir?",
  "options": ["Bağımsızlık için mücadele planı yapmak", "Yeni anayasa hazırlamak", "Saltanatı güçlendirmek", "Müttefiklerle anlaşmak", "İç isyanları bastırmak"],
  "correct": "Bağımsızlık için mücadele planı yapmak"
},
{
  "id": 23,
  "topic": "Kurtuluş Savaşı Hazırlık Dönemi",
  "question": "Sivas Kongresi'nde alınan önemli karar nedir?",
  "options": ["Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyetlerinin birleşmesi", "Yeni bir hükümet kurulması", "İstanbul'un işgali", "Sevr Antlaşması'nın imzalanması", "TBMM'nin açılması"],
  "correct": "Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyetlerinin birleşmesi"
},
{
  "id": 24,
  "topic": "Kurtuluş Savaşı Hazırlık Dönemi",
  "question": "Mustafa Kemal Atatürk, Samsun'a hangi tarihte çıkmıştır?",
  "options": ["19 Mayıs 1919", "23 Nisan 1920", "29 Ekim 1923", "1 Kasım 1922", "30 Ağustos 1922"],
  "correct": "19 Mayıs 1919"
},
{
  "id": 25,
  "topic": "Kurtuluş Savaşı Hazırlık Dönemi",
  "question": "Amasya Genelgesi'nde belirtilen 'Vatanın bütünlüğü, milletin bağımsızlığı tehlikededir' kararı hangi amaçla alınmıştır?",
  "options": ["Halkı bilinçlendirmek", "Yeni devlet kurmak", "Saltanatı güçlendirmek", "İç isyanları bastırmak", "İtilaf Devletleri ile anlaşmak"],
  "correct": "Halkı bilinçlendirmek"
},
{
  "id": 26,
  "topic": "Kurtuluş Savaşı Cepheleri",
  "question": "İnönü Savaşları hangi cephede yapılmıştır?",
  "options": ["Batı Cephesi", "Doğu Cephesi", "Güney Cephesi", "Kafkas Cephesi", "Kanal Cephesi"],
  "correct": "Batı Cephesi"
},
{
  "id": 27,
  "topic": "Kurtuluş Savaşı Cepheleri",
  "question": "Kurtuluş Savaşı'nda ilk zafer hangi cephede kazanılmıştır?",
  "options": ["Doğu Cephesi", "Batı Cephesi", "Güney Cephesi", "Kafkas Cephesi", "Çanakkale Cephesi"],
  "correct": "Doğu Cephesi"
},
{
  "id": 28,
  "topic": "Kurtuluş Savaşı Cepheleri",
  "question": "Sakarya Meydan Muharebesi'nin önemi nedir?",
  "options": ["İlk büyük taarruz", "Ankara'nın savunulması", "İstanbul'un işgali", "İzmir'in kurtarılması", "Sevr Antlaşması'nın imzalanması"],
  "correct": "Ankara'nın savunulması"
},
{
  "id": 29,
  "topic": "Kurtuluş Savaşı Cepheleri",
  "question": "Büyük Taarruz hangi tarihte gerçekleşmiştir?",
  "options": ["26 Ağustos 1922", "29 Ekim 1923", "19 Mayıs 1919", "23 Nisan 1920", "1 Kasım 1922"],
  "correct": "26 Ağustos 1922"
},
{
  "id": 30,
  "topic": "Kurtuluş Savaşı Cepheleri",
  "question": "Kurtuluş Savaşı'nda, Maraş, Antep ve Urfa hangi cephe ile ilgilidir?",
  "options": ["Güney Cephesi", "Batı Cephesi", "Doğu Cephesi", "Kafkas Cephesi", "Trakya Cephesi"],
  "correct": "Güney Cephesi"
},
{
  "id": 31,
  "topic": "Devrim Tarihi",
  "question": "Türk Tarih Kurumu hangi yıl kurulmuştur?",
  "options": ["1931", "1923", "1928", "1940", "1935"],
  "correct": "1931"
},
{
  "id": 32,
  "topic": "Devrim Tarihi",
  "question": "Soyadı Kanunu hangi yıl çıkarılmıştır?",
  "options": ["1934", "1928", "1923", "1931", "1945"],
  "correct": "1934"
},
{
  "id": 33,
  "topic": "Devrim Tarihi",
  "question": "Medeni Kanun hangi tarihte kabul edilmiştir?",
  "options": ["1926", "1923", "1934", "1931", "1928"],
  "correct": "1926"
},
{
  "id": 34,
  "topic": "Devrim Tarihi",
  "question": "Tevhid-i Tedrisat Kanunu'nun amacı nedir?",
  "options": ["Eğitimde birlik sağlamak", "Yeni okullar açmak", "Üniversite kurmak", "Öğretmen yetiştirmek", "Askeri okulları kapatmak"],
  "correct": "Eğitimde birlik sağlamak"
},
{
  "id": 35,
  "topic": "Devrim Tarihi",
  "question": "Şapka Kanunu hangi yıl kabul edilmiştir?",
  "options": ["1925", "1930", "1923", "1928", "1934"],
  "correct": "1925"
},
{
  "id": 36,
  "topic": "Atatürk Dönemi İç ve Dış Politika",
  "question": "Lozan Antlaşması hangi yıl imzalanmıştır?",
  "options": ["1923", "1919", "1920", "1922", "1938"],
  "correct": "1923"
},
{
  "id": 37,
  "topic": "Atatürk Dönemi İç ve Dış Politika",
  "question": "Atatürk'ün 'Yurtta sulh, cihanda sulh' sözü hangi olay ile ilgilidir?",
  "options": ["Barış politikası", "Savaş ilanı", "Ekonomik reform", "Eğitim reformu", "Sanayi hamlesi"],
  "correct": "Barış politikası"
},
{
  "id": 38,
  "topic": "Atatürk Dönemi İç ve Dış Politika",
  "question": "Türkiye Cumhuriyeti'nin ilk dış ilişkisi hangi devlet ile olmuştur?",
  "options": ["İngiltere", "Fransa", "SSCB", "Yunanistan", "İtalya"],
  "correct": "SSCB"
},
{
  "id": 39,
  "topic": "Atatürk Dönemi İç ve Dış Politika",
  "question": "Hatay'ın Türkiye'ye katılması hangi yıl gerçekleşmiştir?",
  "options": ["1939", "1936", "1933", "1930", "1928"],
  "correct": "1939"
},
{
  "id": 40,
  "topic": "Atatürk Dönemi İç ve Dış Politika",
  "question": "Balkan Antantı hangi yıl imzalanmıştır?",
  "options": ["1934", "1923", "1938", "1945", "1928"],
  "correct": "1934"
},
{
  "id": 41,
  "topic": "Atatürk İlkeleri",
  "question": "Cumhuriyetçilik ilkesi neyi ifade eder?",
  "options": ["Halkın egemenliği", "Ekonomik bağımsızlık", "Eğitimde birlik", "Sosyal adalet", "Milli egemenlik"],
  "correct": "Halkın egemenliği"
},
{
  "id": 42,
  "topic": "Atatürk İlkeleri",
  "question": "Laiklik ilkesi hangi alanda uygulanmıştır?",
  "options": ["Din ve devlet işleri", "Ekonomi", "Askeri düzen", "Eğitim", "Kültür"],
  "correct": "Din ve devlet işleri"
},
{
  "id": 43,
  "topic": "Atatürk İlkeleri",
  "question": "Devletçilik ilkesi neyi savunur?",
  "options": ["Devletin ekonomide etkin rol oynaması", "Özel sektörün serbest bırakılması", "Eğitimde reform", "Sosyal adalet", "Milli egemenlik"],
  "correct": "Devletin ekonomide etkin rol oynaması"
},
{
  "id": 44,
  "topic": "Atatürk İlkeleri",
  "question": "Halkçılık ilkesi hangi amacı taşır?",
  "options": ["Sosyal adaletin sağlanması", "Din ve devlet işlerinin ayrılması", "Ekonomik bağımsızlık", "Eğitimde birlik", "Halkın egemenliği"],
  "correct": "Sosyal adaletin sağlanması"
},
{
  "id": 45,
  "topic": "Atatürk İlkeleri",
  "question": "İnkılapçılık ilkesi neyi ifade eder?",
  "options": ["Sürekli yenilik ve ilerleme", "Eğitimde reform", "Milli egemenlik", "Ekonomik bağımsızlık", "Din ve devlet işlerinin ayrılması"],
  "correct": "Sürekli yenilik ve ilerleme"
},
{
  "id": 46,
  "topic": "Çağdaş Türk ve Dünya Tarihi",
  "question": "Birinci Dünya Savaşı hangi yıl sona ermiştir?",
  "options": ["1918", "1914", "1923", "1939", "1945"],
  "correct": "1918"
},
{
  "id": 47,
  "topic": "Çağdaş Türk ve Dünya Tarihi",
  "question": "NATO hangi yıl kurulmuştur?",
  "options": ["1949", "1945", "1955", "1960", "1939"],
  "correct": "1949"
},
{
  "id": 48,
  "topic": "Çağdaş Türk ve Dünya Tarihi",
  "question": "Berlin Duvarı hangi yıl yıkılmıştır?",
  "options": ["1989", "1985", "1991", "1990", "1975"],
  "correct": "1989"
},
{
  "id": 49,
  "topic": "Çağdaş Türk ve Dünya Tarihi",
  "question": "Türkiye hangi yılda Avrupa Birliği'ne tam üyelik için başvuruda bulunmuştur?",
  "options": ["1987", "1999", "2004", "1963", "1974"],
  "correct": "1987"
},
{
  "id": 50,
  "topic": "Çağdaş Türk ve Dünya Tarihi",
  "question": "Soğuk Savaş dönemi hangi olayla başlamıştır?",
  "options": ["İkinci Dünya Savaşı'nın sona ermesi", "Berlin Duvarı'nın inşası", "Küba Krizi", "NATO'nun kurulması", "Truman Doktrini"],
  "correct": "Truman Doktrini"
},

  {
      "id": 51,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin bilinen ilk yazılı belgeleri hangi devlete aittir?",
      "options": ["Hunlar", "Göktürkler", "Uygurlar", "Selçuklular", "Avarlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 52,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türk tarihinde ilk defa 'Türk' adını resmi olarak kullanan devlet hangisidir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Kırgızlar", "Hazarlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 53,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orhun Yazıtları hangi Türk devletine aittir?",
      "options": ["Hunlar", "Göktürkler", "Uygurlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 54,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Tarihte bilinen ilk Türk devleti hangisidir?",
      "options": ["Hunlar", "Göktürkler", "Uygurlar", "Avarlar", "Kırgızlar"],
      "correct": "Hunlar"
  },
  {
      "id": 55,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türk tarihinde ilk defa para basan devlet hangisidir?",
      "options": ["Göktürkler", "Hunlar", "Uygurlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 56,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Göktürk Devleti'nin kurucusu kimdir?",
      "options": ["Mete Han", "Bumin Kağan", "Bilge Kağan", "Atilla", "Tonyukuk"],
      "correct": "Bumin Kağan"
  },
  {
      "id": 57,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerde yazılı hukuk kurallarının uygulandığı ilk devlet hangisidir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Uygurlar"
  },
  {
      "id": 58,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin en eski dini inanışlarından biri olan Gök Tanrı inancı hangi devlet döneminde yoğun olarak görülmüştür?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 59,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Çin Seddi hangi Türk kavminin saldırılarına karşı yapılmıştır?",
      "options": ["Hunlar", "Göktürkler", "Uygurlar", "Avarlar", "Kırgızlar"],
      "correct": "Hunlar"
  },
  {
      "id": 60,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orhun Abideleri'nde hangi Türk hükümdarının öğütlerine yer verilmiştir?",
      "options": ["Tonyukuk", "Bilge Kağan", "Mete Han", "Bumin Kağan", "Kürşad"],
      "correct": "Bilge Kağan"
  },
  {
      "id": 61,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Tarihte Türk adıyla kurulan ilk devlet hangisidir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 62,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Hun İmparatorluğu'nun en ünlü hükümdarı kimdir?",
      "options": ["Atilla", "Bumin Kağan", "Mete Han", "Bilge Kağan", "Tonyukuk"],
      "correct": "Atilla"
  },
  {
      "id": 63,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "İlk Türk alfabesi olan Orhun alfabesi hangi devlete aittir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 64,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Hunlar ile ilgili aşağıdakilerden hangisi yanlıştır?",
      "options": ["Hunlar Orta Asya'da kuruldu.", "Hunların kurucusu Mete Han'dır.", "Hunlar Gök Tanrı inancına sahiptir.", "Hunlar Çin Seddi'ni yapmıştır.", "Hunlar Asya Hun Devleti olarak da bilinir."],
      "correct": "Hunlar Çin Seddi'ni yapmıştır."
  },
  {
      "id": 65,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Uygurların kendilerine özgü alfabeleri olan Uygur alfabesini kullanmalarının nedeni nedir?",
      "options": ["Göktürk alfabesini unutmaları", "Budizm'i benimsemeleri", "Arap etkisi", "Mani dinini benimsemeleri", "Çin alfabesinden etkilenmeleri"],
      "correct": "Mani dinini benimsemeleri"
  },
  {
      "id": 66,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Uygurların merkezi neresidir?",
      "options": ["Ordu-Balık", "Ötüken", "Balasagun", "Karakurum", "Kaşgar"],
      "correct": "Ordu-Balık"
  },
  {
      "id": 67,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türk tarihinin en önemli kahramanlık destanlarından biri olan Ergenekon Destanı hangi Türk devletine aittir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 68,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin İpek Yolu ticaretinde önemli bir role sahip olmasını sağlayan devlet hangisidir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 69,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Bumin Kağan tarafından kurulan devlet hangisidir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 70,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Göktürk Yazıtları'nda hangi Türk devlet adamının öğütleri yer alır?",
      "options": ["Bilge Kağan", "Tonyukuk", "Mete Han", "Bumin Kağan", "Atilla"],
      "correct": "Tonyukuk"
  },
  {
      "id": 71,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Tarihteki ilk Türk hükümdarı olarak kabul edilen kişi kimdir?",
      "options": ["Teoman", "Mete Han", "Bumin Kağan", "Bilge Kağan", "Atilla"],
      "correct": "Teoman"
  },
  {
      "id": 72,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Köktürklerin resmi din olarak kabul ettiği dini inanış hangisidir?",
      "options": ["Gök Tanrı", "Budizm", "Şamanizm", "Maniheizm", "Zerdüştlük"],
      "correct": "Gök Tanrı"
  },
  {
      "id": 73,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orhun Abideleri'nde kimlerin kahramanlıkları anlatılmıştır?",
      "options": ["Bilge Kağan ve Tonyukuk", "Mete Han ve Atilla", "Bumin Kağan ve Bilge Kağan", "Teoman ve Mete Han", "Bumin Kağan ve Tonyukuk"],
      "correct": "Bilge Kağan ve Tonyukuk"
  },
  {
      "id": 74,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin yerleşik hayata geçişini başlatan Türk devleti hangisidir?",
      "options": ["Uygurlar", "Göktürkler", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Uygurlar"
  },
  {
      "id": 75,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Tarihte ilk defa İstanbul'u kuşatan Türk devleti hangisidir?",
      "options": ["Avarlar", "Göktürkler", "Hunlar", "Uygurlar", "Hazarlar"],
      "correct": "Avarlar"
  },
  {
      "id": 76,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin İslamiyet'i kabul eden ilk büyük Türk devleti hangisidir?",
      "options": ["Göktürkler", "Karahanlılar", "Hunlar", "Avarlar", "Uygurlar"],
      "correct": "Karahanlılar"
  },
  {
      "id": 77,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orta Asya'da kurulan ilk Türk devleti hangisidir?",
      "options": ["Hunlar", "Göktürkler", "Uygurlar", "Avarlar", "Kırgızlar"],
      "correct": "Hunlar"
  },
  {
      "id": 78,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin bilinen ilk milli alfabesi hangisidir?",
      "options": ["Göktürk alfabesi", "Uygur alfabesi", "Orhun alfabesi", "Kiril alfabesi", "Latin alfabesi"],
      "correct": "Göktürk alfabesi"
  },
  {
      "id": 79,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "İlk defa şehir devletleri kuran Türk devleti hangisidir?",
      "options": ["Uygurlar", "Göktürkler", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Uygurlar"
  },
  {
      "id": 80,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orta Asya'da demir işçiliğiyle ünlü olan Türk devleti hangisidir?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 81,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Asya Hun İmparatorluğu'nun kurucusu kimdir?",
      "options": ["Teoman", "Mete Han", "Bumin Kağan", "Bilge Kağan", "Atilla"],
      "correct": "Teoman"
  },
  {
      "id": 82,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türk tarihinde önemli bir yere sahip olan Kürşad Ayaklanması hangi devlet döneminde olmuştur?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 83,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türk tarihinde ilk defa kağıt parayı kullanan devlet hangisidir?",
      "options": ["Uygurlar", "Göktürkler", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Uygurlar"
  },
  {
      "id": 84,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orta Asya Türk kavimleri arasında Budizm'i benimseyen ilk devlet hangisidir?",
      "options": ["Uygurlar", "Göktürkler", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Uygurlar"
  },
  {
      "id": 85,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Göktürk Devleti'nin en parlak dönemi hangi hükümdar döneminde yaşanmıştır?",
      "options": ["Bilge Kağan", "Mete Han", "Bumin Kağan", "Tonyukuk", "Kürşad"],
      "correct": "Bilge Kağan"
  },
  {
      "id": 86,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "İslamiyet’ten önceki Türk devletlerinde devletin başındaki kişiye ne ad verilirdi?",
      "options": ["Kağan", "Padişah", "Hakan", "Sultan", "Han"],
      "correct": "Kağan"
  },
  {
      "id": 87,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orta Asya'da yaşamış Türk kavimlerinin ortak özelliklerinden biri hangisidir?",
      "options": ["Göçebe yaşam tarzı", "Tarım yapmaları", "Denizcilikle uğraşmaları", "Büyük şehirler kurmaları", "Büyük kütüphaneler inşa etmeleri"],
      "correct": "Göçebe yaşam tarzı"
  },
  {
      "id": 88,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Uygurlar hangi alanda diğer Türk devletlerinden daha ileri bir seviyeye ulaşmışlardır?",
      "options": ["Tarım", "Askeri", "Sanayi", "Ticaret", "Denizcilik"],
      "correct": "Tarım"
  },
  {
      "id": 89,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "İlk Türk devletlerinde yazılı hukuk kuralları yerine ne tür kurallar uygulanırdı?",
      "options": ["Töre", "Yasa", "Kanun", "Nizam", "Ferman"],
      "correct": "Töre"
  },
  {
      "id": 90,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Hunların Batı'ya göç etmelerinin temel nedeni nedir?",
      "options": ["Çin baskısı", "Kuraklık", "İç karışıklıklar", "Kavimler Göçü", "Tarım alanlarının azalması"],
      "correct": "Çin baskısı"
  },
  {
      "id": 91,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin tarih boyunca en çok mücadele ettikleri devletlerden biri olan Çin, hangi Türk devletine karşı başarılı olamamıştır?",
      "options": ["Göktürkler", "Uygurlar", "Hunlar", "Avarlar", "Kırgızlar"],
      "correct": "Göktürkler"
  },
  {
      "id": 92,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Göktürk Yazıtları'nda hangi dil kullanılmıştır?",
      "options": ["Türkçe", "Çince", "Moğolca", "Farsça", "Arapça"],
      "correct": "Türkçe"
  },
  {
      "id": 93,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Asya Hun Devleti hangi hükümdar döneminde en geniş sınırlara ulaşmıştır?",
      "options": ["Mete Han", "Teoman", "Bumin Kağan", "Bilge Kağan", "Tonyukuk"],
      "correct": "Mete Han"
  },
  {
      "id": 94,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Uygurların Maniheizm dinini kabul etmelerinin en önemli sonucu nedir?",
      "options": ["Göçebe hayattan yerleşik hayata geçmeleri", "Çin ile ilişkilerini geliştirmeleri", "Askeri güçlerini artırmaları", "İpek Yolu'na hakim olmaları", "Demircilik faaliyetlerini artırmaları"],
      "correct": "Göçebe hayattan yerleşik hayata geçmeleri"
  },
  {
      "id": 95,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerde toy adı verilen kurultaylar ne amaçla düzenlenirdi?",
      "options": ["Devlet işlerini görüşmek", "Dini törenler yapmak", "Spor karşılaşmaları düzenlemek", "Eğitim faaliyetleri yürütmek", "Evlilik törenleri gerçekleştirmek"],
      "correct": "Devlet işlerini görüşmek"
  },
  {
      "id": 96,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Türklerin yaşadıkları coğrafyanın zorlu koşulları nedeniyle hangi meslekte ustalaştıkları söylenebilir?",
      "options": ["Demircilik", "Tarım", "Denizcilik", "Ticaret", "Mimarlık"],
      "correct": "Demircilik"
  },
  {
      "id": 97,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Aşağıdaki Türk devletlerinden hangisi diğerlerinden daha geç tarihlerde kurulmuştur?",
      "options": ["Hazarlar", "Göktürkler", "Hunlar", "Uygurlar", "Avarlar"],
      "correct": "Hazarlar"
  },
  {
      "id": 98,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Kavimler Göçü sonrasında Avrupa'da hangi büyük imparatorluk yıkılmıştır?",
      "options": ["Batı Roma İmparatorluğu", "Doğu Roma İmparatorluğu", "Bizans İmparatorluğu", "Kutsal Roma Cermen İmparatorluğu", "Osmanlı İmparatorluğu"],
      "correct": "Batı Roma İmparatorluğu"
  },
  {
      "id": 99,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Orta Asya'da kurulan ilk Türk devleti olarak bilinen Hunlar, hangi hükümdar döneminde en güçlü dönemlerini yaşamışlardır?",
      "options": ["Mete Han", "Teoman", "Bumin Kağan", "Bilge Kağan", "Tonyukuk"],
      "correct": "Mete Han"
  },
  {
      "id": 100,
      "topic": "İslamiyet’ten Önceki Türk Devletleri",
      "question": "Göktürk Devleti'nin yıkılmasında etkili olan başlıca faktör nedir?",
      "options": ["Çin entrikaları", "İç karışıklıklar", "Kuraklık", "Göçebe yaşam tarzı", "Kavimler Göçü"],
      "correct": "Çin entrikaları"
  },
  
    {
        "id": 101,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar devletinin kurucusu kimdir?",
        "options": ["Bilge Kağan", "Mete Han", "Saltuk Buğra Han", "Alparslan", "Tuğrul Bey"],
        "correct": "Saltuk Buğra Han"
    },
    {
        "id": 102,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler Devleti hangi hükümdar döneminde en geniş sınırlara ulaşmıştır?",
        "options": ["Tuğrul Bey", "Alparslan", "Sultan Mahmud", "Bilge Kağan", "Satuk Buğra Han"],
        "correct": "Sultan Mahmud"
    },
    {
        "id": 103,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin kurucusu kimdir?",
        "options": ["Tuğrul Bey", "Alparslan", "Bilge Kağan", "Satuk Buğra Han", "Sultan Mahmud"],
        "correct": "Tuğrul Bey"
    },
    {
        "id": 104,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Selçuklular hangi savaşla Anadolu'nun kapılarını Türklere açmıştır?",
        "options": ["Malazgirt", "Dandanakan", "Talus", "Pasinler", "Miryokefalon"],
        "correct": "Malazgirt"
    },
    {
        "id": 105,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneli Mahmud hangi unvanı alarak İslam dünyasında tanınmıştır?",
        "options": ["Sultan", "Han", "Hakan", "Kağan", "Emir"],
        "correct": "Sultan"
    },
    {
        "id": 106,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlı Devleti'nin resmi dili nedir?",
        "options": ["Arapça", "Farsça", "Türkçe", "Çince", "Moğolca"],
        "correct": "Türkçe"
    },
    {
        "id": 107,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin en parlak dönemi hangi hükümdar döneminde yaşanmıştır?",
        "options": ["Tuğrul Bey", "Melikşah", "Alparslan", "Sultan Mahmud", "Satuk Buğra Han"],
        "correct": "Melikşah"
    },
    {
        "id": 108,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Anadolu'da kurulan ilk Türk beyliği hangisidir?",
        "options": ["Danişmentliler", "Mengücekler", "Saltuklular", "Artuklular", "Karahanlılar"],
        "correct": "Saltuklular"
    },
    {
        "id": 109,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Selçuklu Devleti'nin yıkılmasında etkili olan en önemli faktör nedir?",
        "options": ["Haçlı Seferleri", "Moğol İstilası", "İç Karışıklıklar", "İpek Yolu'nun kapanması", "Büyük Göçler"],
        "correct": "Moğol İstilası"
    },
    {
        "id": 110,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin başkenti neresidir?",
        "options": ["Rey", "Nişabur", "Merv", "Buhara", "Gazne"],
        "correct": "Rey"
    },
    {
        "id": 111,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar, İslamiyet'i hangi hükümdar döneminde resmen kabul etmişlerdir?",
        "options": ["Satuk Buğra Han", "Sultan Mahmud", "Tuğrul Bey", "Bilge Kağan", "Mete Han"],
        "correct": "Satuk Buğra Han"
    },
    {
        "id": 112,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler Devleti'nin yıkılmasına neden olan en büyük tehdit nedir?",
        "options": ["Selçuklu Baskısı", "Moğol İstilası", "Haçlı Seferleri", "Karahanlı Saldırıları", "Mısır Fetihleri"],
        "correct": "Selçuklu Baskısı"
    },
    {
        "id": 113,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Selçuklu Devleti'nin ünlü veziri kimdir?",
        "options": ["Nizamülmülk", "Tuğrul Bey", "Alparslan", "Sultan Mahmud", "Satuk Buğra Han"],
        "correct": "Nizamülmülk"
    },
    {
        "id": 114,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar hangi dönemde İslamiyet'i kabul etmiştir?",
        "options": ["Satuk Buğra Han", "Mete Han", "Tuğrul Bey", "Alparslan", "Sultan Mahmud"],
        "correct": "Satuk Buğra Han"
    },
    {
        "id": 115,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Malazgirt Savaşı'nın önemi nedir?",
        "options": ["Anadolu'nun kapıları Türklere açıldı", "İstanbul fethedildi", "İran fethedildi", "Kudüs alındı", "Mısır fethedildi"],
        "correct": "Anadolu'nun kapıları Türklere açıldı"
    },
    {
        "id": 116,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneli Mahmud'un Hindistan'a düzenlediği seferlerin amacı nedir?",
        "options": ["Hindistan'ı İslamlaştırmak", "Hindistan'ı yağmalamak", "Hindistan'ı sömürgeleştirmek", "Hindistan'ı keşfetmek", "Hindistan'ı müttefik yapmak"],
        "correct": "Hindistan'ı İslamlaştırmak"
    },
    {
        "id": 117,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin en önemli bilim adamı kimdir?",
        "options": ["Nizamülmülk", "Ömer Hayyam", "Tuğrul Bey", "Sultan Mahmud", "Satuk Buğra Han"],
        "correct": "Ömer Hayyam"
    },
    {
        "id": 118,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar hangi coğrafyada hüküm sürmüştür?",
        "options": ["Orta Asya", "Anadolu", "İran", "Mısır", "Hindistan"],
        "correct": "Orta Asya"
    },
    {
        "id": 119,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler Devleti'nin yıkılmasında etkili olan savaş hangisidir?",
        "options": ["Dandanakan", "Malazgirt", "Pasinler", "Miryokefalon", "Yassıçemen"],
        "correct": "Dandanakan"
    },
    {
        "id": 120,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin en güçlü zamanında hükümdarı kimdi?",
        "options": ["Alparslan", "Tuğrul Bey", "Sultan Mahmud", "Bilge Kağan", "Satuk Buğra Han"],
        "correct": "Alparslan"
    },
    {
        "id": 121,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneli Mahmud hangi unvanı almıştır?",
        "options": ["Sultan", "Han", "Hakan", "Kağan", "Emir"],
        "correct": "Sultan"
    },
    {
        "id": 122,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin çöküşü hangi savaşla başlamıştır?",
        "options": ["Katvan", "Dandanakan", "Malazgirt", "Miryokefalon", "Pasinler"],
        "correct": "Katvan"
    },
    {
        "id": 123,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin resmi dili nedir?",
        "options": ["Farsça", "Türkçe", "Arapça", "Çince", "Moğolca"],
        "correct": "Farsça"
    },
    {
        "id": 124,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler Devleti'nin merkezi neresidir?",
        "options": ["Gazne", "Rey", "Nişabur", "Merv", "Buhara"],
        "correct": "Gazne"
    },
    {
        "id": 125,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin yıkılmasının ana sebebi nedir?",
        "options": ["Haçlı Seferleri", "Moğol İstilası", "İç Karışıklıklar", "İpek Yolu'nun kapanması", "Büyük Göçler"],
        "correct": "Moğol İstilası"
    },
    {
        "id": 126,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar Devleti'nin yıkılmasında hangi devlet etkili olmuştur?",
        "options": ["Gazneliler", "Selçuklular", "Harzemşahlar", "Moğollar", "Timur"],
        "correct": "Gazneliler"
    },
    {
        "id": 127,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar hangi bölgede egemenlik kurmuştur?",
        "options": ["Orta Asya", "Anadolu", "İran", "Mısır", "Hindistan"],
        "correct": "Orta Asya"
    },
    {
        "id": 128,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler hangi coğrafyada hüküm sürmüştür?",
        "options": ["Hindistan", "Anadolu", "İran", "Orta Asya", "Mısır"],
        "correct": "Hindistan"
    },
    {
        "id": 129,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Selçuklu Devleti'nin en ünlü veziri kimdir?",
        "options": ["Nizamülmülk", "Tuğrul Bey", "Alparslan", "Sultan Mahmud", "Satuk Buğra Han"],
        "correct": "Nizamülmülk"
    },
    {
        "id": 130,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin kurucusu kimdir?",
        "options": ["Tuğrul Bey", "Alparslan", "Bilge Kağan", "Satuk Buğra Han", "Sultan Mahmud"],
        "correct": "Tuğrul Bey"
    },
    {
        "id": 131,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar döneminde inşa edilen ve İslam mimarisinin önemli eserlerinden biri olan yapı hangisidir?",
        "options": ["Ribat-ı Melik", "Ayasofya", "Kervansaray", "Süleymaniye Camii", "Tac Mahal"],
        "correct": "Ribat-ı Melik"
    },
    {
        "id": 132,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Selçukluların İslam dünyasına katkılarından biri olan Nizamiye Medreseleri hangi dönemde kurulmuştur?",
        "options": ["Melikşah", "Tuğrul Bey", "Alparslan", "Sultan Mahmud", "Satuk Buğra Han"],
        "correct": "Melikşah"
    },
    {
        "id": 133,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneli Mahmud'un Hindistan'a düzenlediği seferlerin amacı nedir?",
        "options": ["Hindistan'ı İslamlaştırmak", "Hindistan'ı yağmalamak", "Hindistan'ı sömürgeleştirmek", "Hindistan'ı keşfetmek", "Hindistan'ı müttefik yapmak"],
        "correct": "Hindistan'ı İslamlaştırmak"
    },
    {
        "id": 134,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin en önemli bilim adamı kimdir?",
        "options": ["Ömer Hayyam", "Nizamülmülk", "Tuğrul Bey", "Sultan Mahmud", "Satuk Buğra Han"],
        "correct": "Ömer Hayyam"
    },
    {
        "id": 135,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Selçuklular hangi savaşla Anadolu'nun kapılarını Türklere açmıştır?",
        "options": ["Malazgirt", "Dandanakan", "Talus", "Pasinler", "Miryokefalon"],
        "correct": "Malazgirt"
    },
    {
        "id": 136,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin en güçlü zamanında hükümdarı kimdi?",
        "options": ["Alparslan", "Tuğrul Bey", "Sultan Mahmud", "Bilge Kağan", "Satuk Buğra Han"],
        "correct": "Alparslan"
    },
    {
        "id": 137,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar hangi dönemde İslamiyet'i kabul etmiştir?",
        "options": ["Satuk Buğra Han", "Mete Han", "Tuğrul Bey", "Alparslan", "Sultan Mahmud"],
        "correct": "Satuk Buğra Han"
    },
    {
        "id": 138,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler Devleti'nin merkezi neresidir?",
        "options": ["Gazne", "Rey", "Nişabur", "Merv", "Buhara"],
        "correct": "Gazne"
    },
    {
        "id": 139,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Malazgirt Savaşı'nın önemi nedir?",
        "options": ["Anadolu'nun kapıları Türklere açıldı", "İstanbul fethedildi", "İran fethedildi", "Kudüs alındı", "Mısır fethedildi"],
        "correct": "Anadolu'nun kapıları Türklere açıldı"
    },
    {
        "id": 140,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin çöküşü hangi savaşla başlamıştır?",
        "options": ["Katvan", "Dandanakan", "Malazgirt", "Miryokefalon", "Pasinler"],
        "correct": "Katvan"
    },
    {
        "id": 141,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneli Mahmud hangi unvanı almıştır?",
        "options": ["Sultan", "Han", "Hakan", "Kağan", "Emir"],
        "correct": "Sultan"
    },
    {
        "id": 142,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin başkenti neresidir?",
        "options": ["Rey", "Nişabur", "Merv", "Buhara", "Gazne"],
        "correct": "Rey"
    },
    {
        "id": 143,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar, İslamiyet'i hangi hükümdar döneminde resmen kabul etmişlerdir?",
        "options": ["Satuk Buğra Han", "Sultan Mahmud", "Tuğrul Bey", "Bilge Kağan", "Mete Han"],
        "correct": "Satuk Buğra Han"
    },
    {
        "id": 144,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler Devleti'nin yıkılmasında etkili olan savaş hangisidir?",
        "options": ["Dandanakan", "Malazgirt", "Pasinler", "Miryokefalon", "Yassıçemen"],
        "correct": "Dandanakan"
    },
    {
        "id": 145,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar hangi coğrafyada hüküm sürmüştür?",
        "options": ["Orta Asya", "Anadolu", "İran", "Mısır", "Hindistan"],
        "correct": "Orta Asya"
    },
    {
        "id": 146,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler Devleti'nin yıkılmasında hangi devlet etkili olmuştur?",
        "options": ["Selçuklular", "Gazneliler", "Harzemşahlar", "Moğollar", "Timur"],
        "correct": "Selçuklular"
    },
    {
        "id": 147,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin ünlü veziri kimdir?",
        "options": ["Nizamülmülk", "Tuğrul Bey", "Alparslan", "Sultan Mahmud", "Satuk Buğra Han"],
        "correct": "Nizamülmülk"
    },
    {
        "id": 148,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Gazneliler hangi coğrafyada hüküm sürmüştür?",
        "options": ["Hindistan", "Anadolu", "İran", "Orta Asya", "Mısır"],
        "correct": "Hindistan"
    },
    {
        "id": 149,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Büyük Selçuklu Devleti'nin kurucusu kimdir?",
        "options": ["Tuğrul Bey", "Alparslan", "Bilge Kağan", "Satuk Buğra Han", "Sultan Mahmud"],
        "correct": "Tuğrul Bey"
    },
    {
        "id": 150,
        "topic": "İlk Müslüman Türk Devletleri",
        "question": "Karahanlılar hangi bölgede egemenlik kurmuştur?",
        "options": ["Orta Asya", "Anadolu", "İran", "Mısır", "Hindistan"],
        "correct": "Orta Asya"
    }



















  
];
const topicCounts = {
  "İslamiyet’ten Önceki Türk Devletleri": 1,
  "İlk Müslüman Türk Devletleri": 2,
  "Osmanlı Devleti Siyasi": 6,
  "Osmanlı Devleti Kültür ve Uygarlık": 3,
  "Kurtuluş Savaşı Hazırlık Dönemi": 4,
  "Kurtuluş Savaşı Cepheleri": 3,
  "Devrim Tarihi": 2,
  "Atatürk Dönemi İç ve Dış Politika": 2,
  "Atatürk İlkeleri": 1,
  "Çağdaş Türk ve Dünya Tarihi": 3
};

const getRandomQuestions = (selectedTopic) => {
  if (selectedTopic) {
    return questions.filter(q => q.topic === selectedTopic);
  } else {
    let selectedQuestions = [];
    Object.keys(topicCounts).forEach(topic => {
      const topicQuestions = questions.filter(q => q.topic === topic);
      const count = topicCounts[topic];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * topicQuestions.length);
        selectedQuestions.push(topicQuestions[randomIndex]);
        topicQuestions.splice(randomIndex, 1); // Seçilen soruyu listeden çıkar
      }
    });
    return selectedQuestions;
  }
};

const Question = ({ selectedTopic }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState(getRandomQuestions(selectedTopic));
  const [sessionScore, setSessionScore] = useState({ correct: 0, incorrect: 0 });
  const [answered, setAnswered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User logged in:', currentUser);
        setUser(currentUser);
      } else {
        console.log('User logged out');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    
    setQuestionsList(getRandomQuestions(selectedTopic));
    setCurrentQuestionIndex(0);
  }, [selectedTopic]);

  const saveScoreToFirebase = async (userId, topic, isCorrect) => {
    const topicRef = doc(db, 'scores', userId, 'topics', topic);
    const topicSnap = await getDoc(topicRef);

    if (topicSnap.exists()) {
      const topicData = topicSnap.data();
      const updatedData = isCorrect
        ? { correct: topicData.correct + 1 }
        : { incorrect: topicData.incorrect + 1 };

      await updateDoc(topicRef, updatedData);
    } else {
      const newData = isCorrect
        ? { correct: 1, incorrect: 0 }
        : { correct: 0, incorrect: 1 };

      await setDoc(topicRef, newData);
    }
  };

  const currentQuestion = questionsList[currentQuestionIndex];

  const handleAnswer = async (option) => {
    if (answered) return;

    const newSessionScore = { ...sessionScore };
    const isCorrect = option === currentQuestion.correct;

    if (isCorrect) {
      newSessionScore.correct += 1;
      toast.success('Doğru cevap!');
    } else {
      newSessionScore.incorrect += 1;
      toast.error('Yanlış cevap.');
    }
    setSessionScore(newSessionScore);

    if (user) {
      await saveScoreToFirebase(user.uid, currentQuestion.topic, isCorrect);
    }

    setAnswered(true);
    setTimeout(() => {
      setAnswered(false);
      setCurrentQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex >= questionsList.length) {
          toast.info('Tüm sorular tamamlandı!');
          return 0; // Sorular bitince yeniden başlatmak için
        }
        return nextIndex;
      });
    }, 1000);
  };

  return (
    <div>
      <div className="score">
        <p>Doğru: {sessionScore.correct}</p>
        <p>Yanlış: {sessionScore.incorrect}</p>
      </div>
      <div className="question-box">
        {currentQuestion ? (
          <>
            <h2>{currentQuestion.question}</h2>
            <ul>
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={answered && option === currentQuestion.correct ? 'correct' : answered ? 'incorrect' : ''}
                >
                  {option}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Tüm sorular tamamlandı.</p>
        )}
      </div>
    </div>
  );
};

export default Question;