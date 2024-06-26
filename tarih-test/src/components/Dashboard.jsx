import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [topicScores, setTopicScores] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadTopicScores(currentUser.uid);
      } else {
        setUser(null);
        setTopicScores([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadTopicScores = async (userId) => {
    const topicsRef = collection(db, 'scores', userId, 'topics');
    const topicsSnapshot = await getDocs(topicsRef);

    const scores = topicsSnapshot.docs.map(doc => ({
      topic: doc.id,
      ...doc.data()
    }));

    setTopicScores(scores);
  };

  const data = {
    labels: topicScores.map(score => score.topic),
    datasets: [
      {
        label: 'Doğru',
        data: topicScores.map(score => score.correct),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Yanlış',
        data: topicScores.map(score => score.incorrect),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  const advice = topicScores
    .filter(score => score.incorrect > score.correct)
    .map(score => score.topic)
    .join(', ');

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <Bar data={data} />
          <p>Bu konulara daha fazla çalışmalısınız: {advice || 'Tüm konulara hakim görünüyorsunuz!'}</p>
        </>
      ) : (
        <p>Lütfen giriş yapın.</p>
      )}
    </div>
  );
};

export default Dashboard;
