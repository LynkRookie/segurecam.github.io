document.addEventListener('DOMContentLoaded', function() {
    // Import Lucide icons
    const lucide = window.lucide;

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    }
    
    // Search toggle
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchClose = document.querySelector('.search-close');
    
    if (searchToggle && searchContainer) {
        searchToggle.addEventListener('click', function() {
            searchContainer.classList.remove('hidden');
            searchToggle.classList.add('hidden');
            searchContainer.querySelector('input').focus();
        });
    }
    
    if (searchClose && searchContainer && searchToggle) {
        searchClose.addEventListener('click', function() {
            searchContainer.classList.add('hidden');
            searchToggle.classList.remove('hidden');
        });
    }
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Camera grid view toggle
    const viewToggle = document.getElementById('view-toggle');
    const gridSizeToggle = document.getElementById('grid-size-toggle');
    const cameraGrid = document.getElementById('camera-grid');
    
    let isGridView = true;
    let isLargeGrid = true;
    
    if (viewToggle) {
        viewToggle.addEventListener('click', function() {
            isGridView = !isGridView;
            
            if (isGridView) {
                viewToggle.innerHTML = '<i data-lucide="maximize-2"></i> Vista única';
                if (cameraGrid) {
                    cameraGrid.classList.remove('single-view');
                    if (isLargeGrid) {
                        cameraGrid.classList.add('large-grid');
                    } else {
                        cameraGrid.classList.remove('large-grid');
                    }
                }
            } else {
                viewToggle.innerHTML = '<i data-lucide="grid-3x3"></i> Vista cuadrícula';
                if (cameraGrid) {
                    cameraGrid.classList.add('single-view');
                    cameraGrid.classList.remove('large-grid');
                }
            }
            
            lucide.createIcons();
        });
    }
    
    if (gridSizeToggle) {
        gridSizeToggle.addEventListener('click', function() {
            if (!isGridView) return;
            
            isLargeGrid = !isLargeGrid;
            
            if (isLargeGrid) {
                gridSizeToggle.innerHTML = '<i data-lucide="grid-3x3"></i> 3×3';
                if (cameraGrid) {
                    cameraGrid.classList.add('large-grid');
                }
            } else {
                gridSizeToggle.innerHTML = '<i data-lucide="grid-3x3"></i> 2×2';
                if (cameraGrid) {
                    cameraGrid.classList.remove('large-grid');
                }
            }
            
            lucide.createIcons();
        });
    }
    
    // Camera data
    const cameras = [
        { id: "1", name: "Entrada Principal", status: "online", hasMotion: false },
        { id: "2", name: "Patio Trasero", status: "online", hasMotion: true },
        { id: "3", name: "Garaje", status: "online", hasMotion: false },
        { id: "4", name: "Pasillo", status: "offline", hasMotion: false },
        { id: "5", name: "Sala de estar", status: "online", hasMotion: false },
        { id: "6", name: "Cocina", status: "online", hasMotion: false },
    ];
    
    // Render camera grid
    const cameraGridElement = document.getElementById('camera-grid');
    
    if (cameraGridElement) {
        renderCameraGrid(cameras, cameraGridElement);
    }
    
    function renderCameraGrid(cameras, container) {
        container.innerHTML = '';
        
        cameras.forEach(camera => {
            const card = document.createElement('div');
            card.className = `camera-card ${camera.status === 'offline' ? 'offline' : ''}`;
            card.setAttribute('data-id', camera.id);
            
            card.innerHTML = `
                <div class="camera-feed">
                    ${camera.status === 'online' ? 
                        `<img src="img/camera-${camera.id}.jpg" alt="Cámara ${camera.name}" onerror="this.src='img/placeholder-camera.jpg'">` : 
                        `<div class="camera-offline">
                            <i data-lucide="wifi-off" class="h-8 w-8 text-muted-foreground"></i>
                            <span class="text-sm text-muted-foreground">Sin conexión</span>
                        </div>`
                    }
                    
                    <div class="camera-actions">
                        <div class="dropdown">
                            <button class="camera-action-button">
                                <i data-lucide="more-vertical" class="h-4 w-4"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="camera.html?id=${camera.id}" class="dropdown-item">Ver detalles</a>
                                <a href="#" class="dropdown-item">Tomar captura</a>
                                <a href="#" class="dropdown-item">Iniciar grabación</a>
                                <a href="#" class="dropdown-item">Configurar alertas</a>
                            </div>
                        </div>
                        
                        <a href="camera.html?id=${camera.id}" class="camera-action-button">
                            <i data-lucide="expand" class="h-4 w-4"></i>
                        </a>
                    </div>
                    
                    <div class="camera-name">
                        ${camera.name}
                    </div>
                    
                    <div class="camera-status">
                        ${camera.status === 'online' ? 
                            `<div class="camera-status-badge online">
                                <i data-lucide="wifi" class="h-3 w-3"></i>
                                En línea
                            </div>` : 
                            `<div class="camera-status-badge offline">
                                <i data-lucide="wifi-off" class="h-3 w-3"></i>
                                Sin conexión
                            </div>`
                        }
                        
                        ${camera.hasMotion ? 
                            `<div class="camera-status-badge motion">
                                <i data-lucide="alert-triangle" class="h-3 w-3"></i>
                                Movimiento
                            </div>` : 
                            ''
                        }
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        // Add click event to camera cards
        const cameraCards = document.querySelectorAll('.camera-card');
        cameraCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on a button or link
                if (e.target.closest('button') || e.target.closest('a')) {
                    return;
                }
                
                const cameraId = this.getAttribute('data-id');
                const camera = cameras.find(c => c.id === cameraId);
                
                if (camera.status === 'offline') {
                    return;
                }
                
                if (!isGridView) {
                    // Already in single view, do nothing
                    return;
                }
                
                // Toggle selected state
                cameraCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Reinitialize Lucide icons
        lucide.createIcons();
    }
    
    // Alerts data
    const alerts = [
        {
            type: "motion",
            camera: "Entrada Principal",
            time: "Hace 5 minutos",
            severity: "high",
        },
        {
            type: "person",
            camera: "Patio Trasero",
            time: "Hace 15 minutos",
            severity: "medium",
        },
        {
            type: "disconnect",
            camera: "Pasillo",
            time: "Hace 20 minutos",
            severity: "high",
        }
    ];
    
    // Render alerts
    const alertsList = document.querySelector('.alerts-list');
    
    if (alertsList) {
        renderAlerts(alerts, alertsList);
    }
    
    function renderAlerts(alerts, container) {
        container.innerHTML = '';
        
        alerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert-item';
            
            let icon, title;
            
            switch(alert.type) {
                case 'motion':
                    icon = 'alert-triangle';
                    title = 'Movimiento detectado';
                    break;
                case 'person':
                    icon = 'users';
                    title = 'Persona detectada';
                    break;
                case 'disconnect':
                    icon = 'alert-triangle';
                    title = 'Cámara desconectada';
                    break;
                default:
                    icon = 'alert-triangle';
                    title = 'Alerta';
            }
            
            let badgeClass;
            let badgeText;
            
            switch(alert.severity) {
                case 'high':
                    badgeClass = 'danger';
                    badgeText = 'Alta';
                    break;
                case 'medium':
                    badgeClass = 'warning';
                    badgeText = 'Media';
                    break;
                case 'low':
                    badgeClass = 'info';
                    badgeText = 'Baja';
                    break;
                default:
                    badgeClass = 'secondary';
                    badgeText = 'Info';
            }
            
            alertItem.innerHTML = `
                <div class="alert-icon-wrapper ${alert.severity}">
                    <i data-lucide="${icon}" class="h-5 w-5 ${alert.type === 'person' ? 'text-blue-500' : alert.type === 'disconnect' ? 'text-red-500' : 'text-amber-500'}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-header">
                        <h3 class="alert-title">${title}</h3>
                        <span class="badge ${badgeClass}">${badgeText}</span>
                    </div>
                    <p class="alert-details">${alert.camera} • ${alert.time}</p>
                </div>
                <button class="btn btn-text">Ver</button>
            `;
            
            container.appendChild(alertItem);
        });
        
        // Reinitialize Lucide icons
        lucide.createIcons();
    }
    
    // Events data
    const events = [
        {
            id: "1",
            type: "motion",
            camera: "Patio Trasero",
            time: "Hace 5 minutos",
            description: "Movimiento detectado en la zona de vigilancia",
            severity: "high",
        },
        {
            id: "2",
            type: "person",
            camera: "Entrada Principal",
            time: "Hace 15 minutos",
            description: "Persona detectada en la entrada",
            severity: "medium",
        },
        {
            id: "3",
            type: "disconnect",
            camera: "Pasillo",
            time: "Hace 20 minutos",
            description: "La cámara se ha desconectado",
            severity: "high",
        },
        {
            id: "4",
            type: "motion",
            camera: "Garaje",
            time: "Hace 45 minutos",
            description: "Movimiento detectado en la zona de vigilancia",
            severity: "low",
        },
        {
            id: "5",
            type: "connect",
            camera: "Cocina",
            time: "Hace 2 horas",
            description: "La cámara se ha conectado",
            severity: "info",
        }
    ];
    
    // Render events timeline
    const eventsTimeline = document.getElementById('events-timeline');
    
    if (eventsTimeline) {
        renderEventsTimeline(events, eventsTimeline);
    }
    
    function renderEventsTimeline(events, container) {
        container.innerHTML = '';
        
        events.forEach((event, index) => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            
            let icon;
            
            switch(event.type) {
                case 'motion':
                    icon = 'alert-triangle';
                    break;
                case 'person':
                    icon = 'user';
                    break;
                case 'disconnect':
                    icon = 'wifi-off';
                    break;
                case 'connect':
                    icon = 'camera';
                    break;
                default:
                    icon = 'alert-triangle';
            }
            
            eventItem.innerHTML = `
                <div class="event-icon ${event.severity}">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center ${event.severity === 'high' ? 'bg-red-500/30' : event.severity === 'medium' ? 'bg-amber-500/30' : event.severity === 'low' ? 'bg-blue-500/30' : 'bg-green-500/30'}">
                        <i data-lucide="${icon}" class="h-5 w-5 ${event.severity === 'high' ? 'text-red-500' : event.severity === 'medium' ? 'text-amber-500' : event.severity === 'low' ? 'text-blue-500' : 'text-green-500'}"></i>
                    </div>
                </div>
                <div class="event-content">
                    <div class="event-header">
                        <h3 class="event-title">${event.camera}</h3>
                        <span class="badge ${event.severity === 'high' ? 'danger' : event.severity === 'medium' ? 'warning' : event.severity === 'low' ? 'info' : 'success'}">
                            ${event.type === 'motion' ? 'Movimiento' : event.type === 'person' ? 'Persona' : event.type === 'disconnect' ? 'Desconexión' : 'Conexión'}
                        </span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-time">
                        <i data-lucide="clock" class="h-3 w-3"></i>
                        ${event.time}
                    </div>
                </div>
                ${index !== events.length - 1 ? '<div class="event-connector"></div>' : ''}
            `;
            
            container.appendChild(eventItem);
        });
        
        // Reinitialize Lucide icons
        lucide.createIcons();
    }
});