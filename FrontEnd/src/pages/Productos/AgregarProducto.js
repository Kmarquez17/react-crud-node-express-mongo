import React, { Component } from "react";
import Formulario from "../../components/Formularios/Productos";
import Swal from "sweetalert2";
import Request from "../../services/request";

class AgregarProducto extends Component {
  constructor(props) {
    super(props);
    this.service = new Request();
  }

  state = {
    data: {
      categoria: "",
      descripcion: "",
      precioCompra: "",
      precioVenta: "",
      stock: ""
    },
    error: false
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const {
      categoria,
      descripcion,
      precioCompra,
      precioVenta,
      stock
    } = this.state.data;

    // Validamos que los datos no esten vacios
    if (
      categoria === "" ||
      descripcion === "" ||
      precioCompra === "" ||
      precioVenta === "" ||
      stock === ""
    ) {
      this.setState({ error: true });
      return;
    }

    //Pasamos el error a false ya que no hay campos vacios
    this.setState({ error: false });

    //Agregamos el producto
    const data = this.state.data;
    this.service.agregar("/producto/agregar", data).then(res => {
      if (res.status === 200) {
        Swal.fire(
          "Producto Creado",
          "El producto se creo correctamente",
          "success"
        );
      }
    });
    this.props.history.push("/productos/listado");
  };

  render() {
    return (
      <React.Fragment>
        <h2>Agregar Producto</h2>
        <Formulario
          data={this.state.data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={this.state.error}
          btnNombre="Agregar"
        />
      </React.Fragment>
    );
  }
}

export default AgregarProducto;
