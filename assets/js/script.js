const _isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
const _p = _isRoot ? 'pages/' : '';

function fp(cat, btn) {
  document.querySelectorAll('.cat-tab').forEach((t) => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.pc').forEach((card) => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.classList.toggle('hidden', !match);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.09 });

function observeRevealElements(root = document) {
  root.querySelectorAll('.reveal').forEach((el) => {
    if (!el.dataset.revealBound) {
      el.dataset.revealBound = 'true';
      revealObserver.observe(el);
    }
  });
}

function toSlug(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function resolveProductSlug(rawSlug) {
  return PRODUCT_ALIASES?.[rawSlug] || rawSlug;
}

function getCurrentProduct() {
  const rawSlug = new URLSearchParams(window.location.search).get('produto') || 'dji-mavic-3-pro';
  return PRODUCT_CATALOG?.[resolveProductSlug(rawSlug)] || PRODUCT_CATALOG['dji-mavic-3-pro'];
}

function buildStars(value) {
  const full = Math.floor(Number(value));
  const empty = Math.max(0, 5 - full);
  return `${'\u2605'.repeat(full)}${'\u2606'.repeat(empty)}`;
}

function avatarFor(name) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

function renderProductPage() {
  const product = getCurrentProduct();
  if (!product) return;

  document.title = `${product.name} - SkyLens`;

  const categoryLabel = product.anchor === 'drones' ? 'Drones' : product.anchor === 'cameras' ? 'Cameras' : 'Acessorios';
  document.getElementById('breadcrumb-category-link').textContent = categoryLabel;
  document.getElementById('breadcrumb-category-link').href = `../index.html#${product.anchor}`;
  document.getElementById('breadcrumb-current').textContent = product.name;
  document.getElementById('product-availability').textContent = product.availability;
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-desc').textContent = product.description;

  document.getElementById('rating-row').innerHTML = `
    <span class="stars">${buildStars(product.rating)}</span>
    <span class="rating-text"><strong>${product.rating}</strong> · ${product.reviewCount} avaliacoes</span>
    ${product.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join('')}
  `;

  const mainImg = document.getElementById('main-img');
  const thumbs = document.getElementById('gallery-thumbs');
  const images = product.gallery;
  mainImg.src = images[0][0];
  mainImg.alt = product.name;
  mainImg.onerror = function onMainError() { this.src = images[0][1]; };
  thumbs.innerHTML = images.map((image, index) => `
    <div class="thumb ${index === 0 ? 'active' : ''}" data-src="${image[0]}" data-fallback="${image[1]}">
      <img src="${image[0]}" alt="${product.name}" onerror="this.src='${image[1]}'" />
    </div>
  `).join('');

  document.getElementById('rent-options').innerHTML = product.rent.map((item) => `
    <div class="rent-opt ${item[4] ? 'selected' : ''}">
      <div class="rent-opt-left">
        <div class="radio-dot"></div>
        <div><div class="opt-label">${item[0]}</div><div class="opt-sub">${item[1]}</div></div>
      </div>
      <div style="text-align:right"><div class="opt-price">${item[2]}</div><div class="opt-period">${item[3]}</div></div>
    </div>
  `).join('');

  document.getElementById('sale-price').textContent = product.buyPrice;
  document.getElementById('sale-installments').innerHTML = product.installments;
  document.getElementById('rent-guarantee').innerHTML = '<span>SEG</span> Seguro incluso · Equipamento revisado';
  document.getElementById('buy-guarantee').innerHTML = '<span>GAR</span> Garantia e nota fiscal inclusas';

  document.getElementById('delivery-info').innerHTML = product.delivery.map((item) => `
    <div class="delivery-row">
      <span class="di-icon">${item[3] || 'INFO'}</span>
      <div><div class="di-title">${item[1]}</div><div class="di-sub">${item[2]}</div></div>
      ${item[3] ? `<span class="di-badge">${item[3]}</span>` : ''}
    </div>
  `).join('');

  const specGroups = [product.specs.slice(0, 3), product.specs.slice(3)];
  document.getElementById('specs-grid').innerHTML = specGroups.map((group, index) => `
    <div class="spec-group">
      <div class="spec-group-title">${index === 0 ? 'Especificacoes principais' : 'Detalhes de uso'}</div>
      ${group.map((row) => `<div class="spec-row"><span class="spec-key">${row[0]}</span><span class="spec-val">${row[1]}</span></div>`).join('')}
    </div>
  `).join('');

  document.getElementById('includes-grid').innerHTML = product.includes.map((item) => `
    <div class="include-item"><div class="inc-icon">KIT</div><div><div class="inc-text">${item[1]}</div><div class="inc-sub">Kit SkyLens</div></div></div>
  `).join('');

  document.getElementById('reviews-summary').innerHTML = `
    <div style="text-align:center">
      <div class="big-rating">${product.rating}</div>
      <div class="big-stars">${buildStars(product.rating)}</div>
      <div class="big-count">${product.reviewCount} avaliacoes</div>
    </div>
    <div class="bars">
      <div class="bar-row"><span class="bar-label">5★</span><div class="bar-track"><div class="bar-fill" style="width:88%"></div></div><span class="bar-pct">88%</span></div>
      <div class="bar-row"><span class="bar-label">4★</span><div class="bar-track"><div class="bar-fill" style="width:9%"></div></div><span class="bar-pct">9%</span></div>
      <div class="bar-row"><span class="bar-label">3★</span><div class="bar-track"><div class="bar-fill" style="width:2%"></div></div><span class="bar-pct">2%</span></div>
      <div class="bar-row"><span class="bar-label">2★</span><div class="bar-track"><div class="bar-fill" style="width:1%"></div></div><span class="bar-pct">1%</span></div>
      <div class="bar-row"><span class="bar-label">1★</span><div class="bar-track"><div class="bar-fill" style="width:0%"></div></div><span class="bar-pct">0%</span></div>
    </div>
  `;

  document.getElementById('reviews-list').innerHTML = product.reviews.map((review) => `
    <div class="review-card reveal">
      <div class="review-header">
        <div class="reviewer"><div class="avatar">${avatarFor(review[0])}</div><div><div class="reviewer-name">${review[0]}</div><div class="reviewer-date">${review[1]}</div></div></div>
        <div class="review-stars">${buildStars(product.rating)}</div>
      </div>
      <p class="review-text">${review[3]}</p>
      <span class="review-badge">verificado</span>
    </div>
  `).join('');

  const currentSlug = resolveProductSlug(new URLSearchParams(window.location.search).get('produto') || 'dji-mavic-3-pro');
  const related = Object.entries(PRODUCT_CATALOG)
    .filter(([slug]) => slug !== currentSlug)
    .sort((a, b) => (a[1].anchor === product.anchor ? -1 : 1) - (b[1].anchor === product.anchor ? -1 : 1))
    .slice(0, 3);

  document.getElementById('related-grid').innerHTML = related.map(([slug, item]) => `
    <div class="rc" data-slug="${slug}">
      <img src="${item.gallery[0][0]}" alt="${item.name}" onerror="this.src='${item.gallery[0][1]}'" />
      <div class="rc-body"><div class="rc-cat">${item.category}</div><div class="rc-name">${item.name}</div><div><span class="rc-price">${item.rent[0][2]}</span><span class="rc-period">${item.rent[0][3]}</span></div></div>
    </div>
  `).join('');

  observeRevealElements(document);
}

function initCardNavigation() {
  document.querySelectorAll('.pc').forEach((card) => {
    card.style.cursor = 'pointer';
    const getSlug = () => resolveProductSlug(card.dataset.slug || toSlug(card.querySelector('.pname')?.textContent.trim() || ''));

    card.addEventListener('click', (e) => {
      if (e.target.closest('.bsm')) return;
      const slug = getSlug();
      if (slug) window.location.href = `${_p}produto.html?produto=${slug}`;
    });

    card.querySelector('.bout')?.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = `${_p}produto.html?produto=${getSlug()}#alugar`;
    });

    card.querySelector('.bacc')?.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = `${_p}produto.html?produto=${getSlug()}#comprar`;
    });
  });
}

