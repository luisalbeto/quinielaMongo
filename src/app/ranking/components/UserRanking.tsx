'use client';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
  _id: string;
  fullname: string;
  email: string;
  score: number; // Añadido campo de puntuación
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        // Agregar puntuaciones ficticias para cada usuario
        const usersWithScores = response.data.map((user: User, index: number) => ({
          ...user,
          score: Math.floor(Math.random() * 100), // Añadir puntuación aleatoria entre 0 y 99
        }));
        // Ordenar usuarios por puntuación en orden decreciente
        usersWithScores.sort((a: User, b: User) => b.score - a.score);
        setUsers(usersWithScores);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Hubo un error al cargar los usuarios.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {error && <p className="text-red">{error}</p>}
      <table className="min-w-full bg-white border-black border">
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
              <td className="border-black border p-2">{index + 1}</td>
              <td className="border-black border p-2">{user.fullname}</td>
              <td className="border-black border p-2">{user.email}</td>
              <td className="border-black border p-2">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;