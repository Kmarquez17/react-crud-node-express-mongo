import React, { Component } from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

class Producto extends Component {
  state = {
    visible: true
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    let valor = "Agregar";
    // let valor = Object.keys(this.props.data).length === 1 ? 'Editar' : 'Agregar'
    // console.log(Object.keys(this.props.data).length)
    return (
      <Form onSubmit={this.props.handleSubmit}>
        {this.props.error ? (
          <Alert
            color="info"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            Hay campos vacios
          </Alert>
        ) : null}
        <FormGroup>
          <Label for="exampleEmail">Categoria</Label>
          <Input
            onChange={this.props.handleChange}
            type="text"
            name="categoria"
            value={this.props.data.categoria}
            placeholder="Ingrese la categoria"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Descripcion</Label>
          <Input
            onChange={this.props.handleChange}
            type="textarea"
            name="descripcion"
            value={this.props.data.descripcion}
            placeholder="Ingrese la descripcion"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Precio Compra</Label>
          <Input
            onChange={this.props.handleChange}
            type="text"
            name="precioCompra"
            value={this.props.data.precioCompra}
            placeholder="Ingrese el Precio compra"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Precio Venta</Label>
          <Input
            onChange={this.props.handleChange}
            type="text"
            name="precioVenta"
            value={this.props.data.precioVenta}
            placeholder="Ingrese el precio venta"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Stock</Label>
          <Input
            onChange={this.props.handleChange}
            type="text"
            name="stock"
            value={this.props.data.stock}
            placeholder="Ingrese el stock"
          />
        </FormGroup>
        <Button color="primary">{this.props.btnNombre}</Button>
      </Form>
    );
  }
}
export default Producto;
