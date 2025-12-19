import { db } from './firebase.js';
import { showToast } from './utils.js';
import {
    collection, getDocs, addDoc, deleteDoc, doc, query, where, getDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

let editingId = null;

export async function loadDoctors(searchQuery = '', roleFilter = 'All') {
    const grid = document.getElementById('doctorGrid');
    grid.innerHTML = '<div style="text-align:center; grid-column: 1/-1; padding: 40px; color: var(--text-muted);">Loading doctors...</div>';

    try {
        let q = collection(db, 'doctors');
        if (roleFilter !== 'All') {
            q = query(collection(db, 'doctors'), where('department', '==', roleFilter));
        }
        const snapshot = await getDocs(q);
        grid.innerHTML = '';
        if (snapshot.empty) {
            grid.innerHTML = '<div style="text-align:center; grid-column: 1/-1; padding: 40px; color: var(--text-muted);">No doctors found.</div>';
            return;
        }
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const id = docSnap.id;
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                const nameMatch = data.name?.toLowerCase().includes(searchLower);
                const emailMatch = data.email?.toLowerCase().includes(searchLower);
                if (!nameMatch && !emailMatch) return;
            }
            const defaultImg = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(data.name || 'User') + '&background=random';
            const card = document.createElement('div');
            card.className = 'doctor-card';
            card.innerHTML = `
                <img class="card-avatar" src="${data.profilePic || defaultImg}" onerror="this.src='${defaultImg}'" alt="${data.name}">
                <h3 class="card-name">${data.name}</h3>
                <div class="card-role">${data.role || data.specialty || 'General'}</div>
                <div class="card-email">${data.email}</div>
                <div class="card-actions">
                    <button class="btn-icon btn-edit" onclick="window.editDoctor('${id}')">Edit</button>
                    <button class="btn-icon btn-delete" onclick="window.deleteDoctor('${id}')">Delete</button>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        showToast('Error loading data: ' + err.message, 'error');
    }
}

export function openAddModal() {
    editingId = null;
    document.getElementById('addDoctorForm').reset();
    document.getElementById('modalTitle').textContent = "Add New Doctor";
    document.getElementById('modalSubmitBtn').textContent = "Add Member";
    document.getElementById('add-modal').classList.add('show');
}

export async function editDoctor(id) {
    const modal = document.getElementById('add-modal');
    const submitBtn = document.getElementById('modalSubmitBtn');
    modal.classList.add('show');
    document.getElementById('modalTitle').textContent = "Edit Doctor";
    submitBtn.textContent = "Loading...";
    submitBtn.disabled = true;

    try {
        const docRef = doc(db, 'doctors', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('add-name').value = data.name;
            document.getElementById('add-email').value = data.email;
            document.getElementById('add-courses').value = data.courses;
            document.getElementById('add-position').value = data.position;
            document.getElementById('add-university').value = data.university;
            document.getElementById('add-department').value = data.department;
            document.getElementById('add-profilePic').value = data.profilePic || '';

            editingId = id;
            submitBtn.textContent = "Update Doctor";
            submitBtn.disabled = false;
        } else {
            showToast('Doctor not found!', 'error');
            modal.classList.remove('show');
        }
    } catch (err) {
        showToast('Error fetching details', 'error');
        modal.classList.remove('show');
    }
}

export async function deleteDoctor(id) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        try {
            await deleteDoc(doc(db, 'doctors', id));
            showToast('Doctor deleted', 'success');
            loadDoctors();
        } catch (err) {
            showToast(err.message, 'error');
        }
    }
}

export function setupFormListener() {
    document.getElementById('addDoctorForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('modalSubmitBtn');
        const originalText = btn.textContent;
        btn.textContent = editingId ? 'Updating...' : 'Adding...';
        btn.disabled = true;

        try {
            const doctorData = {
                name: document.getElementById('add-name').value,
                email: document.getElementById('add-email').value,
                courses: document.getElementById('add-courses').value,
                position: document.getElementById('add-position').value,
                university: document.getElementById('add-university').value,
                department: document.getElementById('add-department').value,
                profilePic: document.getElementById('add-profilePic').value || '',
            };

            if (editingId) {
                await updateDoc(doc(db, 'doctors', editingId), doctorData);
                showToast('Doctor updated successfully!', 'success');
            } else {
                doctorData.createdAt = new Date().toISOString();
                await addDoc(collection(db, 'doctors'), doctorData);
                showToast('Doctor added successfully!', 'success');
            }

            document.getElementById('add-modal').classList.remove('show');
            e.target.reset();
            editingId = null;
            loadDoctors();
        } catch (err) {
            showToast('Error: ' + err.message, 'error');
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}

export function setupSearchFilters() {
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const role = document.getElementById('departmentSelect').value;
                loadDoctors(e.target.value, role);
            }, 300);
        });
    }

    const filterSelect = document.getElementById('departmentSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const search = document.getElementById('searchInput').value;
            loadDoctors(search, e.target.value);
        });
    }
}