// Initialize Lucide Icons
if (window.lucide) {
    lucide.createIcons();
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + screenId).classList.add('active');
}

function showLogin() {
    switchScreen('login');
    setTimeout(() => {
        const input = document.getElementById('password-input');
        if (input) input.focus();
    }, 100);
}

function handleLogin(e) {
    e.preventDefault();
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput.value;
    const errorMsg = document.getElementById('error-msg');
    const loginCard = document.getElementById('login-card');

    if (password === 'bob67') {
        switchScreen('result');
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
        if (loginCard) loginCard.classList.add('shake');
        
        // Reset shake
        setTimeout(() => {
            if (loginCard) loginCard.classList.remove('shake');
        }, 500);
        
        // Clear error and password after delay
        setTimeout(() => {
            if (errorMsg) errorMsg.classList.add('hidden');
            if (passwordInput) passwordInput.value = '';
        }, 2000);
    }
}

function logoff() {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) passwordInput.value = '';
    switchScreen('landing');
}

// Add global listener for Enter key on login screen
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && document.getElementById('screen-login').classList.contains('active')) {
        // Form submit already handles it
    }
});
