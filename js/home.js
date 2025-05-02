document.addEventListener('DOMContentLoaded', function() {
    // Import Lucide icons (or declare the variable if already imported elsewhere)
    if (typeof lucide === 'undefined') {
        // Assuming Lucide is available globally after including the script
        // If not, you'll need to import it using a module bundler or similar
        // Example: import * as lucide from 'lucide';
        console.warn("Lucide is not explicitly imported. Ensure it's available globally.");
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
    
    // Feature cards data
    const features = [
        {
            title: "Análisis en tiempo real",
            description: "Analiza el comportamiento y detecta anomalías con algoritmos de IA avanzados y procesamiento en el borde.",
            icon: "bar-chart-3",
            link: "/features/analytics"
        },
        {
            title: "Reconocimiento facial",
            description: "Identifica personas y recibe alertas cuando se detecten rostros desconocidos con precisión superior al 99.7%.",
            icon: "shield",
            link: "/features/facial-recognition"
        },
        {
            title: "Alertas inteligentes",
            description: "Recibe notificaciones personalizadas basadas en eventos específicos con filtrado de falsos positivos.",
            icon: "bell",
            link: "/features/alerts"
        },
        {
            title: "Control total",
            description: "Controla remotamente tus cámaras con funciones PTZ avanzadas, preajustes y programación automatizada.",
            icon: "settings",
            link: "/features/control"
        },
        {
            title: "Almacenamiento seguro",
            description: "Guarda grabaciones en la nube, localmente o en tarjetas SD con cifrado de extremo a extremo.",
            icon: "lock",
            link: "/features/storage"
        },
        {
            title: "Acceso multidispositivo",
            description: "Accede desde cualquier dispositivo con una interfaz adaptada y optimizada para cada plataforma.",
            icon: "plus-circle",
            link: "/features/access"
        }
    ];
    
    const aiFeatures = [
        {
            title: "Detección de anomalías",
            description: "Identifica comportamientos inusuales y patrones sospechosos mediante aprendizaje automático avanzado.",
            icon: "bar-chart-3",
            link: "/ai/anomaly-detection"
        },
        {
            title: "Análisis predictivo",
            description: "Anticipa posibles incidentes de seguridad basados en patrones históricos y comportamiento actual.",
            icon: "shield",
            link: "/ai/predictive-analytics"
        },
        {
            title: "Reconocimiento de objetos",
            description: "Detecta y clasifica vehículos, paquetes, mascotas y otros objetos con alta precisión.",
            icon: "bell",
            link: "/ai/object-recognition"
        },
        {
            title: "Seguimiento inteligente",
            description: "Sigue automáticamente a personas y objetos entre múltiples cámaras sin perder el objetivo.",
            icon: "settings",
            link: "/ai/smart-tracking"
        },
        {
            title: "Análisis de audio",
            description: "Detecta sonidos anómalos como cristales rotos, gritos o alarmas para una respuesta más rápida.",
            icon: "lock",
            link: "/ai/audio-analytics"
        },
        {
            title: "Visión nocturna mejorada",
            description: "Mejora la calidad de imagen en condiciones de poca luz mediante procesamiento de IA.",
            icon: "plus-circle",
            link: "/ai/night-vision"
        }
    ];
    
    const integrations = [
        {
            title: "Domótica inteligente",
            description: "Integración con sistemas de hogar inteligente como Google Home, Amazon Alexa y Apple HomeKit.",
            icon: "bar-chart-3",
            link: "/integrations/smart-home"
        },
        {
            title: "Control de acceso",
            description: "Conecta con sistemas de control de acceso para una seguridad física y digital unificada.",
            icon: "shield",
            link: "/integrations/access-control"
        },
        {
            title: "Alarmas y sensores",
            description: "Vincula con sistemas de alarma y sensores para una respuesta coordinada ante incidentes.",
            icon: "bell",
            link: "/integrations/alarms"
        },
        {
            title: "Servicios de emergencia",
            description: "Conexión directa con servicios de seguridad y emergencia para respuesta inmediata.",
            icon: "settings",
            link: "/integrations/emergency"
        },
        {
            title: "APIs abiertas",
            description: "Integra con tus propias aplicaciones y servicios mediante nuestras APIs RESTful.",
            icon: "lock",
            link: "/integrations/api"
        },
        {
            title: "Automatización",
            description: "Crea flujos de trabajo automatizados con plataformas como Zapier, IFTTT y Microsoft Power Automate.",
            icon: "plus-circle",
            link: "/integrations/automation"
        }
    ];
    
    // Render feature cards
    const featuresGrid = document.querySelector('#features .features-grid');
    const aiGrid = document.querySelector('#ai .features-grid');
    const integrationsGrid = document.querySelector('#integrations .features-grid');
    
    if (featuresGrid) {
        renderFeatureCards(features, featuresGrid);
    }
    
    if (aiGrid) {
        renderFeatureCards(aiFeatures, aiGrid, 'blue');
    }
    
    if (integrationsGrid) {
        renderFeatureCards(integrations, integrationsGrid, 'green');
    }
    
    function renderFeatureCards(items, container, colorClass = 'primary') {
        container.innerHTML = '';
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feature-card';
            
            const iconColor = colorClass === 'primary' ? 'text-primary' : 
                             colorClass === 'blue' ? 'text-blue-500' : 
                             'text-green-500';
            
            const bgColor = colorClass === 'primary' ? 'bg-primary/10 group-hover:bg-primary/20' : 
                           colorClass === 'blue' ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 
                           'bg-green-500/10 group-hover:bg-green-500/20';
            
            card.innerHTML = `
                <div class="feature-icon-wrapper ${bgColor}">
                    <i data-lucide="${item.icon}" class="feature-icon ${iconColor}"></i>
                </div>
                <h3 class="feature-title">${item.title}</h3>
                <p class="feature-description">${item.description}</p>
                <a href="${item.link}" class="feature-link ${iconColor}">
                    Saber más
                    <i data-lucide="arrow-right" class="h-4 w-4"></i>
                </a>
            `;
            
            container.appendChild(card);
        });
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
            lucide.createIcons();
        } else {
            console.warn("Lucide is not properly initialized. Icons may not be rendered.");
        }
    }
    
    // Testimonials data
    const testimonials = [
        {
            quote: "Este sistema ha transformado completamente nuestra seguridad. La detección de anomalías nos ha permitido prevenir varios incidentes antes de que ocurrieran.",
            name: "Carlos Rodríguez",
            role: "Director de Seguridad, Empresa Multinacional"
        },
        {
            quote: "La facilidad de uso combinada con la potencia de la IA hace que este sistema sea incomparable. Ahora podemos monitorear todas nuestras ubicaciones desde una sola plataforma.",
            name: "María González",
            role: "Propietaria, Cadena de Tiendas"
        },
        {
            quote: "El reconocimiento facial y la detección de objetos han mejorado nuestra seguridad en un 200%. La integración con nuestros sistemas existentes fue sorprendentemente sencilla.",
            name: "Alejandro Torres",
            role: "CTO, Empresa de Logística"
        }
    ];
    
    // Render testimonial cards
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    
    if (testimonialsGrid) {
        testimonialsGrid.innerHTML = '';
        
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            
            card.innerHTML = `
                <div class="stars">
                    ${Array(5).fill('<i data-lucide="star" class="star"></i>').join('')}
                </div>
                <p class="testimonial-quote">"${testimonial.quote}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        <span class="author-initial">${testimonial.name.charAt(0)}</span>
                    </div>
                    <div class="author-info">
                        <div class="author-name">${testimonial.name}</div>
                        <div class="author-role">${testimonial.role}</div>
                    </div>
                </div>
            `;
            
            testimonialsGrid.appendChild(card);
        });
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
            lucide.createIcons();
        } else {
            console.warn("Lucide is not properly initialized. Icons may not be rendered.");
        }
    }
});