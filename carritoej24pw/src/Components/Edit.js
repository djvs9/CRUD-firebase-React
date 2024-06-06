import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
  const [ nombre, setNombre ] = useState( '' )
  const [ precio, setPrecio] = useState(0)
  const [ sexo, setSexo ] = useState( '' )
  const [ talla, setTalla ] = useState( '' )

  const navigate = useNavigate()

  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const producto =  doc(db, "productos", id)
    const data = {nombre: nombre, precio: precio, sexo: sexo, talla: talla} 
    await updateDoc(producto, data)
    navigate('/')

  }

  const getProductosById = async (id) => {
    const producto = await getDoc( doc(db, "productos", id) )
    if(producto.exists()) {
        //console.log(producto.data)
        setNombre(producto.data().nombre)
        setPrecio(producto.data().precio)
        setSexo(producto.data().sexo)
        setTalla(producto.data().talla)
    }else{
        console.log('La prenda no existe')
    }
  }

  useEffect( () => {
    getProductosById(id)
  }, [])

  return (
    <div className= 'container'>
    <div className= 'row'>
      <div className= 'col'>
        <h1>Editar producto</h1>

        <form onSubmit={update}>

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

      <button type='submit' className='btn btn-primary'>Actualizar</button>

        </form>
        
      </div>
    </div>
  </div>
  )
}

export default Edit
