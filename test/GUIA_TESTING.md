# 🧪 Guía Completa de Testing del API

## 📋 Índice
1. [Testing sin instalaciones (Navegador)](#opción-1-testing-en-el-navegador-sin-instalar-nada)
2. [Testing avanzado con Node.js](#opción-2-testing-avanzado-con-nodejs)
3. [Interpretación de resultados](#interpretación-de-resultados)
4. [Solución de problemas comunes](#solución-de-problemas-comunes)

---

## 🎯 ¿Para qué sirve el testing?

El sistema de testing te permite **validar automáticamente** que tu API esté funcionando correctamente.

---

## 🚀 Opción 1: Testing en el Navegador (SIN INSTALAR NADA)

### **Archivo:** `testing-api.html`

### **¿Cómo usarlo?**

1. **Abre el archivo** `testing-api.html` en cualquier navegador moderno (Chrome, Firefox, Edge)

2. **Pega la URL** de tu Google Apps Script:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

3. **Click en "Ejecutar Todos los Tests"**

4. **Espera los resultados** (10-15 segundos)

### **¿Qué tests se ejecutan?**

#### **Test 1: Validar formato de URL** 
- Verifica que la URL tenga el formato correcto de Google Apps Script
- Debe contener: `script.google.com`, `/macros/s/`, y terminar en `/exec`

#### **Test 2: Conectar con el API** 
- Intenta hacer una petición al endpoint
- Mide el tiempo de respuesta
- Detecta errores de conexión o CORS

#### **Test 3: Validar respuesta del API** 
- Verifica que la respuesta sea un array válido
- Detecta si el array está vacío
- Identifica respuestas con formato incorrecto

#### **Test 4: Validar estructura de objetos** 
- Comprueba que todos los objetos tengan las propiedades requeridas:
  - `idCelular`
  - `marca`
  - `modelo`
  - `precio`
  - `lanzamiento`
  - `imagen`

#### **Test 5: Validar campos obligatorios** 
- Verifica que ningún registro tenga campos vacíos
- Identifica qué filas tienen problemas

#### **Test 6: Validar tipos de datos**
- Comprueba que los tipos sean correctos:
  - `lanzamiento` debe ser número
  - `marca`, `modelo`, etc. deben ser texto

#### **Test 7: Validar URLs de imágenes** 
- Verifica que todas las URLs sean válidas
- Comprueba que terminen en extensiones de imagen (.jpg, .png, etc.)

#### **Test 8: Validar formato de precios** 
- Verifica que los precios contengan el símbolo `$`
- Detecta precios mal formateados

#### **Test 9: Contar registros** 
- Muestra estadísticas:
  - Total de productos
  - Marcas únicas
  - Años disponibles

#### **Test 10: Verificar IDs duplicados** 
- Detecta si hay IDs repetidos
- Lista los IDs duplicados

### **Interpretación de colores:**

- 🟢 **Verde (Success):** Todo está correcto
- 🔴 **Rojo (Error):** Hay un problema crítico que debe solucionarse
- 🟡 **Amarillo (Warning):** Advertencia, puede funcionar pero no es óptimo

---

## 💻 Opción 2: Testing Avanzado con Node.js


### **Instalación:**

1. **Instalar Node.js:**
   - Ve a https://nodejs.org/
   - Descarga la versión LTS (Long Term Support)
   - Instala siguiendo las instrucciones

2. **Verificar instalación:**
   ```bash
   node --version
   npm --version
   ```

3. **Instalar dependencias del proyecto:**
   ```bash
   cd tu-proyecto
   npm install
   ```

### **Ejecutar los tests:**

```bash
npm test
```

### **Ver reporte en HTML:**

Después de ejecutar los tests, se genera un archivo `test-report.html`:

```bash
# Windows
start test-report.html

# Mac
open test-report.html

# Linux
xdg-open test-report.html
```

---

## 📊 Interpretación de Resultados

### **Dashboard de Estadísticas:**

```
┌─────────────┬──────────┬──────────┬───────┐
│ ✅ Exitosos │ ❌ Errores│ ⚠️ Warnings│ Total│
│      8      │     0     │     2     │  10   │
└─────────────┴──────────┴──────────┴───────┘
```

#### **Interpretación:**

- **8/10 Exitosos:** Muy bien, mayoría de tests pasan
- **0 Errores:** Excelente, no hay problemas críticos
- **2 Warnings:** Hay detalles que mejorar pero funciona

### **Ejemplo de Test Exitoso:**

```
✅ Validar formato de URL
   URL tiene el formato correcto de Google Apps Script
   Status: 200 OK
```

### **Ejemplo de Error Crítico:**

```
 Conectar con el API
   No se pudo conectar al API
   Error: Failed to fetch
   
   Posibles causas:
   - URL incorrecta
   - Apps Script no está implementado
   - Permisos de "Cualquier usuario" no configurados
```

### **Ejemplo de Warning:**

```
 Validar URLs de imágenes
   3 imágenes con problemas
   
   Detalles:
   - Fila 5: URL no parece ser una imagen
   - Fila 12: falta URL de imagen
   - Fila 18: URL inválida
```

---

## 🔧 Solución de Problemas Comunes

### **Error 1: "No se pudo conectar al API"**

**Síntomas:**
```
 Test 2: Error Failed to fetch
```

**Soluciones:**

1. **Verificar la URL:**
   - Debe terminar en `/exec`
   - Cópiala directamente desde Apps Script

2. **Verificar permisos en Apps Script:**
   - Ir a "Implementar" > "Gestionar implementaciones"
   - "Quién tiene acceso" debe ser **"Cualquier usuario"**

3. **Probar la URL en el navegador:**
   - Pega la URL en una nueva pestaña
   - Deberías ver el JSON

---

### **Error 2: "Array vacío"**

**Síntomas:**
```
 Test 3: El API respondió con un array vacío
```

**Soluciones:**

1. **Verificar Google Sheet:**
   - Asegúrate de que tenga datos
   - La primera fila debe tener encabezados
   - Las filas siguientes deben tener datos

2. **Verificar el código de Apps Script:**
   - Debe estar usando `getActiveSheet()`
   - Debe estar leyendo la hoja correcta

---

### **Error 3: "Faltan campos requeridos"**

**Síntomas:**
```
 Test 4: Faltan campos requeridos: imagen, precio
```

**Soluciones:**

1. **Verificar encabezados de la hoja:**
   - Los nombres deben coincidir exactamente:
   - `idCelular`, `marca`, `modelo`, `precio`, `lanzamiento`, `imagen`

2. **Caso sensible:**
   - `precio` ≠ `Precio`
   - `imagen` ≠ `Imagen`

---

### **Error 4: "Campos vacíos encontrados"**

**Síntomas:**
```
 Test 5: 5 campos vacíos encontrados
Fila 3: falta marca
Fila 7: falta modelo
```

**Soluciones:**

1. **Revisar las filas mencionadas:**
   - Ve a la Google Sheet
   - Completa los datos faltantes

2. **Eliminar filas vacías:**
   - A veces hay filas completamente vacías
   - Bórralas

---

### **Error 5: "URLs de imágenes inválidas"**

**Síntomas:**
```
 Test 7: 2 imágenes con problemas
Fila 5: URL inválida
```

**Soluciones:**

1. **Verificar formato de URL:**
   ```
    Correcto: https://i.ibb.co/6n3FBS7/image.png
    Incorrecto: imagen.png
    Incorrecto: /images/producto.jpg
   ```

2. **Usar URLs completas:**
   - Deben empezar con `http://` o `https://`
   - Deben terminar en `.jpg`, `.png`, `.gif`, etc.

---

## 📈 Buenas Prácticas

### **Durante el desarrollo:**

- Ejecuta los tests cada vez que cambies los datos
- Usa los tests para debuguear problemas
- Los tests te ahorran tiempo de búsqueda manual


### **¿Qué aprendes con el testing?**

1. **Validación de datos:**
   - Cómo verificar que los datos sean correctos
   - Tipos de datos, formatos, estructuras

2. **Debugging:**
   - Identificar errores específicos
   - Leer mensajes de error
   - Solucionar problemas sistemáticamente

3. **Buenas prácticas:**
   - Testing antes de deployment
   - Validación automática
   - Reportes de calidad

---

## 📚 Recursos Adicionales

### **Herramientas de testing online:**
- [Postman](https://www.postman.com/) - Testing de APIs
- [JSONLint](https://jsonlint.com/) - Validar JSON
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging

### **Documentación:**
- [MDN - Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [Jest - Framework de testing](https://jestjs.io/)
- [Google Apps Script - Testing](https://developers.google.com/apps-script/guides/support/troubleshooting)



