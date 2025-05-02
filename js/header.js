// Import Feather icons (assuming you're using a module system)
import feather from 'feather-icons';

function loadHeader() {
    const header = document.getElementById('header');
    
    // Cargar el contenido del header
    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            header.innerHTML = html;
            
            // Inicializar los iconos de Feather
            feather.replace();
            
            // Manejar el botón de alternar sidebar en móviles
            const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
            if (toggleSidebarBtn) {
                toggleSidebarBtn.addEventListener('click', function() {
                    toggleSidebar();
                });
            }
            
            // M  {
                    toggleSidebar();
                });
            }
            
            // Manejar el botón de alternar tema
            const themeToggleBtn = document.getElementById('theme-toggle-btn');
            if (themeToggleBtn) {
                themeToggleBtn.addEventListener('click', function() {
                    toggleTheme();
                });
            }
            
            // Manejar el dropdown de notificaciones
            const notificationsBtn = document.getElementById('notifications-btn');
            const notificationsDropdown = document.getElementById('notifications-dropdown');
            
            if (notificationsBtn && notificationsDropdown) {
                notificationsBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    notificationsDropdown.classList.toggle('hidden');
                    
                    // Ocultar el dropdown de usuario si está abierto
                    if (userDropdown && !userDropdown.classList.contains('hidden')) {
                        userDropdown.classList.add('hidden');
                    }
                });
            }
            
            // Manejar el dropdown de usuario
            const userMenuBtn = document.getElementById('user-menu-btn');
            const userDropdown = document.getElementById('user-dropdown');
            
            if (userMenuBtn && userDropdown) {
                userMenuBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    userDropdown.classList.toggle('hidden');
                    
                    // Ocultar el dropdown de notificaciones si está abierto
                    if (notificationsDropdown && !notificationsDropdown.classList.contains('hidden')) {
                        notificationsDropdown.classList.add('hidden');
                    }
                });
            }
            
            // Cerrar los dropdowns al hacer clic fuera de ellos
            document.addEventListener('click', function() {
                if (notificationsDropdown && !notificationsDropdown.classList.contains('hidden')) {
                    notificationsDropdown.classList.add('hidden');
                }
                
                if (userDropdown && !userDropdown.classList.contains('hidden')) {
                    userDropdown.classList.add('hidden');
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el header:', error);
        });
}

// Función para alternar el tema
function toggleTheme() {
    const html = document.documentElement;
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Function to toggle the sidebar (assumed to be defined elsewhere)
function toggleSidebar() {
    // Implementation should be defined in another file, e.g., sidebar.js
    console.log("Toggle sidebar function called");
}