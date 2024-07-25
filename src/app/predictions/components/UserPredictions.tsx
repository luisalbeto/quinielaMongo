'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

interface Prediction {
  _id: string;
  localteam: string;
  awayteam: string;
  scoreLocalteam: number;
  scoreAwayteam: number;
}

const UserPredictions = () => {
  const { data: session } = useSession();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!session || !session.user) {
        setError('No user session found.');
        return;
      }

      try {
        const userId = (session.user as any)._id;
        const response = await axios.get(`/api/predictions?userId=${userId}`);
        setPredictions(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('Error fetching predictions:', err.response?.data || err.message);
          setError('Hubo un error al cargar las predicciones.');
        }
      }
    };

    fetchPredictions();
  }, [session]);

  return (
    <div>
      {error && <p className="text-red">{error}</p>}
      <table className="min-w-full bg-white border-black border">
        <thead className='bg-blue/90'>
          <tr className='text-black'>
            <th className="border-black border p-2">Equipo Local</th>
            <th className="border-black border p-2">Equipo Visitante</th>
            <th className="border-black border p-2">Marcador Local</th>
            <th className="border-black border p-2">Marcador Visitante</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction) => (
            <tr key={prediction._id} className="border-b text-black">
              <td className="border-black border p-2">{prediction.localteam}</td>
              <td className="border-black border p-2">{prediction.awayteam}</td>
              <td className="border-black border p-2">{prediction.scoreLocalteam}</td>
              <td className="border-black border p-2">{prediction.scoreAwayteam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPredictions;
