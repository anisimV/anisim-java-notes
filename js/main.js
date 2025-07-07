async function loadHTML(id, url) {
    const container = document.getElementById(id);
    try {
        const resp = await fetch(url);
        if (resp.ok) {
            container.innerHTML = await resp.text();
            if (id === 'header') {
                initThemeToggle(); // Инициализируем переключатель после загрузки header
                highlightNavLink(); // Если нужно подсветить навигацию после загрузки
            }
        } else {
            container.innerHTML = `<p>Ошибка загрузки ${url}</p>`;
        }
    } catch (e) {
        container.innerHTML = `<p>Ошибка: ${e.message}</p>`;
    }
}

function initThemeToggle() {
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');
    const prismDark = document.getElementById('prism-dark');
    const prismLight = document.getElementById('prism-light');
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'light') {
        body.classList.add('light');
        if (prismDark && prismLight) {
            prismDark.disabled = true;
            prismLight.disabled = false;
        }
    }

    toggleBtn?.addEventListener('click', () => {
        const isLight = body.classList.toggle('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        if (prismDark && prismLight) {
            prismDark.disabled = isLight;
            prismLight.disabled = !isLight;
        }
    });
}

function highlightNavLink() {
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/anisim-java-notes/')) {
        document.getElementById('nav-home')?.classList.add('active');
    } else if (path.includes('about.html')) {
        document.getElementById('nav-about')?.classList.add('active');
    } else if (path.includes('/tasks/')) {
        document.getElementById('nav-tasks')?.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '/anisim-java-notes/includes/header.html');
    loadHTML('footer', '/anisim-java-notes/includes/footer.html');
});
