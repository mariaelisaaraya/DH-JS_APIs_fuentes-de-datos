// ============================================
// CONFIGURACIÓN DE LA API
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbzMSpNjG5LLH7WEQa99tsdKhjvVRKAhNSuSQkbZ-NoDwNNcJkvp7VNfKWYCYvYzkcbpFg/exec';

// ============================================
// VARIABLES GLOBALES
// ============================================

let todosLosProductos = []; // Almacena todos los productos
let productosFiltrados = []; // Almacena productos después de aplicar filtros

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const contenedor = document.getElementById('contenedor-productos');
const loading = document.getElementById('loading');
const errorMensaje = document.getElementById('error-mensaje');
const sinResultados = document.getElementById('sin-resultados');
const filtroMarca = document.getElementById('filtro-marca');
const selectOrdenar = document.getElementById('ordenar');
const totalProductos = document.getElementById('total-productos');

// ============================================
// FUNCIÓN PRINCIPAL: INICIAR LA APLICACIÓN
// ============================================

async function iniciarApp() {
    console.log('🚀 Iniciando aplicación...');
    
    // Mostrar indicador de carga
    mostrarCargando(true);
    
    try {
        // Hacer la petición a la API
        console.log('📡 Consultando API:', API_URL);
        const response = await fetch(API_URL);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Convertir la respuesta a JSON
        const respuesta = await response.json();
        console.log('✅ Respuesta completa recibida:', respuesta);
        
        // ⚠️ IMPORTANTE: El código de Digital House devuelve los datos en respuesta.datos
        const datos = respuesta.datos;
        
        // Verificar que hay datos
        if (!datos || datos.length === 0) {
            throw new Error('No hay datos en la respuesta');
        }
        
        console.log(`📊 ${datos.length} productos cargados correctamente`);
        
        // Guardar los datos
        todosLosProductos = datos;
        productosFiltrados = datos;
        
        // Configurar los filtros
        configurarFiltros();
        
        // Mostrar los productos
        mostrarProductos(productosFiltrados);
        
        // Ocultar indicador de carga
        mostrarCargando(false);
        
    } catch (error) {
        console.error('❌ Error al cargar los datos:', error);
        mostrarError();
        mostrarCargando(false);
    }
}

// ============================================
// FUNCIÓN: MOSTRAR PRODUCTOS
// ============================================

function mostrarProductos(productos) {
    // Limpiar el contenedor
    contenedor.innerHTML = '';
    
    // Ocultar mensajes
    errorMensaje.style.display = 'none';
    sinResultados.style.display = 'none';
    
    // Verificar si hay productos
    if (productos.length === 0) {
        sinResultados.style.display = 'block';
        totalProductos.textContent = '0 productos encontrados';
        return;
    }
    
    // Actualizar contador
    totalProductos.textContent = `${productos.length} productos encontrados`;
    
    // Crear una tarjeta para cada producto
    productos.forEach(producto => {
        crearTarjetaProducto(producto);
    });
}

// ============================================
// FUNCIÓN: CREAR TARJETA DE PRODUCTO
// ============================================

