'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useGetMatchesList } from '@/app/hooks/useGetMatchesList'; // Ajusta la ruta según tu estructura de archivos

interface User {
  _id: string;
  fullname: string;
  email: string;
  score: number; 
}

interface Prediction {
  _id: string;
  userId: string;
  localteam: string;
  awayteam: string;
  scoreLocalteam: number;
  scoreAwayteam: number;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { matches } = useGetMatchesList(); // Obtiene los resultados reales de los partidos

  // Función para calcular el puntaje de las predicciones
  const calculateScore = (userPredictions: Prediction[]) => {
    if (!matches) {
      // Si no hay resultados reales disponibles, retornar un puntaje de 0
      return 0;
    }

    return userPredictions.reduce((totalScore, prediction) => {
      const match = matches.find(
        (m) => m.team1 === prediction.localteam && m.team2 === prediction.awayteam
      );

      if (match) {
        // Proporcionar un valor predeterminado en caso de que score1 o score2 sean undefined
        const matchScore1 = Number(match.score1) || 0;
        const matchScore2 = Number(match.score2) || 0;
        let score = 0;

        // Comparar predicciones y resultados reales
        if (prediction.scoreLocalteam === matchScore1 && prediction.scoreAwayteam === matchScore2) {
          score += 5; // Marcador exacto
        }

        // Verificar la diferencia de goles
        const predictedDifference = Math.abs(prediction.scoreLocalteam - prediction.scoreAwayteam);
        const actualDifference = Math.abs(matchScore1 - matchScore2);
        if (predictedDifference === actualDifference) {
          score += 5; // Diferencia de goles
        }

        // Verificar el ganador del partido
        if (
          (matchScore1 > matchScore2 && prediction.scoreLocalteam > prediction.scoreAwayteam) ||
          (matchScore1 < matchScore2 && prediction.scoreLocalteam < prediction.scoreAwayteam)
        ) {
          score += 10; // Ganador del partido
        }

        return totalScore + score;
      }

      return totalScore;
    }, 0);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        const usersData = response.data;

        // Obtener las predicciones para todos los usuarios
        const predictionsPromises = usersData.map(async (user: User) => {
          try {
            const userPredictionsResponse = await axios.get(`/api/predictions?userId=${user._id}`);
            return {
              ...user,
              predictions: userPredictionsResponse.data,
            };
          } catch (err) {
            console.error(`Error fetching predictions for user ${user._id}:`, err);
            return {
              ...user,
              predictions: [],
            };
          }
        });

        const usersWithPredictions = await Promise.all(predictionsPromises);

        // Calcular el puntaje para cada usuario
        const usersWithScores = usersWithPredictions.map((user) => ({
          ...user,
          score: calculateScore(user.predictions),
        }));

        usersWithScores.sort((a: User, b: User) => b.score - a.score);
        setUsers(usersWithScores);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Hubo un error al cargar los usuarios.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [matches]);

  return (
    <div>
      {error && <p className="text-red">{error}</p>}
      {loading ? (
        <p className='text-black'>Cargando...</p>
      ) : (
        <table className="min-w-full bg-white border-black rounded-sm">
          <thead className='bg-blue/90'>
            <tr className='text-black'>
              <th className="border-black border p-2">Ranking</th>
              <th className="border-black border p-2">Nombre</th>
              <th className="border-black border p-2">Email</th>
              <th className="border-black border p-2">Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b text-black">
                <td className="border-black border font-bold p-2">{index + 1}</td>
                <td className="border-black border p-2">{user.fullname}</td>
                <td className="border-black border p-2">{user.email}</td>
                <td className="border-black border p-2 font-bold">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
