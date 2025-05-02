function loadSidebar() {
    const sidebar = document.getElementById('sidebar');
    
    // Cargar el contenido del sidebar
    fetch('components/sidebar.html')
        .then(response => response.text())
        .then(html => {
            sidebar.innerHTML = html;
            
            // Inicializar los iconos de Feather
            if (typeof feather !== 'undefined') {
                feather.replace();
            } else {
                console.warn('Feather icons not loaded. Make sure Feather icons are included in your project.');
            }
            
            // Marcar la página actual como activa
            const currentPage = getCurrentPage();
            const activeLink = sidebar.querySelector(`.sidebar-link[data-page="${currentPage}"]`);
            
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            // Manejar el botón de cerrar sidebar en móviles
            const closeSidebarBtn = document.getElementById('close-sidebar-btn');
            if (closeSidebarBtn) {
                closeSidebarBtn.addEventListener('click', function() {
                    sidebar.classList.remove('open');
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar el sidebar:', error);
        });
}

// Función para obtener la página actual basada en la URL
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (!filename || filename === '' || filename === 'index.html') {
        return 'home';
    }
    
    return filename.replace('.html', '');
}

// Función para alternar la visibilidad del sidebar en móviles
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}