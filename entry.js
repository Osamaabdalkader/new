document.getElementById('dataForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userId = localStorage.getItem('userId');
  if (!userId) return logout();
  
  try {
    // جمع بيانات النموذج
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value || 'غير محدد',
      city: document.getElementById('city').value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      notes: document.getElementById('notes').value || 'لا يوجد',
      userId: userId,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    // حفظ البيانات في قسم المستخدم
    await db.ref(`userData/${userId}`).push(formData);
    
    showMessage('message', 'تم حفظ البيانات بنجاح', true);
    document.getElementById('dataForm').reset();
    
    // تسجيل النشاط
    db.ref(`userActivities/${userId}`).push({
      action: 'data_entry',
      details: `تم إدخال بيانات: ${formData.name}`,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    
  } catch (error) {
    showMessage('message', 'حدث خطأ: ' + error.message, false);
  }
});
