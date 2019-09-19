import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

const Header = ({ columns }) => {
  return (
    <thead>
      <tr>
        <th>#</th>
        {Object.keys(columns).map(index => (
          <th key={index}>{columns[index].nombreColumn}</th>
        ))}
        <th>Acciones</th>
      </tr>
    </thead>
  );
};

/** findValor : Se Mapea el  nombre de la columna para buscar su valor en el objeto original */
const findValor = (obj1, obj2) => {
  let { nombreJson } = obj1;

  for (var key in obj2) {
    if (nombreJson === key) {
      return obj2[key];
    }
  }
  return null;
};

const Body = ({ columns, data, handleEditar, handleEliminar }) => {
  return (
    <tbody>
      {data.map((data, index) => (
        <tr key={index}>
          <td>{index + 1}</td>

          {columns.map((item, index) => {
            let valor = findValor(item, data);
            if (valor !== null) {
              return <td key={index}>{valor}</td>;
            }
          })}
          <td>
            <Button
              className="mr-2"
              color="success"
              onClick={() => {
                handleEditar(data);
              }}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => {
                handleEliminar(data);
              }}
            >
              Eliminar
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

class Tabla extends Component {
  render() {
    return (
      <div className="col-12">
        <Table bordered>
          <Header columns={this.props.columns} />
          <Body
            columns={this.props.columns}
            data={this.props.data}
            handleEditar={this.props.handleEditar}
            handleEliminar={this.props.handleEliminar}
          />
        </Table>
      </div>
    );
  }
}

export default withRouter(Tabla);
