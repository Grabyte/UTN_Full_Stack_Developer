/* eslint-disable react/prop-types */
// Al no estar utilizando typescript o la libreria de prop-types, simplemente opte por desabilitar la advertencia de eslint.
import './index.css'

function TarjetaInfo({ titulo, descripcion, imagen, enlace }) {
    return (
        <div className='container'>
            <img src={imagen} alt={titulo} className="tarjeta-image" />
            <h1 className='tarjeta-titulo'>{titulo}</h1>
            <p>{descripcion}</p>
            {enlace && <a href={enlace} target="_blank"><button>Leer más</button></a>}
        </div>
    );
}

export default TarjetaInfo;
