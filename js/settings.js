document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los iconos de Feather
    feather.replace();
    
    // Cargar el sidebar y el header
    loadSidebar();
    loadHeader();
    
    // Gestión de pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Desactivar todas las pestañas
            tabButtons.forEach(btn => btn.classList.remove('tab-active'));
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Activar la pestaña seleccionada
            button.classList.add('tab-active');
            const tabId = button.id.replace('tab-', 'content-');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
    // Gestión del tema
    const themeButtons = document.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'system';
    
    // Marcar el botón del tema actual
    themeButtons.forEach(button => {
        const buttonTheme = button.id.replace('theme-', '');
        if (buttonTheme === currentTheme) {
            button.classList.add('theme-btn-active');
        }
        
        button.addEventListener('click', () => {
            const theme = button.id.replace('theme-', '');
            
            // Actualizar la clase activa
            themeButtons.forEach(btn => btn.classList.remove('theme-btn-active'));
            button.classList.add('theme-btn-active');
            
            // Guardar la preferencia de tema
            localStorage.setItem('theme', theme);
            
            // Aplicar el tema
            applyTheme(theme);
        });
    });
    
    // Función para aplicar el tema
    function applyTheme(theme) {
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    
    // Formulario de configuración general
    const generalSettingsForm = document.getElementById('general-settings-form');
    if (generalSettingsForm) {
        generalSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const refreshInterval = document.getElementById('refresh-interval').value;
            const defaultView = document.getElementById('default-view').value;
            const showOfflineCameras = document.getElementById('show-offline-cameras').checked;
            const enableAnimations = document.getElementById('enable-animations').checked;
            const language = document.getElementById('language-select').value;
            const timezone = document.getElementById('timezone-select').value;
            
            // Guardar la configuración en localStorage
            const settings = {
                refreshInterval,
                defaultView,
                showOfflineCameras,
                enableAnimations,
                language,
                timezone
            };
            
            localStorage.setItem('generalSettings', JSON.stringify(settings));
            
            // Mostrar mensaje de éxito
            showToast('Configuración guardada correctamente', 'success');
        });
        
        // Cargar la configuración guardada
        const savedSettings = JSON.parse(localStorage.getItem('generalSettings') || '{}');
        
        if (savedSettings.refreshInterval) {
            document.getElementById('refresh-interval').value = savedSettings.refreshInterval;
        }
        
        if (savedSettings.defaultView) {
            document.getElementById('default-view').value = savedSettings.defaultView;
        }
        
        if (savedSettings.showOfflineCameras !== undefined) {
            document.getElementById('show-offline-cameras').checked = savedSettings.showOfflineCameras;
        }
        
        if (savedSettings.enableAnimations !== undefined) {
            document.getElementById('enable-animations').checked = savedSettings.enableAnimations;
        }
        
        if (savedSettings.language) {
            document.getElementById('language-select').value = savedSettings.language;
        }
        
        if (savedSettings.timezone) {
            document.getElementById('timezone-select').value = savedSettings.timezone;
        }
    }
    
    // Formulario de notificaciones
    const notificationsForm = document.getElementById('notifications-settings-form');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const enableNotifications = document.getElementById('enable-notifications').checked;
            const notifyMotion = document.getElementById('notify-motion').checked;
            const notifyOffline = document.getElementById('notify-offline').checked;
            const notifyStorage = document.getElementById('notify-storage').checked;
            const notifySystem = document.getElementById('notify-system').checked;
            const notifyBrowser = document.getElementById('notify-browser').checked;
            const notifyEmail = document.getElementById('notify-email').checked;
            const emailAddress = document.getElementById('email-address').value;
            const emailFrequency = document.getElementById('email-frequency').value;
            const notifySms = document.getElementById('notify-sms').checked;
            const phoneNumber = document.getElementById('phone-number').value;
            
            // Guardar la configuración en localStorage
            const settings = {
                enableNotifications,
                notifyMotion,
                notifyOffline,
                notifyStorage,
                notifySystem,
                notifyBrowser,
                notifyEmail,
                emailAddress,
                emailFrequency,
                notifySms,
                phoneNumber
            };
            
            localStorage.setItem('notificationSettings', JSON.stringify(settings));
            
            // Mostrar mensaje de éxito
            showToast('Configuración de notificaciones guardada correctamente', 'success');
        });
        
        // Cargar la configuración guardada
        const savedSettings = JSON.parse(localStorage.getItem('notificationSettings') || '{}');
        
        if (savedSettings.enableNotifications !== undefined) {
            document.getElementById('enable-notifications').checked = savedSettings.enableNotifications;
        }
        
        if (savedSettings.notifyMotion !== undefined) {
            document.getElementById('notify-motion').checked = savedSettings.notifyMotion;
        }
        
        if (savedSettings.notifyOffline !== undefined) {
            document.getElementById('notify-offline').checked = savedSettings.notifyOffline;
        }
        
        if (savedSettings.notifyStorage !== undefined) {
            document.getElementById('notify-storage').checked = savedSettings.notifyStorage;
        }
        
        if (savedSettings.notifySystem !== undefined) {
            document.getElementById('notify-system').checked = savedSettings.notifySystem;
        }
        
        if (savedSettings.notifyBrowser !== undefined) {
            document.getElementById('notify-browser').checked = savedSettings.notifyBrowser;
        }
        
        if (savedSettings.notifyEmail !== undefined) {
            document.getElementById('notify-email').checked = savedSettings.notifyEmail;
        }
        
        if (savedSettings.emailAddress) {
            document.getElementById('email-address').value = savedSettings.emailAddress;
        }
        
        if (savedSettings.emailFrequency) {
            document.getElementById('email-frequency').value = savedSettings.emailFrequency;
        }
        
        if (savedSettings.notifySms !== undefined) {
            document.getElementById('notify-sms').checked = savedSettings.notifySms;
        }
        
        if (savedSettings.phoneNumber) {
            document.getElementById('phone-number').value = savedSettings.phoneNumber;
        }
    }
    
    // Formulario de almacenamiento
    const storageSettingsForm = document.getElementById('storage-settings-form');
    if (storageSettingsForm) {
        storageSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const retentionPeriod = document.getElementById('retention-period').value;
            const recordingQuality = document.getElementById('recording-quality').value;
            const autoDelete = document.getElementById('auto-delete').checked;
            const lowStorageAction = document.getElementById('low-storage-action').checked;
            
            // Guardar la configuración en localStorage
            const settings = {
                retentionPeriod,
                recordingQuality,
                autoDelete,
                lowStorageAction
            };
            
            localStorage.setItem('storageSettings', JSON.stringify(settings));
            
            // Mostrar mensaje de éxito
            showToast('Configuración de almacenamiento guardada correctamente', 'success');
        });
        
        // Cargar la configuración guardada
        const savedSettings = JSON.parse(localStorage.getItem('storageSettings') || '{}');
        
        if (savedSettings.retentionPeriod) {
            document.getElementById('retention-period').value = savedSettings.retentionPeriod;
        }
        
        if (savedSettings.recordingQuality) {
            document.getElementById('recording-quality').value = savedSettings.recordingQuality;
        }
        
        if (savedSettings.autoDelete !== undefined) {
            document.getElementById('auto-delete').checked = savedSettings.autoDelete;
        }
        
        if (savedSettings.lowStorageAction !== undefined) {
            document.getElementById('low-storage-action').checked = savedSettings.lowStorageAction;
        }
    }
    
    // Cambio de contraseña
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                showToast('Por favor, complete todos los campos de contraseña', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showToast('Las contraseñas nuevas no coinciden', 'error');
                return;
            }
            
            // Simular cambio de contraseña (en un entorno real, esto sería una llamada a la API)
            setTimeout(() => {
                showToast('Contraseña cambiada exitosamente', 'success');
                
                // Limpiar los campos
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
            }, 1000);
        });
    }
    
    // Activar 2FA
    const enable2faBtn = document.getElementById('enable-2fa-btn');
    if (enable2faBtn) {
        enable2faBtn.addEventListener('click', function() {
            // En un entorno real, esto abriría un modal con los pasos para configurar 2FA
            alert('Esta funcionalidad estaría disponible en un entorno de producción.');
        });
    }
    
    // Cerrar todas las sesiones
    const logoutAllBtn = document.getElementById('logout-all-btn');
    if (logoutAllBtn) {
        logoutAllBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas cerrar todas las sesiones activas?')) {
                // Simular cierre de sesiones (en un entorno real, esto sería una llamada a la API)
                setTimeout(() => {
                    showToast('Todas las sesiones han sido cerradas', 'success');
                }, 1000);
            }
        });
    }

    // Función para mostrar notificaciones toast
    function showToast(message, type = 'info') {
        // Crear el elemento toastemento toast
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

// Declare feather variable
const feather = {
    replace: () => {
        // This is a placeholder. In a real application, this would be the actual feather.replace() function.
        console.log("feather.replace() called");
    }
};

// Declare loadSidebar function
function loadSidebar() {
    // This is a placeholder. In a real application, this would be the actual loadSidebar() function.
    console.log("loadSidebar() called");
}

// Declare loadHeader function
function loadHeader() {
    // This is a placeholder. In a real application, this would be the actual loadHeader() function.
    console.log("loadHeader() called");
}