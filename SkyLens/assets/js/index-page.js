// ============================================================
//  index-page.js  -  SkyLens
// ============================================================

import { SkyLensCommon } from './common.js';

const SkyLensIndexPage = (() => {
  function fp(cat, btn) {
    document.querySelectorAll('.cat-tab').forEach((tab) => tab.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.pc').forEach((card) => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  }

  window.fp = fp;

  function initProductLinks() {
    document.querySelectorAll('.pc').forEach((card) => {
      const nameEl = card.querySelector('.pname');
      if (!nameEl) return;

      const slug = SkyLensCommon.toSlug(nameEl.textContent);
      card.style.cursor = 'pointer';

      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        window.location.href = `pages/produto.html?produto=${slug}`;
      });

      card.querySelector('.bout')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `pages/produto.html?produto=${slug}#alugar`;
      });

      card.querySelector('.bacc')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `pages/produto.html?produto=${slug}#comprar`;
      });
    });
  }

  function init() {
    SkyLensCommon.initAuthNavigation();
    initProductLinks();
  }

  return { init };
})();

window.SkyLensIndexPage = SkyLensIndexPage;
export { SkyLensIndexPage };
