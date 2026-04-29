// ============================================================
//  product-page.js  -  SkyLens  (com integração Firestore)
// ============================================================

import { SkyLensCommon } from './common.js';

const SkyLensProductPage = (() => {
  let firebaseApiPromise;

  function getFirebaseApi() {
    if (!firebaseApiPromise) {
      firebaseApiPromise = Promise.all([
        import('./firestore.js'),
        import('./auth.js'),
      ]).then(([firestore, auth]) => ({
        criarPedido: firestore.criarPedido,
        usuarioAtual: auth.usuarioAtual,
      }));
    }

    return firebaseApiPromise;
  }

  function getCurrentProduct() {
    const rawSlug = new URLSearchParams(window.location.search).get('produto') || 'dji-mavic-3-pro';
    const slug = SkyLensCommon.resolveProductSlug(rawSlug);
    return window.PRODUCT_CATALOG?.[slug] || window.PRODUCT_CATALOG?.['dji-mavic-3-pro'];
  }

  function buildStars(value) {
    const full = Math.floor(Number(value));
    return '\u2605'.repeat(full) + '\u2606'.repeat(Math.max(0, 5 - full));
  }

  function avatarFor(name) {
    return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  }

  function renderProductPage() {
    const product = getCurrentProduct();
    if (!product) return;

    const categoryLabel = product.anchor === 'drones' ? 'Drones' : product.anchor === 'cameras' ? 'Cameras' : 'Acessorios';
    document.title = `${product.name} - SkyLens`;
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

    renderGallery(product);
    renderPricing(product);
    renderDelivery(product);
    renderSpecs(product);
    renderIncludes(product);
    renderReviews(product);
    renderRelated(product);
  }

  function renderGallery(product) {
    const mainImg = document.getElementById('main-img');
    const thumbs = document.getElementById('gallery-thumbs');

    mainImg.src = product.gallery[0][0];
    mainImg.alt = product.name;
    mainImg.onerror = function onError() {
      this.src = product.gallery[0][1];
    };

    thumbs.innerHTML = product.gallery.map((img, i) => `
      <div class="thumb ${i === 0 ? 'active' : ''}" data-src="${img[0]}" data-fallback="${img[1]}">
        <img src="${img[0]}" alt="${product.name}" onerror="this.src='${img[1]}'" />
      </div>
    `).join('');
  }

  function renderPricing(product) {
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
  }

  function renderDelivery(product) {
    document.getElementById('delivery-info').innerHTML = product.delivery.map((item) => `
      <div class="delivery-row">
        <span class="di-icon">${item[3] || 'INFO'}</span>
        <div><div class="di-title">${item[1]}</div><div class="di-sub">${item[2]}</div></div>
        ${item[3] ? `<span class="di-badge">${item[3]}</span>` : ''}
      </div>
    `).join('');
  }

  function renderSpecs(product) {
    const groups = [product.specs.slice(0, 3), product.specs.slice(3)];

    document.getElementById('specs-grid').innerHTML = groups.map((group, i) => `
      <div class="spec-group">
        <div class="spec-group-title">${i === 0 ? 'Especificacoes principais' : 'Detalhes de uso'}</div>
        ${group.map((row) => `<div class="spec-row"><span class="spec-key">${row[0]}</span><span class="spec-val">${row[1]}</span></div>`).join('')}
      </div>
    `).join('');
  }

  function renderIncludes(product) {
    document.getElementById('includes-grid').innerHTML = product.includes.map((item) => `
      <div class="include-item"><div class="inc-icon">KIT</div><div><div class="inc-text">${item[1]}</div><div class="inc-sub">Kit SkyLens</div></div></div>
    `).join('');
  }

  function renderReviews(product) {
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
  }

  function renderRelated(product) {
    const currentSlug = SkyLensCommon.resolveProductSlug(
      new URLSearchParams(window.location.search).get('produto') || 'dji-mavic-3-pro',
    );

    const related = Object.entries(window.PRODUCT_CATALOG)
      .filter(([slug]) => slug !== currentSlug)
      .sort((a, b) => (a[1].anchor === product.anchor ? -1 : 1) - (b[1].anchor === product.anchor ? -1 : 1))
      .slice(0, 3);

    document.getElementById('related-grid').innerHTML = related.map(([slug, item]) => `
      <div class="rc" data-slug="${slug}">
        <img src="${item.gallery[0][0]}" alt="${item.name}" onerror="this.src='${item.gallery[0][1]}'" />
        <div class="rc-body"><div class="rc-cat">${item.category}</div><div class="rc-name">${item.name}</div><div><span class="rc-price">${item.rent[0][2]}</span><span class="rc-period">${item.rent[0][3]}</span></div></div>
      </div>
    `).join('');
  }

  function initGallery() {
    const mainImg = document.getElementById('main-img');
    if (!mainImg) return;

    document.querySelectorAll('.thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        mainImg.src = thumb.dataset.src;
        mainImg.onerror = function onError() {
          this.src = thumb.dataset.fallback;
        };

        document.querySelectorAll('.thumb').forEach((item) => item.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  function initPricingTabs() {
    document.querySelectorAll('.ptab').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ptab').forEach((tab) => tab.classList.remove('active'));
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
        document.querySelectorAll('.rent-opt').forEach((item) => item.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
  }

  function initSectionTabs() {
    document.querySelectorAll('.stab').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.stab').forEach((tab) => tab.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
        document.getElementById(btn.dataset.section)?.classList.add('active');
      });
    });
  }

  function initRelatedCards() {
    document.querySelectorAll('.rc[data-slug]').forEach((card) => {
      card.addEventListener('click', () => {
        window.location.href = `produto.html?produto=${card.dataset.slug}`;
      });
    });
  }

  function mostrarToast(mensagem, tipo = 'info') {
    let toast = document.getElementById('produto-toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'produto-toast';
      toast.style.cssText = [
        'position:fixed;top:1.5rem;left:50%;transform:translateX(-50%)',
        'color:#fff;padding:.75rem 1.5rem;border-radius:.75rem',
        'font-size:.9rem;font-weight:500;z-index:9999',
        'box-shadow:0 4px 24px rgba(0,0,0,.3)',
      ].join(';');
      document.body.appendChild(toast);
    }

    toast.style.background = tipo === 'success'
      ? 'var(--success,#2e7d32)'
      : tipo === 'error'
        ? 'var(--error,#e53935)'
        : '#1565c0';
    toast.textContent = mensagem;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3500);
  }

  function initPedidoBtns() {
    const product = getCurrentProduct();
    if (!product) return;

    const rawSlug = new URLSearchParams(window.location.search).get('produto') || 'dji-mavic-3-pro';
    const slug = SkyLensCommon.resolveProductSlug(rawSlug);

    const btnAlugar = document.getElementById('btn-alugar');
    if (btnAlugar) {
      btnAlugar.addEventListener('click', async (event) => {
        event.preventDefault();

        let firebaseApi;
        try {
          firebaseApi = await getFirebaseApi();
        } catch (error) {
          mostrarToast('Nao foi possivel conectar ao Firebase agora.', 'error');
          console.warn('Falha ao carregar Firebase para aluguel.', error);
          return;
        }

        if (!firebaseApi.usuarioAtual()) {
          mostrarToast('Faça login para alugar um equipamento.', 'error');
          setTimeout(() => { window.location.href = 'cadastro.html?modo=login'; }, 1500);
          return;
        }

        const optSelecionada = document.querySelector('.rent-opt.selected');
        const plano = optSelecionada?.querySelector('.opt-label')?.textContent || product.rent[0][0];
        const preco = optSelecionada?.querySelector('.opt-price')?.textContent || product.rent[0][2];
        const periodo = optSelecionada?.querySelector('.opt-period')?.textContent || product.rent[0][3];

        try {
          btnAlugar.disabled = true;
          btnAlugar.textContent = 'Processando...';
          await firebaseApi.criarPedido({ produtoSlug: slug, produtoNome: product.name, tipo: 'aluguel', plano, preco, periodo });
          mostrarToast('Pedido de aluguel registrado com sucesso.', 'success');
        } catch (err) {
          mostrarToast(err.message || 'Erro ao registrar pedido.', 'error');
        } finally {
          btnAlugar.disabled = false;
          btnAlugar.textContent = 'Reservar Agora';
        }
      });
    }

    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
      btnComprar.addEventListener('click', async (event) => {
        event.preventDefault();

        let firebaseApi;
        try {
          firebaseApi = await getFirebaseApi();
        } catch (error) {
          mostrarToast('Nao foi possivel conectar ao Firebase agora.', 'error');
          console.warn('Falha ao carregar Firebase para compra.', error);
          return;
        }

        if (!firebaseApi.usuarioAtual()) {
          mostrarToast('Faça login para comprar.', 'error');
          setTimeout(() => { window.location.href = 'cadastro.html?modo=login'; }, 1500);
          return;
        }

        try {
          btnComprar.disabled = true;
          btnComprar.textContent = 'Processando...';
          await firebaseApi.criarPedido({
            produtoSlug: slug,
            produtoNome: product.name,
            tipo: 'compra',
            plano: 'Compra direta',
            preco: product.buyPrice,
            periodo: '',
          });
          mostrarToast('Pedido de compra registrado com sucesso.', 'success');
        } catch (err) {
          mostrarToast(err.message || 'Erro ao registrar pedido.', 'error');
        } finally {
          btnComprar.disabled = false;
          btnComprar.textContent = 'Comprar Agora';
        }
      });
    }
  }

  function initProductPageExtras() {
    if (window.location.hash === '#comprar') {
      document.querySelector('.ptab[data-panel="buy-panel"]')?.click();
    }
  }

  function init() {
    renderProductPage();
    initGallery();
    initPricingTabs();
    initRentOptions();
    initSectionTabs();
    initRelatedCards();
    initPedidoBtns();
    initProductPageExtras();
    SkyLensCommon.initAuthNavigation();
  }

  return { init };
})();

window.SkyLensProductPage = SkyLensProductPage;
export { SkyLensProductPage };