function initAuthNavigation() {
  document.querySelector('.nav-cta .btn-ghost')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `${_p}cadastro.html?modo=login`;
  });

  document.querySelector('.nav-cta .btn-primary')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `${_p}cadastro.html`;
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    const txt = link.textContent.trim().toLowerCase();
    if (txt.includes('criar conta') || txt.includes('cadastr')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `${_p}cadastro.html`;
      });
    }
  });
}

function initGallery() {
  const mainImg = document.getElementById('main-img');
  if (!mainImg) return;
  document.querySelectorAll('.thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImg.src = thumb.dataset.src;
      mainImg.onerror = function onThumbError() { this.src = thumb.dataset.fallback; };
      document.querySelectorAll('.thumb').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

function initPricingTabs() {
  document.querySelectorAll('.ptab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ptab').forEach((t) => t.classList.remove('active'));
      btn.classList.add('active');
      const panelId = btn.dataset.panel;
      document.getElementById('rent-panel').hidden = panelId !== 'rent-panel';
      document.getElementById('buy-panel').hidden = panelId !== 'buy-panel';
    });
  });
}

function initRentOptions() {
  document.querySelectorAll('.rent-opt').forEach((opt) => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.rent-opt').forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
}

function initSectionTabs() {
  document.querySelectorAll('.stab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stab').forEach((t) => t.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
      document.getElementById(btn.dataset.section)?.classList.add('active');
    });
  });
}

