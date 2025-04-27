import { useEffect, useRef, useState } from 'react';
import { db } from '../services/firebase';
import { doc, onSnapshot, setDoc, updateDoc, increment } from 'firebase/firestore';
import { TURNS } from '../Constants';

export function VictoryCounter({ winner }) {
  const [victories, setVictories] = useState({ X: 0, Y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const alreadyUpdated = useRef(false);

  useEffect(() => {
    const docRef = doc(db, 'victories', 'count');

    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVictories({
          X: data.X || 0,
          Y: data.Y || 0
        });
      } else {
        await setDoc(docRef, { X: 0, Y: 0 });
        setVictories({ X: 0, Y: 0 });
      }

      // ✅ Ya llegaron los datos
      setLoading(false);
    }, (error) => {
      console.error("Error al escuchar el documento:", error);
      setError("Error en la conexión en tiempo real");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!winner) {
      alreadyUpdated.current = false;
      return;
    }

    if ((winner === TURNS.X || winner === TURNS.O) && !alreadyUpdated.current) {
      alreadyUpdated.current = true;

      const winnerKey = winner === TURNS.X ? 'X' : 'Y';

      const updateFirebaseVictories = async () => {
        try {
          const docRef = doc(db, 'victories', 'count');
          await updateDoc(docRef, {
            [winnerKey]: increment(1)
          });
        } catch (error) {
          console.error("Error actualizando Firebase:", error);
          setError("Error al actualizar las victorias");
        }
      };

      updateFirebaseVictories();
    }
  }, [winner]);

  if (error) return <div className="victory-counter error">{error}</div>;

  return (
    <div className="victory-counter">
      <h3>Victorias</h3>
      <div>Equipo Gatitos {TURNS.X}: {loading ? '...' : victories.X}</div>
      <div>Equipo Perritos {TURNS.O}: {loading ? '...' : victories.Y}</div>
    </div>
  );
}
