import React, {useState} from 'react';

export const FirtsComponent = () => {
    //let name = "Ricardo";
    //Defino Variables o arreglos
    let web = "Grabyte.com";
    let learning = [
        "Programador Web Inicial", 
        "Professional FrontEnd Developer",
        "Professional FullStack Developer",
        "Diplomatura en UX/UI"
        ];

    //Defino hooks o estados para funciones o variables
    const [name, setName] = useState("Default");
    
    //Creo funciones
    const ChangeName = (newName) => {
        setName(newName);
    }
    
    //Ejecuto mi porcion de jsx/html
    return (
    <div>
    <h1>Mi primer componente</h1>
    <p>Este es mi primer componenete</p>
    <p>Mi nombre es: <strong className={name.length >= 4 ? "green" : "red"}>{name}</strong></p>
    <p>Mi web es:{web}</p>
    <h2>Cursos:</h2>
    <input type="text" onChange={e => ChangeName(e.target.value)} placeholder="Cambiar Nombre"></input>
    <button onClick={ e => console.log("Existe la persona llamada:", name)}>
        Estado Actual
    </button>
    <button onClick={ e => ChangeName("Ricardo Torrena")}>
        Cambiar Nombre
    </button>
    <ul className=''>
        {
            learning.map( (curso, indice) => {
                return (
                    <li key={indice}>
                        {curso}
                    </li>
                );
            })
        }
    </ul>
    </div>
    )
}
