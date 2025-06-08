// الدوال الأساسية
const db = firebase.database();

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function showMessage(elementId, message, isSuccess = true) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  el.textContent = message;
  el.className = isSuccess ? 'message success' : 'message error';
  el.style.display = 'block';
  
  setTimeout(() => el.style.display = 'none', 5000);
}

// إدارة الجلسة
function checkAuth() {
  return localStorage.getItem('loggedIn') === 'true';
}

function logout() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    db.ref(`userActivities/${userId}`).push({
      action: 'logout',
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }
  
  localStorage.clear();
  window.location.href = 'login.html';
}

function protectPage() {
  if (!checkAuth()) {
    window.location.href = 'login.html';
  }
}
