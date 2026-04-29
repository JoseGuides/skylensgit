const SkyLensCommon = (() => {
  const isRoot = window.location.pathname.endsWith('index.html')
    || window.location.pathname === '/'
    || window.location.pathname.endsWith('/');
  const pagePrefix = isRoot ? 'pages/' : '';

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
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  }

  function resolveProductSlug(rawSlug) {
    return window.PRODUCT_ALIASES?.[rawSlug] || rawSlug;
  }

  function applyLoggedOutNav(btnGhost, btnPrimary) {
    if (btnGhost) {
      btnGhost.textContent = 'Entrar';
      btnGhost.style.pointerEvents = '';
      btnGhost.onclick = (e) => {
        e.preventDefault();
        window.location.href = `${pagePrefix}cadastro.html?modo=login`;
      };
    }

    if (btnPrimary) {
      btnPrimary.textContent = 'Alugar Agora';
      btnPrimary.onclick = (e) => {
        e.preventDefault();
        window.location.href = `${pagePrefix}cadastro.html`;
      };
    }
  }

  async function initAuthNavigation() {
    const btnGhost = document.querySelector('.nav-cta .btn-ghost');
    const btnPrimary = document.querySelector('.nav-cta .btn-primary');

    applyLoggedOutNav(btnGhost, btnPrimary);

    try {
      const { observarLogin, logout } = await import('./auth.js');

      observarLogin((user) => {
        if (user) {
          const nome = user.displayName?.split(' ')[0] || 'Conta';

          if (btnGhost) {
            btnGhost.textContent = `Olá, ${nome}`;
            btnGhost.style.pointerEvents = 'none';
          }

          if (btnPrimary) {
            btnPrimary.textContent = 'Sair';
            btnPrimary.onclick = async (e) => {
              e.preventDefault();
              await logout();
              window.location.reload();
            };
          }

          return;
        }

        applyLoggedOutNav(btnGhost, btnPrimary);
      });
    } catch (error) {
      console.warn('Firebase Auth indisponível; navegação mantida em modo local.', error);
    }

    document.querySelectorAll('a[href="#"]').forEach((link) => {
      const text = link.textContent.trim().toLowerCase();

      if (text.includes('criar conta') || text.includes('cadastr')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = `${pagePrefix}cadastro.html`;
        });
      }
    });
  }

  return { pagePrefix, observeRevealElements, toSlug, resolveProductSlug, initAuthNavigation };
})();

window.SkyLensCommon = SkyLensCommon;
export { SkyLensCommon };