function initRelatedCards() {
  document.querySelectorAll('.rc[data-slug]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = `produto.html?produto=${card.dataset.slug}`;
    });
  });
}

function initProductPageExtras() {
  if (window.location.hash === '#comprar') {
    document.querySelector('.ptab[data-panel="buy-panel"]')?.click();
  }
}

function initCadastroModo() {
  const modo = new URLSearchParams(window.location.search).get('modo');
  if (modo !== 'login') return;
  const title = document.getElementById('form-title');
  const sub = document.getElementById('form-sub');
  const left = document.getElementById('left-title');
  if (title) title.textContent = 'Entrar';
  if (sub) sub.innerHTML = 'Nao tem conta? <a href="cadastro.html">Criar agora</a>';
  if (left) left.innerHTML = 'Bem-vindo<br>de<br><span class="ca">Volta</span><br>ao <span class="co">Ceu</span>';
}

function validateEmail(inp) {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
  const icon = document.getElementById('email-icon');
  const err = document.getElementById('email-err');
  if (!inp.value) { inp.className = ''; icon.textContent = ''; err.classList.remove('show'); }
  else if (ok) { inp.className = 'success'; icon.textContent = 'ok'; icon.style.color = 'var(--success)'; err.classList.remove('show'); }
  else { inp.className = 'error'; icon.textContent = 'x'; icon.style.color = 'var(--error)'; err.classList.add('show'); }
  updateNextBtn();
}

function checkPwd(inp) {
  const v = inp.value;
  const str = document.getElementById('pwd-strength');
  const lbl = document.getElementById('pwd-label-text');
  const err = document.getElementById('pwd-err');
  if (!v) { str.style.display = 'none'; inp.className = ''; err.classList.remove('show'); updateNextBtn(); return; }
  str.style.display = 'block';
  let score = 0;
  if (v.length >= 8) score += 1;
  if (/[A-Z]/.test(v)) score += 1;
  if (/[0-9]/.test(v)) score += 1;
  if (/[^A-Za-z0-9]/.test(v)) score += 1;
  const bars = ['bar1', 'bar2', 'bar3', 'bar4'].map((id) => document.getElementById(id));
  bars.forEach((b) => { b.className = 'pwd-bar'; });
  const cls = score <= 1 ? 'weak' : score === 2 ? 'medium' : 'strong';
  for (let i = 0; i < score; i += 1) bars[i].classList.add(cls);
  const labels = ['Senha fraca', 'Senha razoavel', 'Senha boa', 'Senha forte'];
  const colors = ['var(--error)', 'var(--accent2)', 'var(--success)', 'var(--success)'];
  lbl.textContent = labels[score - 1] || labels[0];
  lbl.style.color = colors[score - 1] || colors[0];
  if (v.length < 8) { inp.className = 'error'; err.classList.add('show'); } else { inp.className = 'success'; err.classList.remove('show'); }
  validatePwd2(document.getElementById('pwd2'));
  updateNextBtn();
}

function validatePwd2(inp) {
  const err = document.getElementById('pwd2-err');
  if (!inp.value) { inp.className = ''; err.classList.remove('show'); updateNextBtn(); return; }
  if (inp.value === document.getElementById('pwd').value) { inp.className = 'success'; err.classList.remove('show'); } else { inp.className = 'error'; err.classList.add('show'); }
  updateNextBtn();
}

