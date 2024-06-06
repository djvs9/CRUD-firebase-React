import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
  const [ nombre, setNombre ] = useState( '' )
  const [ precio, setPrecio] = useState(0)
  const [ sexo, setSexo ] = useState( '' )
  const [ talla, setTalla ] = useState( '' )
  const navigate = useNavigate()
  const productosCollection = collection(db, 'productos')

  const store = async (e) => {
    e.preventDefault()
    await addDoc( productosCollection, { nombre: nombre, precio: precio, sexo: sexo, talla: talla } )
    navigate('/')
    //console.log(e)
  }
  return (
    <div className= 'container'>
      <div className= 'row'>
        <div className= 'col'>
          <h1>Crear producto</h1>

          <form onSubmit={store}>

          <div className='mb-3'>
              <label className='from-label'>Nombre: </label>
              <input
                  value={nombre}
                  onChange={ (e)=> setNombre(e.target.value)}
                  type="text"
                  className='from-control'
              />
          </div>

          <div className='mb-3'>
              <label className='from-label'>Precio: </label>
              <input
                  value={precio}
                  onChange={ (e)=> setPrecio(e.target.value)}
                  type="number"
                  className='from-control'
              />
          </div>

          <div className='mb-3'>
              <label className='from-label'>Sexo: </label>
              <input
                  value={sexo}
                  onChange={ (e)=> setSexo(e.target.value)}
                  type="text"
                  className='from-control'
              />
          </div>

          <div className='mb-3'>
              <label className='from-label'>Talla: </label>
              <input
                  value={talla}
                  onChange={ (e)=> setTalla(e.target.value)}
                  type="text"
                  className='from-control'
              />
          </div>

        <button type='submit' className='btn btn-primary'>Agregar</button>

          </form>
          
        </div>
      </div>
    </div>
  )
}

export default Create