function crearTarjetaProducto(producto) {
    // Crear el elemento principal (card)
    const card = document.createElement('div');
    card.classList.add('producto-card');
    
    // Crear imagen
    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = `${producto.marca} ${producto.modelo}`;
    imagen.classList.add('producto-imagen');
    
    // Manejar error de carga de imagen
    imagen.onerror = function() {
        this.src = 'https://via.placeholder.com/250x250?text=Sin+Imagen';
    };
    
    // Crear contenedor de información
    const info = document.createElement('div');
    info.classList.add('producto-info');
    
    // Crear marca
    const marca = document.createElement('div');
    marca.classList.add('producto-marca');
    marca.textContent = producto.marca;
    
    // Crear modelo
    const modelo = document.createElement('h3');
    modelo.classList.add('producto-modelo');
    modelo.textContent = producto.modelo;
    
    // Crear contenedor de detalles
    const detalles = document.createElement('div');
    detalles.classList.add('producto-detalles');
    
    // Crear precio
    const precio = document.createElement('span');
    precio.classList.add('producto-precio');
    precio.textContent = producto.precio;
    
    // Crear año
    const año = document.createElement('span');
    año.classList.add('producto-año');
    año.textContent = producto.lanzamiento;
    
    // Crear ID (opcional)
    const id = document.createElement('div');
    id.classList.add('producto-id');
    id.textContent = `ID: ${producto.idCelular}`;
    
    // Ensamblar la tarjeta
    detalles.appendChild(precio);
    detalles.appendChild(año);
    
    info.appendChild(marca);
    info.appendChild(modelo);
    info.appendChild(detalles);
    info.appendChild(id);
    
    card.appendChild(imagen);
    card.appendChild(info);
    
    // Agregar al contenedor principal
    contenedor.appendChild(card);
}

// ============================================
// FUNCIÓN: CONFIGURAR FILTROS
// ============================================

function configurarFiltros() {
    // Obtener todas las marcas únicas
    const marcasUnicas = [...new Set(todosLosProductos.map(p => p.marca))];
    marcasUnicas.sort();
    
    // Agregar opciones al select de marcas
    marcasUnicas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        filtroMarca.appendChild(option);
    });
    
    // Evento: Cambio de marca
    filtroMarca.addEventListener('change', aplicarFiltros);
    
    // Evento: Cambio de ordenamiento
    selectOrdenar.addEventListener('change', aplicarFiltros);
}

// ============================================
// FUNCIÓN: APLICAR FILTROS Y ORDENAMIENTO
// ============================================

function aplicarFiltros() {
    // Empezar con todos los productos
    let productos = [...todosLosProductos];
    
    // FILTRAR POR MARCA
    const marcaSeleccionada = filtroMarca.value;
    if (marcaSeleccionada !== 'todas') {
        productos = productos.filter(p => p.marca === marcaSeleccionada);
    }
    
    // ORDENAR
    const ordenamiento = selectOrdenar.value;
    
    switch (ordenamiento) {
        case 'nombre':
            productos.sort((a, b) => a.modelo.localeCompare(b.modelo));
            break;
            
        case 'precio-asc':
            productos.sort((a, b) => {
                const precioA = parseFloat(a.precio.replace(/[$,]/g, ''));
                const precioB = parseFloat(b.precio.replace(/[$,]/g, ''));
                return precioA - precioB;
            });
            break;
            
        case 'precio-desc':
            productos.sort((a, b) => {
                const precioA = parseFloat(a.precio.replace(/[$,]/g, ''));
                const precioB = parseFloat(b.precio.replace(/[$,]/g, ''));
                return precioB - precioA;
            });
            break;
            
        case 'año-nuevo':
            productos.sort((a, b) => b.lanzamiento - a.lanzamiento);
            break;
    }
    
    // Guardar productos filtrados y mostrarlos
    productosFiltrados = productos;
    mostrarProductos(productosFiltrados);
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function mostrarCargando(mostrar) {
    loading.style.display = mostrar ? 'block' : 'none';
}

function mostrarError() {
    errorMensaje.style.display = 'block';
    contenedor.innerHTML = '';
}

// ============================================
// INICIAR LA APLICACIÓN AL CARGAR LA PÁGINA
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', iniciarApp);

// Mensaje de bienvenida en la consola
console.log(`
╔═══════════════════════════════════════╗
║   📱 Catálogo de Celulares           ║
║   🎓 Ejemplo educativo               ║
║   🔗 Google Sheets + JavaScript      ║
╚═══════════════════════════════════════╝

📝 Recuerda:
1. Configura tu Google Sheet como API
2. Reemplaza la URL en la variable API_URL
3. Abre la consola para ver los logs
`);