// script.js - Fungsi Global untuk Semua Halaman

// Konfigurasi API
const API_BASE = "https://opensheet.elk.sh/17xIifukROSx1w2p98ib3EZNV1uKQCZf8dzgInT1FYXI";
const LOGIN_API = `${API_BASE}/login`;
const CUTI_API = `${API_BASE}/BENGKEL`;

// Fungsi Helper
function escapeHtml(str) {
    if (!str) return '-';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Cek session login
function checkSession(redirectUrl = 'index.html') {
    const user = localStorage.getItem('currentUser');
    const role = localStorage.getItem('userRole');
    if (!user) {
        window.location.href = redirectUrl;
        return null;
    }
    return { user, role };
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

// Ambil data cuti
async function fetchCutiData() {
    try {
        const response = await fetch(CUTI_API);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching cuti data:', error);
        return [];
    }
}

// Tampilkan alert
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = message;
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => alertDiv.remove(), 3000);
}
