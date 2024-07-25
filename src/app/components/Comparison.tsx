'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Match } from "@/app/types/contanst.type";
import { useSession } from 'next-auth/react';
import MatchResult from './MatchResult';

interface PredictionsComparisonProps {
  matchResults: Match[];
}

interface Prediction {
  _id: string;
  userId: string;
  localteam: string;
  awayteam: string;
  scoreLocalteam: number;
  scoreAwayteam: number;
}

const PredictionsComparison: React.FC<PredictionsComparisonProps> = ({ matchResults }) => {
  const { data: session } = useSession();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [comparisonResults, setComparisonResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        if (!session || !session.user) {
          console.error('No user session found');
          return;
        }

        const userId = (session.user as any)._id;

        // Obtener predicciones del usuario
        const predictionsResponse = await axios.get(`/api/predictions?userId=${userId}`);
        setPredictions(predictionsResponse.data);

        // Comparar predicciones con resultados
        const comparison = predictionsResponse.data.map((prediction: Prediction) => {
          const matchResult = matchResults.find(
            (result: Match) =>
              result.team1 === prediction.localteam &&
              result.team2 === prediction.awayteam
          );

          const isCorrect =
            matchResult &&
            matchResult.score1 === prediction.scoreLocalteam &&
            matchResult.score2 === prediction.scoreAwayteam;

          return {
            ...prediction,
            matchResult,
            isCorrect,
          };
        });

        setComparisonResults(comparison);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };

    fetchPredictions();
  }, [session, matchResults]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-7 text-black">Resultados de Predicciones</h1>
      {comparisonResults.map((result: any) => (
        <div key={result._id} className="mb-4">
          {result.matchResult && <MatchResult match={result.matchResult} />}
          <p className={`text-lg font-bold ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {result.isCorrect ? '¡Predicción Correcta!' : 'Predicción Incorrecta'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PredictionsComparison;
