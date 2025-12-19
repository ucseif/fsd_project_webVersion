
import { auth } from './firebase.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

/**
 * @param {Function} onUserLoggedIn
 */
export function initAuth(onUserLoggedIn) {
    onAuthStateChanged(auth, (user) => {
        if (!user && !localStorage.getItem('loggedIn')) {
            console.log("User not authenticated. Redirecting to login...");
            window.location.href = 'index.html';
        } else {
            console.log('User signed in:', user?.email);

            if (onUserLoggedIn) {
                onUserLoggedIn();
            }
        }
    });
}


export function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('userEmail');

                window.location.href = 'index.html';
            }).catch((error) => {
                console.error("Logout Error:", error);
            });
        });
    }
}