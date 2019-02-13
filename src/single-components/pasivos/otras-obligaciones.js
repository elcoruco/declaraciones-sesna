/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class PasivosObligaciones extends Component{
  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
  render(){
    return(
      <div className="col-sm-9 col-sm-offset-3 sidecontent">
    <h2>Otras obligaciones</h2>
    <div className="row">
      <div className="col-sm-12">
        { this.items().map( (pasivo, i) => 
        <div className="pdn_d_box" v-for="pasivo in items">
        <p className="pdn_label">Tipo de operación</p>
        <p className="pdn_data_p">{pasivo.tipo_operacion.valor}</p>
        <p className="pdn_label">Tipo de acreedor</p>
        <p className="pdn_data_p">{pasivo.tipo_acreedor.valor}</p>
        <p className="pdn_label">Tipo de obligación</p>
        <p className="pdn_data_p">{pasivo.tipo_obligacion}</p>
        <p className="pdn_label">País</p>
        <p className="pdn_data_p">{pasivo.nacional_extranjero.valor}</p>
        <p className="pdn_label">Sector o industria</p>
        <p className="pdn_data_p">{pasivo.sector_industria.valor}</p>
        <p className="pdn_label">Fecha de obligación</p>
        <p className="pdn_data_p">{pasivo.fecha_obligacion}</p>
        <p className="pdn_label">Monto original</p>
        <p className="pdn_data_p">{pasivo.monto_original+' '+pasivo.tipo_moneda.codigo}</p>
        <p className="pdn_label">Moneda</p>
        <p className="pdn_data_p">{pasivo.monto_original+' '+pasivo.tipo_moneda.moneda}</p>
        <p className="pdn_label">Tasa de interés</p>
        <p className="pdn_data_p">{pasivo.tasa_interes}</p>
        <p className="pdn_label">Saldo pendiente</p>
        <p className="pdn_data_p">{pasivo.saldo_pendiente}</p>
        <p className="pdn_label">Montos abonados</p>
          { pasivo.montos_abonados.map( (monto, j) => 
          <p className="pdn_data_p" v-for ="monto in pasivo.montos_abonados"><span>{monto}</span></p>
          )}
        <p className="pdn_label">Plazo de obligación</p>
        <p className="pdn_data_p">{pasivo.plazo_obligacion+' '+pasivo.unidad_medida_plazo.valor}</p>
        <p className="pdn_label">Titularidad de la obligación</p>
        <p className="pdn_data_p">{pasivo.titularidad_obligacion.valor}</p>
        <p className="pdn_label">Porcentaje de obligación del titular</p>
        <p className="pdn_data_p">{pasivo.porcentaje_obligacion_titular}%</p>
        <p className="pdn_label">Garantía</p>
        <p className="pdn_data_p">{pasivo.garantia ? "Sí" : "No"}</p>
        <p className="pdn_label">Observaciones</p>
        <p className="pdn_data_p">{pasivo.observaciones}</p>
        </div>
        )}
      </div>
    </div>
  </div>
    );
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */
  items(){
    return this.props.profile.pasivos.otras_obligaciones;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default PasivosObligaciones;