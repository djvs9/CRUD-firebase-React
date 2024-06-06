import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Show = () => {
  //1- configurar los hooks
  const [productos, setProductos] = useState( [] );
  
  //2- referenciar la bd de firebase
  const productosCollection = collection(db, 'productos');

  //3. funcion para mostrar todos los datos
  const getProductos = async () => {
    const data = await getDocs(productosCollection);
  //console.log(data.docs);
  setProductos(
    data.docs.map( (doc) => ( {...doc.data(), id:doc.id}))
  )
 // console.log(productos)
  }
  //4- función para elinminar un doc
  const deleteProducto = async (id) => {
   const productoDoc =  doc(db, 'productos', id)
   await deleteDoc(productoDoc)
   getProductos()
  }

  //5- funcion de confirmación para sweet alert 2
const confirmDelete = (id) => {
  MySwal.fire({
    title: '¿Desea eliminar el producto?',
    text: "No se podra revertir la acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminarlo',
  }).then((result) => {
    if (result.isConfirmed){
      //se llama a la función para eliminar
      deleteProducto(id)
      Swal.fire(
        'Eliminado!',
        'El elemento ha sido eliminado.',
        'succes'
      )
    }
  })
}

  //6- se usa useeffect
  useEffect( () => {
   getProductos()
  }, []);
  //7- devolver la vista del componente

  return (
    <>
    <div className= 'container'>
      <div className='row'>
        <div className= 'col'>
         <div className= "d-grid-gap-2">
          <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
          </div> 

          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Sexo</th>
                <th>Talla</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              { productos.map( (producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.sexo}</td>
                  <td>{producto.talla}</td>
                  <td>
                    <Link to={`/edit/${producto.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(producto.id) } } className="btn btn-danger"><i className="fa-solid fa-delete-left"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show