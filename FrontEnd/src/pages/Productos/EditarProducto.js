import React, { Component } from "react";
import Formulario from "../../components/Formularios/Productos";
import Swal from "sweetalert2";
import Request from "../../services/request";
import NotFound from "./NotFound";

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
    error: false,
    isExiste: false
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    this.service
      .listado(`/producto/listar/${this.props.match.params.id}`)
      .then(res => {
        if (res.status === 404) {
          this.setState({
            isExiste: true
          });
        }
        return res.json();
      })
      .then(res => this.setState({ data: res[0] }));
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
    this.service
      .editar("/producto/editar", data)
      // .then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          Swal.fire(
            "Producto Editado",
            "El producto se edito correctamente",
            "success"
          );
        }
      });
    this.props.history.push("/productos/listado");
  };

  render() {
    if (this.state.isExiste) {
      return <NotFound />;
    } else {
      return (
        <React.Fragment>
          <h2>Editar Producto</h2>
          <Formulario
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
            btnNombre="Editar"
          />
        </React.Fragment>
      );
    }
  }
}

export default AgregarProducto;
