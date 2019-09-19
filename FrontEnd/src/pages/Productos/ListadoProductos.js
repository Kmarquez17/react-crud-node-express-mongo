import React, { Component } from "react";

import { Button } from "reactstrap";
import Swal from "sweetalert2";

import Request from "../../services/request";

import TablaVista from "../../components/Tablas/TablaVista";
import Spinner from "../../components/Spinner/Spinner";

class ListadoProducto extends Component {
  constructor(props) {
    super(props);
    this.service = new Request();
  }

  state = {
    data: [],
    columns: [
      {
        nombreColumn: "Categoria",
        nombreJson: "categoria"
      },
      {
        nombreColumn: "Descripcion",
        nombreJson: "descripcion"
      },
      {
        nombreColumn: "Precio Compra",
        nombreJson: "precioCompra"
      },
      {
        nombreColumn: "Precio Venta",
        nombreJson: "precioVenta"
      },
      {
        nombreColumn: "Stock",
        nombreJson: "stock"
      }
    ]
  };

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = () => {
    this.service
      .listado("/producto/listado")
      .then(res => res.json())
      .then(res => this.setState({ data: res.productos }));
  };

  handleEditar = obj => {
    this.props.history.push(`/producto/editar/${obj._id}`);
  };

  handleEliminar = obj => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Una Categoria eliminada no se puede recuperar...!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Si,Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(async result => {
      if (result.value) {
        this.service.delete(`/producto/eliminar/${obj._id}`).then(res => {
          if (res.status === 200) {
            this.fetchAPI();
            Swal.fire("Eliminado!", "El producto se ha eliminado", "success");
          }
        });
        // .then(res => res);
      }
    });
  };

  render() {
    // console.log(this.state.data);
    if (Object.keys(this.state.data).length === 0) {
      return (
        <div className="row">
          <Spinner></Spinner>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-12">
            <h3>Listado de Productos</h3>
            <Button
              color="primary"
              className="mb-2"
              onClick={() => {
                this.props.history.push(`/producto/agregar`);
              }}
            >
              Agregar Producto
            </Button>
          </div>

          <TablaVista
            columns={this.state.columns}
            data={this.state.data}
            handleEditar={this.handleEditar}
            handleEliminar={this.handleEliminar}
          />

          <Button
            onClick={() => {
              const copia = this.state.data;
              console.log(copia);
              this.setState({
                data: [...this.state.data.slice(1, 2)]
              });
            }}
          >
            Recortar
          </Button>
        </div>
      );
    }
  }
}

export default ListadoProducto;
