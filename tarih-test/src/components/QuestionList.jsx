import React, { useState } from 'react';
import Question from './Question';
import './componentscss/QuestionList.css';

const QuestionList = () => {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className="outer-container">
      <h1>KPSS Tarih Soruları</h1>
      <select onChange={handleTopicChange} value={selectedTopic}>
        <option value="">Tüm Konular</option>
        <option value="İslamiyet Öncesi Türk Tarihi">İslamiyet’ten Önceki Türk Devletleri</option>
        <option value="İlk Türk - İslam Devletleri ve Beylikleri">İlk Müslüman Türk Devletleri</option>
        <option value="Osmanlı Devleti Kuruluş ve Yükselme Dönemleri">Osmanlı Devleti Siyasi</option>
        <option value="Osmanlı Devleti Kültür ve Uygarlık">Osmanlı Devleti Kültür ve Uygarlık</option>
        <option value="XVII. Yüzyılda Osmanlı Devleti (Duraklama Dönemi)">Kurtuluş Savaşı Hazırlık Dönemi</option>
        <option value="XVIII. Yüzyılda Osmanlı Devleti (Gerileme Dönemi)">Kurtuluş Savaşı Cepheleri</option>
        <option value="XIX..Yüzyılda Osmanlı Devleti (Dağılma Dönemi">Devrim Tarihi</option>
        <option value="XX. Yüzyılda Osmanlı Devleti">Atatürk Dönemi İç ve Dış Politika</option>
        <option value="Kurtuluş Savaşı Hazırlık Dönemi">Atatürk İlkeleri</option>
        <option value="I. TBMM Dönemi">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Kurtuluş Savaşı Muharebeler Dönemi">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Atatürk İnkılapları">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Atatürk İlkeleri">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Partiler ve Partileşme Dönemi (İç Politika)">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Atatürk Dönemi Türk Dış Politikası">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Atatürk Sonrası Dönem">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Atatürk’ün Hayatı ve Kişiliği">Çağdaş Türk ve Dünya Tarihi</option>
        <option value="Çağdaş Türk ve Dünya Tarihi">Çağdaş Türk ve Dünya Tarihi</option>
        
      </select>
      <div className="inner-container">
        <Question selectedTopic={selectedTopic} />
      </div>
    </div>
  );
};

export default QuestionList;

