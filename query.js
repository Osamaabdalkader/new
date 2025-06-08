async function loadData() {
  try {
    const userId = localStorage.getItem('userId');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const snapshot = await db.ref(`userData/${userId}`).orderByChild('timestamp').once('value');
    const dataBody = document.getElementById('dataBody');
    const recordCount = document.getElementById('recordCount');
    
    dataBody.innerHTML = '';
    let count = 0;
    
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val();
        
        // تطبيق البحث
        const matchesSearch = !searchTerm || 
          data.name.toLowerCase().includes(searchTerm) || 
          data.email.toLowerCase().includes(searchTerm);
        
        if (matchesSearch) {
          count++;
          const row = document.createElement('tr');
          
          row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.city}</td>
            <td>${data.gender}</td>
            <td>${formatDate(data.timestamp)}</td>
          `;
          
          dataBody.appendChild(row);
        }
      });
    }
    
    recordCount.textContent = count;
    
    if (count === 0) {
      dataBody.innerHTML = '<tr><td colspan="6">لا توجد بيانات</td></tr>';
    }
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// الأحداث
document.getElementById('searchBtn').addEventListener('click', loadData);
document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  loadData();
});

// تحميل البيانات عند فتح الصفحة
window.addEventListener('DOMContentLoaded', loadData);
