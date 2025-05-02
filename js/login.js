document.addEventListener('DOMContentLoaded', function() {
    // Import Feather Icons
    feather.replace();
    
    // Referencias a elementos del DOM
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Manejar el botón de mostrar/ocultar contraseña
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Cambiar el icono
        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.setAttribute('data-feather', 'eye-off');
        } else {
            icon.setAttribute('data-feather', 'eye');
        }
        
        feather.replace();
    });
    
    // Manejar el botón de alternar tema
    themeToggleBtn.addEventListener('click', function() {
        const html = document.documentElement;
        const currentTheme = localStorage.getItem('theme') || 'system';
        
        if (currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Manejar el envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;
        
        // Validación básica
        if (!email || !password) {
            showToast('Por favor, complete todos los campos', 'error');
            return;
        }
        
        // Simular inicio de sesión (en un entorno real, esto sería una llamada a la API)
        const loginBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = loginBtn.innerHTML;
        
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i data-feather="loader" class="w-5 h-5 mr-2 animate-spin"></i> Iniciando sesión...';
        feather.replace();
        
        setTimeout(() => {
            // Credenciales de ejemplo para demostración
            if (email === 'admin@ejemplo.com' && password === 'admin123') {
                showToast('Inicio de sesión exitoso', 'success');
                
                // Redirigir al panel después de un breve retraso
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showToast('Credenciales incorrectas', 'error');
                
                // Restaurar el botón
                loginBtn.disabled = false;
                loginBtn.innerHTML = originalBtnText;
                feather.replace();
            }
        }, 1500);
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