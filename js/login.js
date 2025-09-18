const f = document.getElementById('loginForm');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const emailError = document.getElementById('emailError');
const pwdError = document.getElementById('pwdError');
const toast = document.getElementById('toast');
const submitBtn = document.getElementById('submitBtn');
const toggle = document.getElementById('togglePwd');

toggle.addEventListener('click', () => {
  const type = pass.type === 'password' ? 'text' : 'password';
  pass.type = type;
  toggle.textContent = type === 'password' ? '👁' : '🙈';
  pass.focus();
});

function showToast(kind, msg){
  toast.style.display = 'block';
  toast.style.color = kind==='ok' ? '#0f6d28' : '#9f1c1c';
  toast.textContent = msg;
}

f.addEventListener('submit', async (e) => {
  e.preventDefault();
  let valid = true;
  if (!email.value || !email.checkValidity()){ emailError.style.display='block'; valid = false; } else emailError.style.display='none';
  if (!pass.value || pass.value.length < 6){ pwdError.style.display='block'; valid = false; } else pwdError.style.display='none';
  if (!valid) { showToast('err','Revisa los campos marcados.'); return; }
  submitBtn.disabled = true; submitBtn.textContent = 'Validando…';
  try{
    // Aquí iría tu fetch real al backend.
    await new Promise(r => setTimeout(r, 600));
    sessionStorage.setItem('role', 'admin'); // simulado
    showToast('ok','¡Bienvenida! Redirigiendo al panel…');
    setTimeout(()=>location.href='admin.html', 600);
  }catch(err){
    showToast('err', err.message || 'No fue posible iniciar sesión.');
  }finally{
    submitBtn.disabled = false; submitBtn.textContent = 'INICIAR SESIÓN';
  }
});
