'use client';

import React, { FC, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Match } from '@/app/types/contanst.type';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const PredictionsSchema = Yup.object().shape({
  scoreLocalteam: Yup.number()
    .required('Score for local team is required')
    .min(0, 'Score must be at least 0')
    .integer('Score must be an integer'), 
  scoreAwayteam: Yup.number()
    .required('Score for away team is required')
    .min(0, 'Score must be at least 0')
    .integer('Score must be an integer'), 
  localteam: Yup.string().required('Local team is required'),
  awayteam: Yup.string().required('Away team is required'),
});

interface MatchPredictionProps {
  match: Match;
}

const MatchPrediction: FC<MatchPredictionProps> = ({ match }) => {
  const { data: session } = useSession();
  const [predictionExists, setPredictionExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPrediction = async () => {
      if (!session || !session.user) {
        console.error('No user session found');
        setLoading(false);
        return;
      }

      const userId = (session.user as any)._id;
      try {
        const response = await axios.get('/api/scores', {
          params: { userId, localteam: match.team1, awayteam: match.team2 },
        });
        setPredictionExists(response.data.exists);
      } catch (error) {
        console.error('Error checking prediction:', error);
      } finally {
        setLoading(false);
      }
    };

    checkPrediction();
  }, [session, match]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: number) => void) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFieldValue(e.target.name, value);
    }
  };

  const onSubmit = async (data: Omit<Yup.InferType<typeof PredictionsSchema>, 'userId'>, actions: any) => {
    if (!session || !session.user) {
      console.error('No user session found');
      alert('User not authenticated');
      actions.setSubmitting(false);
      return;
    }

    const userId = (session.user as any)._id;
    const payload = {
      userId,
      localteam: data.localteam,
      awayteam: data.awayteam,
      scoreLocalteam: data.scoreLocalteam,
      scoreAwayteam: data.scoreAwayteam,
    };

    try {
      const response = await axios.post('/api/scores', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Marcadores guardados exitosamente');
        setPredictionExists(true);
      } else {
        throw new Error('Error al guardar los marcadores');
      }
    } catch (error) {
      alert('Hubo un error al intentar guardar los marcadores');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="bg-blue/80 shadow-md p-4 flex flex-col items-center gap-4 rounded mt-4 md:flex-row justify-between md:items-center md:gap-8">
      <div className="match-info flex flex-col md:flex-row md:items-center md:justify-between py-4 px-4 w-full">
        <div className="team-info flex items-center mb-4 md:mb-0 md:order-1">
          <img src={match.flag1} alt={match.team1} className="team-flag w-10 h-10 rounded-full mr-4" />
          <span className="team-name text-black font-bold mr-4">{match.team1}</span>
        </div>
        <div className="match-score text-black font-bold text-2xl flex-1 flex items-center justify-center md:justify-self-center md:order-2">
          <Formik
            initialValues={{
              scoreLocalteam: 0,
              scoreAwayteam: 0,
              localteam: match.team1,
              awayteam: match.team2,
            }}
            validationSchema={PredictionsSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className="scoreboard flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-center items-center gap-4">
                    <div className="team-score bg-green/50 text-black py-2 rounded-lg font-bold text-xl flex flex-col items-center border-lg">
                      <Field
                        name="scoreLocalteam"
                        type="number"
                        className="w-1/3 text-center rounded-full"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberChange(e, setFieldValue)}
                      />
                      {errors.scoreLocalteam && touched.scoreLocalteam ? (
                        <div className="error-message text-red text-xs mt-1">{errors.scoreLocalteam}</div>
                      ) : null}
                    </div>
                    <div className="vs text-black font-bold text-2xl flex items-center">VS</div>
                    <div className="team-score bg-green/50 text-black py-2 rounded-lg font-bold text-xl flex flex-col items-center">
                      <Field
                        name="scoreAwayteam"
                        type="number"
                        className="w-1/3 text-center rounded-full"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberChange(e, setFieldValue)}
                      />
                      {errors.scoreAwayteam && touched.scoreAwayteam ? (
                        <div className="error-message text-red text-xs mt-1">{errors.scoreAwayteam}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="submit-button flex justify-center items-center mt-4">
                  <button type="submit" className="bg-sky text-purple hover:bg-blue hover:text-white transition-colors px-4 py-2 rounded-lg font-bold" disabled={predictionExists || loading}>
                    {predictionExists ? 'Predicción Guardada' : 'Enviar'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="team-info flex items-center mt-4 md:mt-0 md:order-3">
          <span className="team-name text-black font-bold ml-4">{match.team2}</span>
          <img src={match.flag2} alt={match.team2} className="team-flag w-10 h-10 rounded-full ml-4" />
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;
