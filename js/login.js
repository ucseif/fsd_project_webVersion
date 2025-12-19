import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { showToast } from './utils.js';

async function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('Password');
    const submitBtn = document.querySelector('.submit-btn');

    if (!emailInput || !passwordInput || !submitBtn) return;

    const email = emailInput.value;
    const password = passwordInput.value;

    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<div class="spinner"></div> Signing in...';

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Logged in user:", user);

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', user.email);

        showToast('Successfully signed in!', 'success');

        setTimeout(() => {
            window.location.href = 'DoctorDirectory.html';
        }, 1000);

    } catch (error) {
        console.error("Error signing in:", error.code, error.message);

        let errorMsg = 'Something went wrong';

        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            errorMsg = 'Invalid email or password';
        } else if (error.code === 'auth/too-many-requests') {
            errorMsg = 'Too many attempts. Try again later.';
        }

        showToast(errorMsg, 'error');

        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<span>Sign In</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});