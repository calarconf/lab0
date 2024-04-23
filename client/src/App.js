import './App.css';
import {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Swal from 'sweetalert2'
import { BrowserRouter } from 'react-router-dom';
// import withReactContent from 'sweetalert2-react-content'





function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);
  const [usuariosList, setUsuariosList] = useState([]);
  // const noti = withReactContent(Swal)


  const add = () => {
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getUsuarios();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: "<i>El usuario <strong>" +nombre+"</strong> fue registrado con exito</i>",
        icon: 'success',
        timer: 3000,
      })
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message,
      });
      // Handle error appropriately (display message, retry request, etc.)
    });
  }
  //Actualizar
  const update = () => {
    axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getUsuarios();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion exitosa</strong>",
        html: "<i>El usuario <strong>" +nombre+"</strong> fue actualizado con exito</i>",
        icon: 'success',
        timer: 3000,
       })//.catch((error) => {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message,
      //   });
      //   // Handle error appropriately (display message, retry request, etc.)
      // });
    });
  }

  const deleteUsuarios = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      html: "<i>Realmente desea eliminar el usuario <strong>" +val.nombre+"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
        getUsuarios();
        limpiarCampos();
        Swal.fire({
          title: "Eliminado!",
          text: val.nombre+ " fue eliminado.",
          icon: "success",
          timer: 3000,
        });

      }).catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró eliminar el usuario!",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message,
        });
        // Handle error appropriately (display message, retry request, etc.)
      });

      }
    });
  }



  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
    setEditar(false);
  }
  const editarUsuario = (val) =>{
    setEditar(true);
    
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);

    setId(val.id);

  }

  const getUsuarios = () => {
    axios.get("http://localhost:3001/usuarios",).then((response) => {
      setUsuariosList(response.data);
    })
    .catch((error) => {
      console.error("Error buscando usuarios:", error);
      // Handle error appropriately (display message, retry request, etc.)
  });
    
  };
  // getUsuarios();


  return (
    
    <div className="container">
    
    <div className="card text-center">
      <div className="card-header">
        Gestión de usuarios
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" 
          onChange={(event) => {
            setNombre(event.target.value)
          }}
          className="form-control" value={nombre} placeholder="Ingrese un usuario" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input type="number" value={edad}
          onChange={(event) => {
            setEdad(event.target.value)
          }}
          className="form-control" placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Pais:</span>
          <input type="text" value={pais}
          onChange={(event) => {
            setPais(event.target.value)
          }}
          className="form-control" placeholder="Ingrese un pais" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo:</span>
          <input type="text" value={cargo}
          onChange={(event) => {
            setCargo(event.target.value)
          }}
          className="form-control" placeholder="Ingrese un cargo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>  
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
          <input type="number" value={anios}
          onChange={(event) => {
            setAnios(event.target.value)
          }}
          className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>  


      
      </div>
      <div className="card-footer text-body-secondary">
        {
          editar?
          <div>
          <button className ='btn btn-warning m-2' onClick={update}>Actualizar</button> 
          <button className ='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className ='btn btn-success' onClick={add}>Registrar</button>

        }

      </div>
    </div>
    <Table striped>
      <thead>
        <tr>
          
          <th>#</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Pais</th>
          <th>Cargo</th>
          <th>Experiencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
          usuariosList.map((val, key) =>{
            return <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.anios}</td>
                    <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="secondary" 
                      onClick={() => {
                        editarUsuario(val);
                      }}
                      className='btn btn-info'>Editar</Button>
                      <Button variant="secondary" onClick={()=>{
                        deleteUsuarios(val);
                        getUsuarios();
                      }} className='btn btn-danger'>Eliminar</Button>
                    </ButtonGroup>

                    </td>
                  </tr>
          })
        }

        
      </tbody>
    </Table>
    </div>

  );
}

export default App;
