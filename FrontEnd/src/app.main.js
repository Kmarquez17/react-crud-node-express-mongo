import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Inicio from "./pages/Inicio/Inicio";
import AgregarProducto from "./pages/Productos/AgregarProducto";
import EditarProducto from "./pages/Productos/EditarProducto";
import ListadoProductos from "./pages/Productos/ListadoProductos";
import NotFound from "./pages/Productos/NotFound";

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <main className="container mt-5">
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/producto/agregar" component={AgregarProducto} />

            <Route
              exact
              path="/producto/editar/:id"
              component={EditarProducto}
              // render={props => {
              //   //Tomar el ID del producto
              //   const idProducto = props.match.params.id;
              //   console.log(props);
              //   console.log(idProducto);

              //   return <h1>Editar Producto</h1>;
              // }}
            />
            <Route
              exact
              path="/productos/listado"
              component={ListadoProductos}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}

export default Router;
