import { useEffect, useRef, useState } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { TURNS } from '../Constants';

export function VictoryCounter({ winner }) {
  const [victories, setVictories] = useState({ X: 0, Y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const alreadyUpdated = useRef(false);

  useEffect(() => {
    const loadVictories = async () => {
      try {
        setLoading(true);
        setError(null);

        const docRef = doc(db, 'victories', 'count');
        console.log(" Cargando victorias desde Firebase...");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Documento leído:", data);
          setVictories({
            X: data.X || 0,
            Y: data.Y || 0
          });
        } else {
          console.log("Documento no existe. Creando uno nuevo...");
          await setDoc(docRef, { X: 0, Y: 0 });
          setVictories({ X: 0, Y: 0 });
          console.log("Documento creado con valores iniciales.");
        }
      } catch (error) {
        console.error("Error al cargar victorias:", error);
        setError("Error al cargar las victorias");
      } finally {
        setLoading(false);
      }
    };

    loadVictories();
  }, []);

  useEffect(() => {
    // Resetear cuando se reinicia el juego
    if (!winner) {
      alreadyUpdated.current = false;
      return;
    }

    if ((winner === TURNS.X || winner === TURNS.O) && !alreadyUpdated.current) {
      alreadyUpdated.current = true;

      const winnerKey = winner === TURNS.X ? 'X' : 'Y';

      // Actualizamos el estado local
      setVictories(prev => ({
        ...prev,
        [winnerKey]: prev[winnerKey] + 1
      }));

      // Ejecutamos la función asincrónica fuera del setState
      const updateFirebaseVictories = async () => {
        try {
          console.log("📡 Actualizando Firebase...");
          const docRef = doc(db, 'victories', 'count');
          await updateDoc(docRef, {
            [winnerKey]: increment(1)
          });
          console.log("Firebase actualizado con:", winnerKey);
        } catch (error) {
          console.error("Error actualizando Firebase:", error);
          setError("Error al actualizar las victorias");
        }
      };

      updateFirebaseVictories();
    }
  }, [winner]);

  if (loading) return <div className="victory-counter">Cargando...</div>;
  if (error) return <div className="victory-counter error">{error}</div>;

  return (
    <div className="victory-counter">
      <h3>Victorias</h3>
      <div>Equipo Gatitos {TURNS.X}: {victories.X}</div>
      <div>Equipo Perritos {TURNS.O}: {victories.Y}</div>
    </div>
  );
}

