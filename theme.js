const themes = {
    classic: {
        name: 'Classic',
        icon: '🎯',
        colors: {
            '--primary-color': '#2c3e50',
            '--secondary-color': '#6f6f6f',
            '--background-color': '#f0f2f5',
            '--button-bg': '#6f6f6f',
            '--button-shadow': '#5f5f5f',
            '--button-highlight': '#ffffff',
            '--text-color': '#34495e',
            '--grid-border-color': '#2c3e50',
            '--cell-border-color': '#95a5a6',
            '--highlight-color': '#f39c12',
            '--cell-bg': '#ffffff',
            '--cell-bg-initial': '#f0f0f0',
            '--game-container-bg': '#ffffff',
            '--timer-color': '#2c3e50',
            '--title-color': '#2c3e50',
            '--modal-bg': '#ffffff',
            '--modal-text': '#2c3e50',
            '--modal-overlay': 'rgba(0, 0, 0, 0.5)'
        }
    },
    nature: {
        name: 'Nature',
        icon: '🌿',
        colors: {
            '--primary-color': '#424340',
            '--secondary-color': '#424340',
            '--background-color': '#C9E3CC',
            '--button-bg': '#606C5A',
            '--button-shadow': '#505c4a',
            '--button-highlight': '#C9E3CC',
            '--text-color': '#424340',
            '--grid-border-color': '#424340',
            '--cell-border-color': '#424340',
            '--highlight-color': '#424340',
            '--cell-bg': '#ffffff',
            '--cell-bg-initial': '#B0B9A8',
            '--game-container-bg': '#B8CBD0',
            '--timer-color': '#424340',
            '--title-color': '#424340',
            '--modal-bg': '#ffffff',
            '--modal-text': '#424340',
            '--modal-overlay': 'rgba(0, 0, 0, 0.5)'
        }
    },
    ocean: {
        name: 'Ocean',
        icon: '🌊',
        colors: {
            '--primary-color': '#2ba6d1',
            '--secondary-color': '#2089ac',
            '--background-color': '#caf1ff',
            '--button-bg': '#2ba6d1',
            '--button-shadow': '#2089ac',
            '--button-highlight': '#ffffff',
            '--text-color': '#2c3e50',
            '--grid-border-color': '#2089ac',
            '--cell-border-color': '#95a5a6',
            '--highlight-color': '#e74c3c',
            '--cell-bg': '#ffffff',
            '--cell-bg-initial': '#e5f7ff',
            '--game-container-bg': '#ffffff',
            '--timer-color': '#2089ac',
            '--title-color': '#2089ac',
            '--modal-bg': '#ffffff',
            '--modal-text': '#2089ac',
            '--modal-overlay': 'rgba(0, 0, 0, 0.5)'
        }
    },
    sunset: {
        name: 'Sunset',
        icon: '🌅',
        colors: {
            '--primary-color': '#79301B',
            '--secondary-color': '#79301B',
            '--background-color': '#F2A961',
            '--button-bg': '#79301B',
            '--button-shadow': '#79301B',
            '--button-highlight': '#ffffff',
            '--text-color': '#79301B',
            '--grid-border-color': '#F48950',
            '--cell-border-color': '#F48950',
            '--highlight-color': '#79301B',
            '--cell-bg': '#ffffff',
            '--cell-bg-initial': '#EEC377',
            '--game-container-bg': '#fe9736',
            '--timer-color': '#79301B',
            '--title-color': '#79301B',
            '--modal-bg': '#ffffff',
            '--modal-text': '#79301B',
            '--modal-overlay': 'rgba(0, 0, 0, 0.5)'
        }
    },
    dark: {
        name: 'Dark',
        icon: '🌙',
        colors: {
            '--primary-color': '#ecf0f1',
            '--secondary-color': '#9b59b6',
            '--background-color': '#2c3e50',
            '--button-bg': '#9b59b6',
            '--button-shadow': '#8e44ad',
            '--button-highlight': '#ffffff',
            '--text-color': '#ecf0f1',
            '--grid-border-color': '#8e44ad',
            '--cell-border-color': '#34495e',
            '--highlight-color': '#f1c40f',
            '--cell-bg': '#34495e',
            '--cell-bg-initial': '#2c3e50',
            '--game-container-bg': '#34495e',
            '--timer-color': '#ecf0f1',
            '--title-color': '#ecf0f1',
            '--modal-bg': '#34495e',
            '--modal-text': '#ecf0f1',
            '--modal-overlay': 'rgba(0, 0, 0, 0.7)'
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Créer le conteneur des boutons de thème
    const themeContainer = document.createElement('div');
    themeContainer.className = 'theme-buttons';
    
    // Créer les boutons pour chaque thème
    Object.entries(themes).forEach(([themeKey, theme]) => {
        const button = document.createElement('button');
        button.className = 'theme-button';
        button.innerHTML = theme.icon;
        button.title = `Thème ${theme.name}`;
        button.onclick = () => applyTheme(themeKey);
        themeContainer.appendChild(button);
    });
    
    // Insérer les boutons après le titre
    const title = document.querySelector('h1');
    title.parentNode.insertBefore(themeContainer, title.nextSibling);
    
    // Appliquer le thème sauvegardé ou le thème par défaut
    const savedTheme = localStorage.getItem('theme') || 'classic';
    applyTheme(savedTheme);
});

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Appliquer toutes les couleurs du thème
    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    // Sauvegarder le thème choisi
    localStorage.setItem('theme', themeName);
    
    // Mettre à jour l'état actif des boutons
    document.querySelectorAll('.theme-button').forEach(button => {
        button.classList.toggle('active', 
            button.innerHTML.includes(theme.icon));
    });
}