function updateNextBtn() {
  const emailOk = document.getElementById('email')?.classList.contains('success');
  const pwdOk = document.getElementById('pwd')?.classList.contains('success');
  const pwd2Ok = document.getElementById('pwd2')?.classList.contains('success');
  const terms = document.getElementById('terms')?.checked;
  const btn = document.getElementById('btn-next1');
  if (btn) btn.disabled = !(emailOk && pwdOk && pwd2Ok && terms);
}

function togglePwd(inputId) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

function validateRequired(inp) {
  const icon = document.getElementById(`${inp.id}-icon`);
  const err = document.getElementById(`${inp.id}-err`);
  if (!icon || !err) return;
  if (inp.value.trim().length >= 2) { inp.className = 'success'; icon.textContent = 'ok'; icon.style.color = 'var(--success)'; err.classList.remove('show'); }
  else { inp.className = 'error'; icon.textContent = ''; err.classList.add('show'); }
}

function validateSelect(sel) {
  const err = document.getElementById('uso-err');
  if (sel.value) { sel.style.color = 'var(--text)'; err.classList.remove('show'); } else { err.classList.add('show'); }
}

function maskCpf(inp) {
  let v = inp.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  inp.value = v;
  const icon = document.getElementById('cpf-icon');
  const err = document.getElementById('cpf-err');
  const d = v.replace(/\D/g, '');
  if (d.length === 11) { inp.className = 'success'; icon.textContent = 'ok'; icon.style.color = 'var(--success)'; err.classList.remove('show'); }
  else if (d.length) { inp.className = 'error'; icon.textContent = ''; }
}

function maskTel(inp) {
  let v = inp.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');
  inp.value = v;
  const icon = document.getElementById('tel-icon');
  const err = document.getElementById('tel-err');
  if (v.replace(/\D/g, '').length >= 10) { inp.className = 'success'; icon.textContent = 'ok'; icon.style.color = 'var(--success)'; err.classList.remove('show'); }
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

function submitForm() {
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('tel');
  const uso = document.getElementById('uso');
  let ok = true;
  [fname, lname].forEach((field) => { if (field.value.trim().length < 2) { field.className = 'error'; ok = false; } });
  if (cpf.value.replace(/\D/g, '').length !== 11) { cpf.className = 'error'; document.getElementById('cpf-err').classList.add('show'); ok = false; }
  if (tel.value.replace(/\D/g, '').length < 10) { tel.className = 'error'; document.getElementById('tel-err').classList.add('show'); ok = false; }
  if (!uso.value) { document.getElementById('uso-err').classList.add('show'); ok = false; }
  if (!ok) return;
  document.getElementById('step2').classList.remove('active');
  document.getElementById('form-header').style.display = 'none';
  document.getElementById('dot2').className = 'step-circle done';
  document.getElementById('lbl2').className = 'step-label';
  document.getElementById('line2').classList.add('done');
  document.getElementById('dot3').className = 'step-circle done';
  document.getElementById('lbl3').className = 'step-label active';
  document.getElementById('success-email').textContent = document.getElementById('email').value;
  document.getElementById('success-panel').classList.add('show');
  document.getElementById('step-indicator').style.display = 'flex';
}

function initCadastroEvents() {
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
  document.getElementById('btn-next1')?.addEventListener('click', goToStep2);
  document.getElementById('btn-back')?.addEventListener('click', goBack);
  document.getElementById('btn-submit')?.addEventListener('click', submitForm);
}

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isIndex = path.endsWith('index.html') || path === '/' || path.endsWith('/');
  const isProduto = path.includes('produto.html');
  const isCadastro = path.includes('cadastro.html');

  observeRevealElements(document);

  if (isIndex) {
    initCardNavigation();
    initAuthNavigation();
  }

  if (isProduto) {
    renderProductPage();
    initGallery();
    initPricingTabs();
    initRentOptions();
    initSectionTabs();
    initRelatedCards();
    initProductPageExtras();
    initAuthNavigation();
  }

  if (isCadastro) {
    initCadastroModo();
    initCadastroEvents();
  }
});
