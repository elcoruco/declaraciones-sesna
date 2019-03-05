/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import * as ConstClass from  '../../../ConstValues.js';
import ChartistGraph from 'react-chartist';
import "../../../css/chartist.min.css"

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class NivelGobiernoEdadPorcentaje extends Component{

  /*
   * C O N S T R U C T O R
   * ----------------------------------------------------------------------
   */
   constructor(){
    super();

    this.makeData  = this.makeData.bind(this);
    this.getInfo   = this.getInfo.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.buildMatrix = this.buildMatrix.bind();

    this.state = {
      data : null,
      options : ConstClass.StatsChartOptions.donutOptions
    }

    let promises = this.makeData();

    Promise.all(promises.map(d => d.promise)).then(d => {



      let data = {
        labels  : [...new Set(promises.map(d => d.label))],
        _labels : [...new Set(promises.map(d => d._label))],
        series  : this.buildMatrix(d, promises)
      }

      console.log("circles!", promises, data);

      this.setState({data : data});

    });
   }

  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
	render(){
    if(!this.state.data) return null;
    let colors = ConstClass.ChartColors;
		return(
      <div className="row">
				<div className="col-sm-12">
					<div className="pdn_d_box">
            <h2>Funcionarios por nivel de gobierno y rango de edad (porcentaje)</h2>
            <nav class="pdn_viz">
            <ul>
            { this.state.data.series.map( (d,i) =>
              <li key={"ngnepg-" + i}>
                <ChartistGraph data={ {series : d} } type={"Pie"} options={this.state.options} />
                <p>{this.state.data.labels[i]}</p>
              </li>
            )}
            </ul>
            </nav>
            <ul className="list_inline">
            {this.state.data._labels.map( (d, i) =>
              <li key={"ngenpl-" + i}>
                <span style={ {display: "inline-block", width: "1em", height: "1em", background: colors[i]} }>
                </span> {d}
              </li>
            )}
            </ul>

        </div>
      </div>
    </div>
		);
	}
  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  getInfo(_from, _to, gl){
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(_from, _to, gl);

    return fetch(ConstClass.endpoint, connObj)
          .then(response => response.json())
          .then(d => {
            return d.total;
            //return d;
          });
  }

   /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  buildMatrix(data, response){
    console.log(data, response);

    let b   = [...data],
        gl  = ConstClass.GobLevels,
        ra  = [...new Set(response.map(d => d._label))],
        i, j, res = [];
    for(i =0; i < gl.length; i++ ){
      res.push(b.splice(0, ra.length))
    }

    return res;
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeData(){
    let res = [],
        gl  = ConstClass.GobLevels,
        currentYear = (new Date()).getFullYear(),
        _from = d => `${d}-01-01`,
        _to   = d => `${d}-07-07`,
        conf = ConstClass.AgeChartsConf,
        year1 = currentYear - conf.from,
        year2 = year1 - conf.step,
        i;

    for(i =0; i < gl.length; i++ ){
      while(year1 > currentYear - conf.to){
        res.push({
          promise : this.getInfo(_from(year2), _to(year1), gl[i].key ),
          label : gl[i].label,
          _label : `${currentYear - year1} - ${currentYear - year2}`
        });

        year1-= conf.step;
        year2-= conf.step;
      }

      year1 = currentYear - conf.from;
      year2 = year1 - conf.step;
    }

    return res;
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeQuery(_from, _to, gl){
    let str1   = ConstClass.PROP_NAMES.nacimiento,
        str2   = ConstClass.PROP_NAMES.nivelGobierno,
        search = {query : {}, limit : 2};

    search.query[str1] = {"desde" : _from, "hasta" : _to};
    search.query[str2] = gl;

    return JSON.stringify(search);
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default NivelGobiernoEdadPorcentaje;