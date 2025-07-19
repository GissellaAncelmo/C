// Variables globales
const profileImages = [
    'https://via.placeholder.com/150x150/667eea/ffffff?text=GISSELLA',
    'https://via.placeholder.com/150x150/ff6b6b/ffffff?text=G.S.A',
    'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=GISS',
    'https://via.placeholder.com/150x150/ffe66d/000000?text=G.L.S',
    'https://via.placeholder.com/150x150/ff8b94/ffffff?text=FULL-STACK',
    'https://via.placeholder.com/150x150/764ba2/ffffff?text=DEV'
];

let currentImageIndex = 0;

// Función para cambiar entre pestañas
function showTab(tabName) {
    // Ocultar todos los contenidos
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover clase active de todos los tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar el contenido seleccionado
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activar el tab seleccionado
    event.target.classList.add('active');
    
    // Animar las barras de habilidades si estamos en la pestaña de skills
    if (tabName === 'skills') {
        setTimeout(animateSkills, 300);
    }
    
    // Mostrar notificación de cambio de sección
    showNotification(`📂 Sección "${getTabDisplayName(tabName)}" cargada`);
}

// Función para obtener el nombre de visualización de las pestañas
function getTabDisplayName(tabName) {
    const tabNames = {
        'about': 'Perfil',
        'experience': 'Experiencia',
        'education': 'Educación',
        'skills': 'Habilidades',
        'projects': 'Proyectos'
    };
    return tabNames[tabName] || tabName;
}

// Función para animar las barras de habilidades
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const skill = bar.getAttribute('data-skill');
        // Resetear la barra
        bar.style.width = '0%';
        // Animar con delay escalonado
        setTimeout(() => {
            bar.style.width = skill + '%';
        }, index * 100);
    });
}

// Función para cambiar la imagen de perfil
function changeProfileImage() {
    const img = document.querySelector('.profile-img');
    currentImageIndex = (currentImageIndex + 1) % profileImages.length;
    img.src = profileImages[currentImageIndex];
    
    // Efecto de rotación al cambiar imagen
    img.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => {
        img.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
    
    showNotification('📸 ¡Imagen de perfil actualizada!');
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Remover notificación existente si la hay
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        font-size: 0.9rem;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Función para descargar el CV
function downloadCV() {
    showNotification('📄 ¡Preparando descarga del CV!');
    
    // Simular descarga con timeout
    setTimeout(() => {
        showNotification('✅ ¡CV descargado exitosamente!');
    }, 1500);
    
    // Aquí podrías implementar la lógica real de descarga
    // Por ejemplo, usando bibliotecas como jsPDF o html2canvas
}

// Función para copiar información al clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`📋 ${text} copiado al portapapeles`);
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Función alternativa para copiar texto (navegadores más antiguos)
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Evitar scroll hacia el elemento
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification(`📋 ${text} copiado al portapapeles`);
    } catch (err) {
        showNotification('❌ Error al copiar texto');
    }
    
    document.body.removeChild(textArea);
}

// Función para animar elementos al hacer scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Función para efectos de typing en el nombre
function typewriterEffect() {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        nameElement.textContent += originalText.charAt(i);
        i++;
        if (i >= originalText.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Función para alternar tema oscuro/claro
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        showNotification('☀️ Tema claro activado');
    } else {
        body.classList.add('dark-theme');
        showNotification('🌙 Tema oscuro activado');
    }
}

// Función para agregar partículas animadas
function createParticles() {
    const particleCount = 20;
    const container = document.querySelector('.floating-shapes');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos al cargar la página
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Efecto typewriter en el nombre (opcional, descomenta para activar)
    // setTimeout(typewriterEffect, 1000);
    
    // Animar las barras de habilidades en la primera carga
    setTimeout(animateSkills, 1500);
    
    // Crear partículas de fondo
    createParticles();
    
    // Agregar eventos a los elementos de contacto
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span:last-child').textContent;
            copyToClipboard(text);
            
            // Efecto visual de feedback
            this.style.background = 'rgba(102, 126, 234, 0.3)';
            this.style.transform = 'translateY(-2px) scale(1.02)';
            setTimeout(() => {
                this.style.background = 'rgba(102, 126, 234, 0.1)';
                this.style.transform = 'translateY(0) scale(1)';
            }, 300);
        });
        
        // Efecto hover mejorado
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Agregar efecto parallax suave a las formas flotantes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Animar elementos al hacer scroll
        animateOnScroll();
    });
    
    // Agregar evento para cambio de tamaño de ventana
    window.addEventListener('resize', function() {
        // Reajustar animaciones en dispositivos móviles
        if (window.innerWidth <= 768) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.transform = 'none';
            });
        }
    });
});

// Funciones de utilidad adicionales

// Función para mostrar estadísticas del CV
function showStats() {
    const stats = {
        sections: document.querySelectorAll('.section').length,
        skills: document.querySelectorAll('.skill-item').length,
        projects: document.querySelectorAll('.project-item').length,
        experience: document.querySelectorAll('.experience-item').length
    };
    
    const message = `📊 Estadísticas del CV:
    • ${stats.sections} secciones
    • ${stats.skills} habilidades
    • ${stats.projects} proyectos
    • ${stats.experience} experiencias`;
    
    showNotification(message);
}

// Función para modo presentación (ocultar elementos de navegación)
function togglePresentationMode() {
    const tabs = document.querySelector('.tabs');
    const downloadBtn = document.querySelector('.download-btn');
    
    if (tabs.style.display === 'none') {
        tabs.style.display = 'flex';
        downloadBtn.style.display = 'block';
        showNotification('👁️ Modo normal activado');
    } else {
        tabs.style.display = 'none';
        downloadBtn.style.display = 'none';
        showNotification('🎯 Modo presentación activado');
    }
}

// Atajos de teclado
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + D para descargar
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadCV();
    }
    
    // Ctrl/Cmd + P para modo presentación
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        togglePresentationMode();
    }
    
    // Números del 1-5 para cambiar pestañas
    if (e.key >= '1' && e.key <= '5') {
        const tabs = ['about', 'experience', 'education', 'skills', 'projects'];
        const tabIndex = parseInt(e.key) - 1;
        if (tabs[tabIndex]) {
            // Simular click en la pestaña correspondiente
            const tabButton = document.querySelector(`.tab:nth-child(${e.key})`);
            if (tabButton) {
                tabButton.click();
            }
        }
    }
});

// Agregar estilos adicionales para animaciones
const additionalStyles = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .particle {
        pointer-events: none;
    }
    
    .dark-theme {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    }
    
    .dark-theme .section {
        background: rgba(0, 0, 0, 0.8);
        color: white;
    }
    
    .dark-theme .cv-header {
        background: rgba(0, 0, 0, 0.8);
        color: white;
    }
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);