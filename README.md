# 📱 Catálogo de Celulares - Google Sheets + JavaScript


[![Ver Demo](https://img.shields.io/badge/🌐_Ver_Demo_en_Vivo-9556f6?style=for-the-badge)](https://mariaelisaaraya.github.io/DH-JS_APIs_fuentes-de-datos/catalogo-celulares/)
[![Video Tutorial](https://img.shields.io/badge/▶️_Video_Tutorial-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/d75sswDeDpw?si=761xxHoFkfWaeapU)
[![GitHub](https://img.shields.io/badge/GitHub-mariaelisaaraya-181717?style=for-the-badge&logo=github)](https://github.com/mariaelisaaraya)

**Proyecto educativo para Digital House  -  "JS: APIs + fuentes de datos"**

Una aplicación web que conecta una Google Sheet con JavaScript mediante Google Apps Script, permitiendo mostrar y filtrar productos dinámicamente desde una hoja de cálculo.

---

## 🚀 Características

**Conexión con Google Sheets** - Los datos se obtienen en tiempo real desde una hoja de cálculo  
**Diseño moderno** - Interfaz con animaciones CSS y paleta de colores de Digital House  
**Filtros dinámicos** - Filtrar por marca y ordenar por precio, nombre o año  
**102 productos** - Catálogo completo de celulares de diferentes marcas  
**Sistema de testing** - Herramientas para validar que el API funcione correctamente  
**Responsive** - Se adapta a diferentes tamaños de pantalla  

---

## 📂 Estructura del Proyecto

```
catalogo-celulares/
│
├── index.html                    # Página principal de la aplicación
├── styles.css                    # Estilos CSS con animaciones y diseño
├── script.js                     # Lógica JavaScript (fetch, filtros, DOM)
├── README.md                     # Este archivo
│
├── apps-script/
│   └── codigo.gs                 # Código para Google Apps Script (provisto por DH)
│
├── docs/
│   └── explicacion.pdf           # Refuerzo con PPT
│
└── test/
    ├── testing-api.html          # Testing visual en navegador 
    ├── test-api.js               # Testing con Node.js (avanzado)
    ├── package.json              # Dependencias para Node.js
    └── GUIA_TESTING.md           # Documentación completa de testing
```

---

## 🛠️ Instalación y Configuración

### **Paso 1: Configurar Google Apps Script**

1. Abre tu Google Sheet con los datos de productos
2. Ve a **Extensiones** > **Apps Script**
3. Borra el código por defecto
4. **Copia el código** del archivo `apps-script/codigo.gs`  
   > 📝 Este código es proporcionado por Digital House y convierte tu Google Sheet en una API REST
5. Pégalo en el editor de Apps Script
6. Click en **Implementar** > **Nueva implementación**
7. Selecciona tipo: **Aplicación web**
8. Configura:
   - **Ejecutar como:** Yo (tu email)
   - **Quién tiene acceso:** **Cualquier usuario** ⚠️ (muy importante)
9. Click en **Implementar** y **Autorizar**
10. **Copia la URL** generada (termina en `/exec`)

### **Paso 2: Configurar el Código JavaScript**

1. Abre el archivo `script.js`
2. En la **línea 7**, reemplaza la URL:
   ```javascript
   const API_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';
   ```
3. Pega la URL que copiaste del paso anterior
4. Guarda el archivo

### **Paso 3: Abrir la Aplicación**

1. Abre `index.html` en tu navegador
2. Los datos deberían cargarse automáticamente
3. Prueba los filtros y el ordenamiento

> ⚠️ **Importante:** Si ves un error de CORS, verifica que en Apps Script hayas seleccionado **"Cualquier usuario"** (no "Cualquier usuario con cuenta de Google")

---

## 🧪 Testing del API

La carpeta `/test/` contiene **dos opciones de testing**:

### **Opción 1: Testing Visual (Recomendado)** 
📍 **Ubicación:** `test/testing-api.html`

**Ventajas:**
- ✅ No requiere instalación
- ✅ Se abre directamente en el navegador
- ✅ Interfaz visual con reportes claros
- ✅ Ideal para validación rápida

**Cómo usar:**
1. Abre `test/testing-api.html` en tu navegador
2. Pega la URL de tu API
3. Click en "Ejecutar Todos los Tests"
4. Revisa los resultados

### **Opción 2: Testing con Node.js (Avanzado)**
📍 **Ubicación:** `test/test-api.js`

**Características:**
- Testing automático desde terminal
- Para CI/CD y automatización
- Requiere Node.js instalado

**Uso rápido:**
```bash
cd test
npm install
npm test
```

📚 **Documentación completa de testing:** `test/GUIA_TESTING.md`

---

## 💻 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura de la aplicación |
| **CSS3** | Estilos, animaciones, glassmorphism |
| **JavaScript (ES6+)** | Lógica, fetch API, manipulación del DOM |
| **Google Apps Script** | Backend - Convierte Google Sheet en API REST |
| **Google Sheets** | Base de datos (102 productos) |

---

## 📚 Conceptos Técnicos Demostrados

**Fetch API** - Peticiones asíncronas con `async/await`  
**Manipulación del DOM** - `createElement()`, `appendChild()`, `classList`  
**Array Methods** - `forEach()`, `filter()`, `map()`, `sort()`  
**Event Listeners** - Interactividad con filtros y ordenamiento  
**Template Literals** - Construcción dinámica de strings  
**Error Handling** - `try/catch` para manejo de errores  
**CSS Animations** - `@keyframes`, `transform`, `transition`  
**Responsive Design** - `@media queries`, `flexbox`, `grid`  

---

## 🎨 Diseño

El proyecto utiliza la **paleta oficial de Digital House**:

- 🟣 **Violeta Principal:** `#9556f6`
- 🔵 **Azul DH:** `#4585ff`
- 🟢 **Verde Acento:** `#00cc7e`
- ⚫ **Negro DH:** `#000000` / `#1a1a1a`
- ⚪ **Gris Claro:** `#b3b3b3`

**Efectos visuales:**
- Glassmorphism (vidrio esmerilado)
- Animaciones CSS (float, pulse, slide-in)
- Sombras brutales estilo brutalism
- Efectos hover interactivos

---

## 🐛 Solución de Problemas

### **Error: "Failed to fetch"**
- Verifica que la URL del API termine en `/exec`
- Asegúrate de haber configurado "Cualquier usuario" en Apps Script

### **Error: "CORS policy"**
- En Apps Script debe estar en "Cualquier usuario" (sin "con cuenta de Google")
-  Re-implementa la aplicación web si es necesario

### **No se muestran los productos**
- Abre la consola del navegador (F12)
- Verifica que `API_URL` en `script.js` sea correcta
- Usa el sistema de testing (`test/testing-api.html`)

**Más ayuda:** Ver `test/GUIA_TESTING.md`

---

## 📖 Documentación Adicional

En la carpeta `/docs/`:
- **`tutorial.pdf`** - Explicación completa de la API por medio de PPT

---

## 👩‍💻 Autora

**María Elisa Araya**

[![GitHub](https://img.shields.io/badge/GitHub-mariaelisaaraya-181717?style=for-the-badge&logo=github)](https://github.com/mariaelisaaraya)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-arayamariaelisa-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/arayamariaelisa/)

[![Portfolio](https://img.shields.io/badge/Portfolio-Ver_Proyectos-9556f6?style=for-the-badge)](https://portfolio-ame-arg.vercel.app/)

---

## 🏫 Créditos

Proyecto desarrollado de **"JS: APIs + fuentes de datos"** para **Digital House Argentina**.

- **Institución:** [Digital House](https://www.digitalhouse.com/ar)


---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

<div align="center">

**Desarrollado con 💜 por María Elisa Araya para Digital House Argentina**

[⬆️ Volver arriba](#-catálogo-de-celulares---google-sheets--javascript)

</div>
