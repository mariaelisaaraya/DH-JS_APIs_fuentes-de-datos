// ============================================
// SCRIPT DE TESTING PARA NODE.JS
// ============================================
// Ejecutar: node test-api.js

const https = require('https');
const http = require('http');

// ============================================
// CONFIGURACIÓN
// ============================================

// 🔴 IMPORTANTE: Coloca aquí la URL de tu API
const API_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

// ============================================
// VARIABLES GLOBALES
// ============================================

let testResults = [];
let apiData = null;
let stats = {
    success: 0,
    error: 0,
    warning: 0,
    total: 0
};

// ============================================
// FUNCIÓN PARA HACER FETCH
// ============================================

function fetchAPI(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        
        const startTime = Date.now();
        protocol.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                
                try {
                    const jsonData = JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        data: jsonData,
                        responseTime: responseTime
                    });
                } catch (error) {
                    reject(new Error('Respuesta no es JSON válido'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// ============================================
// FUNCIÓN PARA REGISTRAR RESULTADO
// ============================================

function logTest(test) {
    testResults.push(test);
    
    const icon = test.status === 'success' ? '✅' : 
                 test.status === 'error' ? '❌' : '⚠️';
    
    const color = test.status === 'success' ? colors.green :
                  test.status === 'error' ? colors.red : colors.yellow;
    
    console.log(`\n${color}${icon} Test ${test.id}: ${test.title}${colors.reset}`);
    console.log(`   ${test.message}`);
    
    if (test.details) {
        console.log(`   ${colors.cyan}${test.details}${colors.reset}`);
    }
    
    // Actualizar estadísticas
    stats[test.status]++;
    stats.total++;
}

// ============================================
// TESTS
// ============================================

async function test1_ValidateURL() {
    const test = {
        id: 1,
        title: 'Validar formato de URL',
        description: 'Verifica que la URL tenga el formato correcto'
    };

    try {
        const isValid = API_URL.includes('script.google.com') && 
                       API_URL.includes('/macros/s/') && 
                       API_URL.endsWith('/exec');
        
        if (isValid) {
            test.status = 'success';
            test.message = 'URL tiene el formato correcto';
        } else if (API_URL === 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI') {
            test.status = 'error';
            test.message = 'No has configurado la URL del API';
            test.details = 'Edita la línea 13 de este archivo con tu URL de Apps Script';
        } else {
            test.status = 'warning';
            test.message = 'URL no parece ser de Google Apps Script';
        }
    } catch (error) {
        test.status = 'error';
        test.message = `Error: ${error.message}`;
    }

    logTest(test);
}

async function test2_FetchAPI() {
    const test = {
        id: 2,
        title: 'Conectar con el API',
        description: 'Intenta hacer una petición al endpoint'
    };

    try {
        const response = await fetchAPI(API_URL);
        apiData = response.data;
        
        test.status = 'success';
        test.message = `Conexión exitosa (${response.responseTime}ms)`;
        test.details = `Status: ${response.status}`;
    } catch (error) {
        test.status = 'error';
        test.message = 'No se pudo conectar al API';
        test.details = error.message;
        apiData = null;
    }

    logTest(test);
}

async function test3_ValidateResponse() {
    const test = {
        id: 3,
        title: 'Validar respuesta del API',
        description: 'Verifica que la respuesta sea válida'
    };

    if (!apiData) {
        test.status = 'error';
        test.message = 'No se recibió respuesta del API';
    } else if (!Array.isArray(apiData)) {
        test.status = 'error';
        test.message = 'La respuesta no es un array';
        test.details = `Tipo: ${typeof apiData}`;
    } else if (apiData.length === 0) {
        test.status = 'warning';
        test.message = 'Array vacío';
        test.details = 'La Google Sheet no tiene datos';
    } else {
        test.status = 'success';
        test.message = `Array válido con ${apiData.length} registros`;
    }

    logTest(test);
}

async function test4_ValidateStructure() {
    const test = {
        id: 4,
        title: 'Validar estructura',
        description: 'Verifica campos requeridos'
    };

    if (!apiData || apiData.length === 0) {
        test.status = 'error';
        test.message = 'No hay datos para validar';
        logTest(test);
        return;
    }

    const required = ['idCelular', 'marca', 'modelo', 'precio', 'lanzamiento', 'imagen'];
    const fields = Object.keys(apiData[0]);
    const missing = required.filter(f => !fields.includes(f));

    if (missing.length === 0) {
        test.status = 'success';
        test.message = 'Todos los campos presentes';
        test.details = fields.join(', ');
    } else {
        test.status = 'error';
        test.message = `Faltan: ${missing.join(', ')}`;
    }

    logTest(test);
}

async function test5_ValidateFields() {
    const test = {
        id: 5,
        title: 'Validar campos obligatorios',
        description: 'Verifica que no haya campos vacíos'
    };

    if (!apiData || apiData.length === 0) {
        test.status = 'error';
        test.message = 'No hay datos';
        logTest(test);
        return;
    }

    const empty = [];
    apiData.forEach((item, i) => {
        if (!item.idCelular) empty.push(`Fila ${i+1}: falta ID`);
        if (!item.marca) empty.push(`Fila ${i+1}: falta marca`);
        if (!item.modelo) empty.push(`Fila ${i+1}: falta modelo`);
    });

    if (empty.length === 0) {
        test.status = 'success';
        test.message = 'Todos los campos completos';
    } else {
        test.status = 'warning';
        test.message = `${empty.length} campos vacíos`;
        test.details = empty.slice(0, 3).join('\n');
    }

    logTest(test);
}

async function test6_ValidateImages() {
    const test = {
        id: 6,
        title: 'Validar URLs de imágenes',
        description: 'Verifica que las URLs sean válidas'
    };

    if (!apiData || apiData.length === 0) {
        test.status = 'error';
        test.message = 'No hay datos';
        logTest(test);
        return;
    }

    const invalid = [];
    apiData.forEach((item, i) => {
        if (!item.imagen) {
            invalid.push(`Fila ${i+1}: falta imagen`);
        } else if (!item.imagen.match(/^https?:\/\//)) {
            invalid.push(`Fila ${i+1}: URL inválida`);
        }
    });

    if (invalid.length === 0) {
        test.status = 'success';
        test.message = 'Todas las URLs válidas';
    } else {
        test.status = 'warning';
        test.message = `${invalid.length} problemas`;
        test.details = invalid.slice(0, 3).join('\n');
    }

    logTest(test);
}

async function test7_CountRecords() {
    const test = {
        id: 7,
        title: 'Estadísticas',
        description: 'Información de los datos'
    };

    if (!apiData || apiData.length === 0) {
        test.status = 'error';
        test.message = 'No hay datos';
        logTest(test);
        return;
    }

    const marcas = [...new Set(apiData.map(i => i.marca))];
    const años = [...new Set(apiData.map(i => i.lanzamiento))].sort();

    test.status = 'success';
    test.message = `${apiData.length} productos`;
    test.details = `Marcas: ${marcas.length} | Años: ${años.join(', ')}`;

    logTest(test);
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

async function runAllTests() {
    console.log(`\n${colors.bold}${colors.blue}╔═══════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bold}${colors.blue}║   🧪 TESTING DEL API - NODE.JS       ║${colors.reset}`);
    console.log(`${colors.bold}${colors.blue}╚═══════════════════════════════════════╝${colors.reset}\n`);

    // Ejecutar tests
    await test1_ValidateURL();
    
    if (testResults[0].status !== 'error') {
        await test2_FetchAPI();
        await test3_ValidateResponse();
        await test4_ValidateStructure();
        await test5_ValidateFields();
        await test6_ValidateImages();
        await test7_CountRecords();
    }

    // Mostrar resumen
    console.log(`\n${colors.bold}╔═══════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bold}║           📊 RESUMEN                  ║${colors.reset}`);
    console.log(`${colors.bold}╚═══════════════════════════════════════╝${colors.reset}\n`);
    
    console.log(`${colors.green}✅ Exitosos:    ${stats.success}${colors.reset}`);
    console.log(`${colors.red}❌ Errores:     ${stats.error}${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Advertencias: ${stats.warning}${colors.reset}`);
    console.log(`${colors.cyan}📊 Total:       ${stats.total}${colors.reset}`);

    // Conclusión
    console.log('\n');
    if (stats.error === 0) {
        console.log(`${colors.green}${colors.bold}🎉 ¡TODOS LOS TESTS PASARON!${colors.reset}\n`);
    } else if (stats.error < 3) {
        console.log(`${colors.yellow}${colors.bold}⚠️  Hay algunos errores que corregir${colors.reset}\n`);
    } else {
        console.log(`${colors.red}${colors.bold}❌ Hay errores críticos${colors.reset}\n`);
    }

    // Exit code
    process.exit(stats.error > 0 ? 1 : 0);
}

// ============================================
// EJECUTAR
// ============================================

runAllTests().catch(error => {
    console.error(`${colors.red}Error fatal: ${error.message}${colors.reset}`);
    process.exit(1);
});