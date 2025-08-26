document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://fix-the-nisbot.onrender.com';

    const loginButton = document.getElementById('login-button');
    const nameInput = document.getElementById('participant-name');
    const statusP = document.getElementById('auth-status');
    const startFixButton = document.getElementById('start-fix-button');
    const authSplashScreen = document.getElementById('auth-splash-screen');
    const authContainer = document.getElementById('auth-container');

    // Clear any previous session on login page load to ensure a fresh start.
    sessionStorage.removeItem('nisbotUser');
    sessionStorage.removeItem('nisbotGameState');

    startFixButton.addEventListener('click', () => {
        authSplashScreen.classList.add('hidden');
        authContainer.classList.remove('hidden');
        nameInput.focus();
    });

    const attemptLogin = async () => {
        const name = nameInput.value.trim();
        if (!name) {
            statusP.textContent = 'Please enter your name.';
            statusP.style.color = 'yellow';
            return;
        }

        // Client-side check to see if the user has already played on this device.
        // This is not a secure way to prevent replay, as it can be bypassed by clearing browser data.
        // A server-side check would be more robust.
        const hasPlayed = localStorage.getItem('hasPlayedNisbotWumpus_' + name.toLowerCase());
        if (hasPlayed) {
            statusP.textContent = 'This name has already been used to play the game on this device.';
            statusP.style.color = 'red';
            return;
        }

        statusP.textContent = 'Authenticating...';
        statusP.style.color = '#e0e0e0';

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });

            const result = await response.json();

            if (response.ok) {
                statusP.textContent = 'Success! Starting game...';
                statusP.style.color = 'green';
                sessionStorage.setItem('nisbotUser', name);
                window.location.href = 'index.html';
            } else {
                statusP.textContent = result.message || 'Authentication failed.';
                statusP.style.color = 'red';
            }
        } catch (error) {
            console.error('Login error:', error);
            statusP.textContent = 'Could not connect to the server.';
            statusP.style.color = 'red';
        }
    };

    loginButton.addEventListener('click', attemptLogin);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });
});