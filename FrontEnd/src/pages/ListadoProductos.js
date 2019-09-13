import React, { Component } from "react";
import Request from "../services/request";
import TablaVista from "../components/Tablas/TablaVista";
import { Button } from "reactstrap";

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
    this.service
      .listado("/producto/listado")
      .then(res => this.setState({ data: res.productos }));
  }

  handleEditar = obj => {
    this.props.history.push(`/producto/editar/${obj._id}`);
  };

  render() {
    if (Object.keys(this.state.data).length === 0) {
      return (
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">No hay Productos</h3>
          </div>
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
          />
        </div>
      );
    }
  }
}

export default ListadoProducto;
