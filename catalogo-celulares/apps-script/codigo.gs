// Creado por Digital House Schools para demostrar uso de Hojas de Cálculo como fuente de datos para páginas web simples.

function doGet(e) {
  var miArchivo = SpreadsheetApp.getActiveSpreadsheet();
  var nombreArchivo = miArchivo.getName();
  var hojasDelArchivo = miArchivo.getSheets();
  var nombresHojas = hojasDelArchivo.map(hoja => hoja.getName());

  var mensaje = "Consulta realizada exitosamente";

  var hojaConsultar;
  if(e && e.parameter && e.parameter.hoja){
    hojaConsultar = hojasDelArchivo.find(hoja=>hoja.getName().toLowerCase() == e.parameter.hoja.toLowerCase())
  } else {
    hojaConsultar = hojasDelArchivo[0];
  }
  
  var nombreHojaConsultar;
  if(hojaConsultar != undefined){
    nombreHojaConsultar = hojaConsultar.getName();
    var cantidadColumnas = hojaConsultar.getLastColumn();
    var cantidadFilas = hojaConsultar.getLastRow()-1;
    var encabezadosColumnas = hojaConsultar.getRange(1,1,1,cantidadColumnas).getValues()[0];
    var datosCrudos = hojaConsultar.getRange(2, 1, cantidadFilas, cantidadColumnas).getValues();

    // Mapear arrays simples a un array de objetos
    var misDatos = datosCrudos.map((fila) =>
      encabezadosColumnas.reduce((o, h, j) => Object.assign(o, { [h]: fila[j] }), {})
    );

    var misDatosFinales = [];
    var columnaFiltro;
    if(e && e.parameter && e.parameter.columnaFiltro){
      columnaFiltro = e.parameter.columnaFiltro;
    }
    var criterioFiltro;
    if(e && e.parameter && e.parameter.criterioFiltro){
      criterioFiltro = e.parameter.criterioFiltro;
    }
    if(columnaFiltro != undefined){
      if(encabezadosColumnas.includes(e.parameter.columnaFiltro)){
        if(criterioFiltro != undefined){
          misDatosFinales = misDatos.filter(fila => {
            let datoEnFila = fila[columnaFiltro];
            if(typeof datoEnFila === "string"){
              datoEnFila = datoEnFila.trim().toLowerCase();
            }
            return datoEnFila == criterioFiltro.toLowerCase()
          });
        } else {
          mensaje = "Error: se especificó una columnaFiltro pero no un criterioFiltro";
        }
      } 
      else{
        mensaje = "Error: columna " + columnaFiltro + " no encontrada en la hoja " + nombreHojaConsultar;
      }
    } else {
      // No se pasó el parámetro "columnaFiltro"
      misDatosFinales = misDatos;
    }
  } else {
    nombreHojaConsultar = e.parameter.hoja;
    mensaje = "Error: hoja " + nombreHojaConsultar + " no encontrada en el archivo";
  }

  var respuesta = {
    mensaje: mensaje,
    nombreArchivo: nombreArchivo,
    nombresHojas: nombresHojas,
    hojaConsultada: nombreHojaConsultar,
    nombresColumnas: encabezadosColumnas,
    cantidadColumnas: cantidadColumnas,
    cantidadFilas: cantidadFilas,
    datos: misDatosFinales
  };


  return ContentService.createTextOutput(JSON.stringify(respuesta)).setMimeType(ContentService.MimeType.JSON);

}