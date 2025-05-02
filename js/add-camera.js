document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los iconos de Feather
    feather.replace();
    
    // Cargar el sidebar y el header
    loadSidebar();
    loadHeader();
    
    // Referencias a elementos del DOM
    const addCameraForm = document.getElementById('add-camera-form');
    const testConnectionBtn = document.getElementById('test-connection-btn');
    const previewContainer = document.getElementById('preview-container');
    const cameraPreview = document.getElementById('camera-preview');
    
    // Generar automáticamente la URL del stream cuando cambian IP o puerto
    const cameraIpInput = document.getElementById('camera-ip');
    const cameraPortInput = document.getElementById('camera-port');
    const cameraStreamUrlInput = document.getElementById('camera-stream-url');
    
    function updateStreamUrl() {
        const ip = cameraIpInput.value;
        const port = cameraPortInput.value;
        
        if (ip && port) {
            cameraStreamUrlInput.value = `rtsp://${ip}:${port}/stream`;
        }
    }
    
    cameraIpInput.addEventListener('blur', updateStreamUrl);
    cameraPortInput.addEventListener('blur', updateStreamUrl);
    
    // Manejar el botón de prueba de conexión
    testConnectionBtn.addEventListener('click', function() {
        const ip = cameraIpInput.value;
        const port = cameraPortInput.value;
        
        if (!ip) {
            showToast('Por favor, ingrese la dirección IP de la cámara', 'error');
            return;
        }
        
        // Mostrar indicador de carga
        testConnectionBtn.disabled = true;
        testConnectionBtn.innerHTML = '<i data-feather="loader" class="w-4 h-4 mr-2 animate-spin"></i> Conectando...';
        feather.replace();
        
        // Simular prueba de conexión (en un entorno real, esto sería una llamada a la API)
        setTimeout(() => {
            // Simulamos una conexión exitosa
            const success = Math.random() > 0.3; // 70% de probabilidad de éxito
            
            if (success) {
                testConnectionBtn.innerHTML = '<i data-feather="check-circle" class="w-4 h-4 mr-2 test-connection-success"></i> Conectado';
                showToast('Conexión exitosa a la cámara', 'success');
                
                // Mostrar vista previa
                previewContainer.classList.remove('hidden');
                cameraPreview.innerHTML = `
                    <img src="https://via.placeholder.com/640x360.png?text=Vista+Previa+de+Cámara" 
                         alt="Vista previa de cámara" class="w-full h-full object-cover">
                `;
            } else {
                testConnectionBtn.innerHTML = '<i data-feather="x-circle" class="w-4 h-4 mr-2 test-connection-error"></i> Error de conexión';
                showToast('No se pudo conectar a la cámara. Verifique la dirección IP y el puerto.', 'error');
            }
            
            feather.replace();
            
            // Restaurar el botón después de 3 segundos
            setTimeout(() => {
                testConnectionBtn.disabled = false;
                testConnectionBtn.innerHTML = '<i data-feather="wifi" class="w-4 h-4 mr-2"></i> Probar Conexión';
                feather.replace();
            }, 3000);
        }, 2000);
    });
    
    // Manejar el envío del formulario
    addCameraForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const cameraName = document.getElementById('camera-name').value;
        const cameraIp = document.getElementById('camera-ip').value;
        const cameraLocation = document.getElementById('camera-location').value;
        
        if (!cameraName || !cameraIp) {
            showToast('Por favor, complete los campos requeridos', 'error');
            return;
        }
        
        // Mostrar indicador de carga en el botón de envío
        const submitBtn = addCameraForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-feather="loader" class="w-4 h-4 mr-2 animate-spin"></i> Agregando...';
        feather.replace();
        
        // Simular el envío del formulario (en un entorno real, esto sería una llamada a la API)
        setTimeout(() => {
            // Crear un objeto con los datos de la cámara
            const cameraData = {
                id: Date.now().toString(),
                name: cameraName,
                ip: cameraIp,
                location: cameraLocation || 'Sin ubicación',
                type: document.getElementById('camera-type').value,
                streamUrl: cameraStreamUrlInput.value,
                features: {
                    motion: document.getElementById('feature-motion').checked,
                    audio: document.getElementById('feature-audio').checked,
                    night: document.getElementById('feature-night').checked,
                    ptz: document.getElementById('feature-ptz').checked
                },
                status: 'online',
                lastUpdated: new Date().toISOString()
            };
            
            // Obtener las cámaras existentes del almacenamiento local o inicializar un array vacío
            const cameras = JSON.parse(localStorage.getItem('cameras') || '[]');
            
            // Agregar la nueva cámara
            cameras.push(cameraData);
            
            // Guardar en el almacenamiento local
            localStorage.setItem('cameras', JSON.stringify(cameras));
            
            // Mostrar mensaje de éxito
            showToast('Cámara agregada exitosamente', 'success');
            
            // Restaurar el botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            feather.replace();
            
            // Redirigir al panel después de un breve retraso
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 2000);
    });
    
    // Función para mostrar notificaciones toast
    function showToast(message, type = 'info') {
        // Crear el elemento toast
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-20 opacity-0`;
        
        // Aplicar estilos según el tipo
        switch (type) {
            case 'success':
                toast.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                toast.classList.add('bg-red-500', 'text-white');
                break;
            case 'warning':
                toast.classList.add('bg-yellow-500', 'text-white');
                break;
            default:
                toast.classList.add('bg-blue-500', 'text-white');
        }
        
        // Agregar el mensaje
        toast.innerHTML = message;
        
        // Agregar al DOM
        document.body.appendChild(toast);
        
        // Mostrar con animación
        setTimeout(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            
            // Eliminar del DOM después de la animación
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});

// Import Feather icons (assuming you're using a CDN or similar)
// Or declare feather as a global if it's already available
// For example, if you're using a CDN:
// <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
// And then declare:
// const feather = window.feather;

// Mock functions for loadSidebar and loadHeader
function loadSidebar() {
    // Implement your sidebar loading logic here
    console.log('Sidebar loaded');
}

function loadHeader() {
    // Implement your header loading logic here
    console.log('Header loaded');
}