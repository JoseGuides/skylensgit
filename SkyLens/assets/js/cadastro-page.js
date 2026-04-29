// ============================================================
//  cadastro-page.js  -  SkyLens  (com Firebase Auth)
// ============================================================

const SkyLensCadastroPage = (() => {
  let authApiPromise;

  function getAuthApi() {
    if (!authApiPromise) {
      authApiPromise = import('./auth.js');
    }

    return authApiPromise;
  }

  function initCadastroModo() {
    const modo = new URLSearchParams(window.location.search).get('modo');
    if (modo !== 'login') return;

    const title = document.getElementById('form-title');
    const sub = document.getElementById('form-sub');
    const left = document.getElementById('left-title');

    if (title) title.textContent = 'Entrar';
    if (sub) sub.innerHTML = 'Não tem conta? <a href="cadastro.html">Criar agora</a>';
    if (left) left.innerHTML = 'Bem-vindo<br>de<br><span class="ca">Volta</span><br>ao <span class="co">Céu</span>';

    const btnNext = document.getElementById('btn-next1');
    if (btnNext) btnNext.textContent = 'Entrar →';
  }

  function validateEmail(inp) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
    const icon = document.getElementById('email-icon');
    const err = document.getElementById('email-err');

    if (!inp.value) {
      inp.className = '';
      icon.textContent = '';
      err.classList.remove('show');
    } else if (ok) {
      inp.className = 'success';
      icon.textContent = 'ok';
      icon.style.color = 'var(--success)';
      err.classList.remove('show');
    } else {
      inp.className = 'error';
      icon.textContent = 'x';
      icon.style.color = 'var(--error)';
      err.classList.add('show');
    }

    updateNextBtn();
  }

  function checkPwd(inp) {
    const value = inp.value;
    const strength = document.getElementById('pwd-strength');
    const label = document.getElementById('pwd-label-text');
    const err = document.getElementById('pwd-err');

    if (!value) {
      strength.style.display = 'none';
      inp.className = '';
      err.classList.remove('show');
      updateNextBtn();
      return;
    }

    strength.style.display = 'block';

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    const bars = ['bar1', 'bar2', 'bar3', 'bar4'].map((id) => document.getElementById(id));
    bars.forEach((bar) => { bar.className = 'pwd-bar'; });

    const cls = score <= 1 ? 'weak' : score === 2 ? 'medium' : 'strong';
    for (let i = 0; i < score; i += 1) bars[i].classList.add(cls);

    const labels = ['Senha fraca', 'Senha razoável', 'Senha boa', 'Senha forte'];
    const colors = ['var(--error)', 'var(--accent2)', 'var(--success)', 'var(--success)'];
    label.textContent = labels[score - 1] || labels[0];
    label.style.color = colors[score - 1] || colors[0];

    if (value.length < 8) {
      inp.className = 'error';
      err.classList.add('show');
    } else {
      inp.className = 'success';
      err.classList.remove('show');
    }

    validatePwd2(document.getElementById('pwd2'));
    updateNextBtn();
  }

  function validatePwd2(inp) {
    const err = document.getElementById('pwd2-err');

    if (!inp.value) {
      inp.className = '';
      err.classList.remove('show');
      updateNextBtn();
      return;
    }

    if (inp.value === document.getElementById('pwd').value) {
      inp.className = 'success';
      err.classList.remove('show');
    } else {
      inp.className = 'error';
      err.classList.add('show');
    }

    updateNextBtn();
  }

  function updateNextBtn() {
    const emailOk = document.getElementById('email')?.classList.contains('success');
    const pwdOk = document.getElementById('pwd')?.classList.contains('success');
    const pwd2Ok = document.getElementById('pwd2')?.classList.contains('success');
    const terms = document.getElementById('terms')?.checked;
    const btn = document.getElementById('btn-next1');
    const modoLogin = new URLSearchParams(window.location.search).get('modo') === 'login';

    if (btn) {
      btn.disabled = modoLogin ? !(emailOk && pwdOk) : !(emailOk && pwdOk && pwd2Ok && terms);
    }
  }

  function togglePwd(inputId) {
    const inp = document.getElementById(inputId);
    if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
  }

  function validateRequired(inp) {
    const icon = document.getElementById(`${inp.id}-icon`);
    const err = document.getElementById(`${inp.id}-err`);
    if (!icon || !err) return;

    if (inp.value.trim().length >= 2) {
      inp.className = 'success';
      icon.textContent = 'ok';
      icon.style.color = 'var(--success)';
      err.classList.remove('show');
    } else {
      inp.className = 'error';
      icon.textContent = '';
      err.classList.add('show');
    }
  }

  function validateSelect(sel) {
    const err = document.getElementById('uso-err');
    if (sel.value) {
      sel.style.color = 'var(--text)';
      err.classList.remove('show');
    } else {
      err.classList.add('show');
    }
  }

  function maskCpf(inp) {
    let v = inp.value.replace(/\D/g, '').slice(0, 11);

    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');

    inp.value = v;

    const digits = v.replace(/\D/g, '');
    const icon = document.getElementById('cpf-icon');
    const err = document.getElementById('cpf-err');

    if (digits.length === 11) {
      inp.className = 'success';
      icon.textContent = 'ok';
      icon.style.color = 'var(--success)';
      err.classList.remove('show');
    } else if (digits.length) {
      inp.className = 'error';
      icon.textContent = '';
    }
  }

  function maskTel(inp) {
    let v = inp.value.replace(/\D/g, '').slice(0, 11);

    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');

    inp.value = v;

    if (v.replace(/\D/g, '').length >= 10) {
      inp.className = 'success';
      document.getElementById('tel-icon').textContent = 'ok';
      document.getElementById('tel-icon').style.color = 'var(--success)';
      document.getElementById('tel-err').classList.remove('show');
    }
  }

  function goToStep2() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    document.getElementById('dot1').className = 'step-circle done';
    document.getElementById('lbl1').className = 'step-label';
    document.getElementById('line1').classList.add('done');
    document.getElementById('dot2').className = 'step-circle active';
    document.getElementById('lbl2').className = 'step-label active';
    document.getElementById('fh-step1').style.display = 'none';
    document.getElementById('fh-step2').style.display = 'block';
  }

  function goBack() {
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    document.getElementById('dot1').className = 'step-circle active';
    document.getElementById('lbl1').className = 'step-label active';
    document.getElementById('line1').classList.remove('done');
    document.getElementById('dot2').className = 'step-circle';
    document.getElementById('lbl2').className = 'step-label';
    document.getElementById('fh-step1').style.display = 'block';
    document.getElementById('fh-step2').style.display = 'none';
  }

  function mensagemErro(code) {
    const msgs = {
      'auth/email-already-in-use': 'Este e-mail já está cadastrado. Tente fazer login.',
      'auth/invalid-email': 'E-mail inválido.',
      'auth/weak-password': 'Senha muito fraca. Use ao menos 6 caracteres.',
      'auth/user-not-found': 'E-mail não encontrado. Verifique ou crie uma conta.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-credential': 'E-mail ou senha incorretos.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente novamente.',
      'auth/network-request-failed': 'Sem conexão. Verifique sua internet.',
    };

    return msgs[code] || 'Ocorreu um erro. Tente novamente.';
  }

  function mostrarToast(mensagem) {
    let toast = document.getElementById('firebase-toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'firebase-toast';
      toast.style.cssText = [
        'position:fixed;top:1.5rem;left:50%;transform:translateX(-50%)',
        'background:var(--error,#e53935);color:#fff',
        'padding:.75rem 1.5rem;border-radius:.75rem',
        'font-size:.9rem;font-weight:500;z-index:9999',
        'box-shadow:0 4px 24px rgba(0,0,0,.3)',
      ].join(';');
      document.body.appendChild(toast);
    }

    toast.textContent = mensagem;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 4000);
  }

  function setLoading(btnId, loading, textoOriginal) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.disabled = loading;
    btn.textContent = loading ? 'Aguarde...' : textoOriginal;
  }

  async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('pwd').value;
    setLoading('btn-next1', true, 'Entrar →');

    try {
      const { login } = await getAuthApi();
      await login(email, senha);
      window.location.href = '../index.html';
    } catch (err) {
      mostrarToast(mensagemErro(err.code));
      setLoading('btn-next1', false, 'Entrar →');
    }
  }

  async function handleGoogle(e) {
    e.preventDefault();

    try {
      const { loginComGoogle } = await getAuthApi();
      await loginComGoogle();
      window.location.href = '../index.html';
    } catch (err) {
      mostrarToast(mensagemErro(err.code));
    }
  }

  async function submitForm(e) {
    e.preventDefault();

    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('tel');
    const uso = document.getElementById('uso');

    let ok = true;
    [fname, lname].forEach((field) => {
      if (field.value.trim().length < 2) {
        field.className = 'error';
        ok = false;
      }
    });

    if (cpf.value.replace(/\D/g, '').length !== 11) {
      cpf.className = 'error';
      document.getElementById('cpf-err').classList.add('show');
      ok = false;
    }

    if (tel.value.replace(/\D/g, '').length < 10) {
      tel.className = 'error';
      document.getElementById('tel-err').classList.add('show');
      ok = false;
    }

    if (!uso.value) {
      document.getElementById('uso-err').classList.add('show');
      ok = false;
    }

    if (!ok) return;

    setLoading('btn-submit', true, 'Criar Minha Conta');

    try {
      const { cadastrar } = await getAuthApi();
      await cadastrar(
        document.getElementById('email').value.trim(),
        document.getElementById('pwd').value,
        {
          nome: fname.value.trim(),
          sobrenome: lname.value.trim(),
          cpf: cpf.value,
          telefone: tel.value,
          tipoUso: uso.value,
          newsletter: document.getElementById('news')?.checked || false,
        },
      );

      document.getElementById('step2').classList.remove('active');
      document.getElementById('form-header').style.display = 'none';
      document.getElementById('dot2').className = 'step-circle done';
      document.getElementById('lbl2').className = 'step-label';
      document.getElementById('line2').classList.add('done');
      document.getElementById('dot3').className = 'step-circle done';
      document.getElementById('lbl3').className = 'step-label active';
      document.getElementById('success-email').textContent = document.getElementById('email').value;
      document.getElementById('success-panel').classList.add('show');
    } catch (err) {
      mostrarToast(mensagemErro(err.code));
      setLoading('btn-submit', false, 'Criar Minha Conta');
    }
  }

  function initEvents() {
    document.getElementById('email')?.addEventListener('input', (e) => validateEmail(e.target));
    document.getElementById('pwd')?.addEventListener('input', (e) => checkPwd(e.target));
    document.getElementById('pwd2')?.addEventListener('input', (e) => validatePwd2(e.target));
    document.getElementById('terms')?.addEventListener('change', updateNextBtn);
    document.getElementById('fname')?.addEventListener('input', (e) => validateRequired(e.target));
    document.getElementById('lname')?.addEventListener('input', (e) => validateRequired(e.target));
    document.getElementById('cpf')?.addEventListener('input', (e) => maskCpf(e.target));
    document.getElementById('tel')?.addEventListener('input', (e) => maskTel(e.target));
    document.getElementById('uso')?.addEventListener('change', (e) => validateSelect(e.target));
    document.getElementById('pwd-toggle')?.addEventListener('click', () => togglePwd('pwd'));
    document.getElementById('pwd2-toggle')?.addEventListener('click', () => togglePwd('pwd2'));
    document.getElementById('btn-back')?.addEventListener('click', goBack);
    document.getElementById('btn-submit')?.addEventListener('click', submitForm);
    document.querySelector('.btn-social')?.addEventListener('click', handleGoogle);

    const modoLogin = new URLSearchParams(window.location.search).get('modo') === 'login';
    document.getElementById('btn-next1')?.addEventListener('click', modoLogin ? handleLogin : goToStep2);
  }

  function init() {
    initCadastroModo();
    initEvents();

    getAuthApi()
      .then(({ observarLogin }) => {
        observarLogin((user) => {
          if (user) window.location.href = '../index.html';
        });
      })
      .catch((error) => {
        console.warn('Firebase Auth indisponível; tela de cadastro funcionando apenas no front.', error);
      });
  }

  return { init };
})();

window.SkyLensCadastroPage = SkyLensCadastroPage;
export { SkyLensCadastroPage };
