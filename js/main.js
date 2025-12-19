import { initAuth, setupLogout } from './auth.js';
import {
    loadDoctors,
    openAddModal,
    editDoctor,
    deleteDoctor,
    setupFormListener,
    setupSearchFilters
} from './doctors.js';

window.openAddModal = openAddModal;
window.editDoctor = editDoctor;
window.deleteDoctor = deleteDoctor;
window.loadDoctors = loadDoctors;

document.addEventListener('DOMContentLoaded', () => {

    initAuth(() => {
        loadDoctors();
    });

    setupLogout();
    setupFormListener();
    setupSearchFilters();
});