// ============================================================
//  app.js  —  SkyLens  (ponto de entrada, ES Module)
// ============================================================

import { SkyLensCommon } from './common.js';
import { SkyLensIndexPage } from './index-page.js';
import { SkyLensProductPage } from './product-page.js';
import { SkyLensCadastroPage } from './cadastro-page.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isIndex    = path.endsWith('index.html') || path === '/' || path.endsWith('/');
  const isProduto  = path.includes('produto.html');
  const isCadastro = path.includes('cadastro.html');

  SkyLensCommon.observeRevealElements(document);

  if (isIndex)    SkyLensIndexPage.init();
  if (isProduto)  SkyLensProductPage.init();
  if (isCadastro) SkyLensCadastroPage.init();
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) return false;

    // evita CPFs tipo 00000000000
    if (/^(\d)\1+$/.test(cpf)) return false;

    return validarDigitos(cpf);
}

function validarDigitos(cpf) {
    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return (
        parseInt(cpf.charAt(9)) === digito1 &&
        parseInt(cpf.charAt(10)) === digito2
    );
}


function validarCPFField() {
    const cpfInput = document.getElementById("cpf");
    const cpfErr = document.getElementById("cpf-err");
    const cpfIcon = document.getElementById("cpf-icon");

    const cpf = cpfInput.value;
    const cpfNumerico = cpf.replace(/\D/g, '');

    if (cpfNumerico.length < 11) {
        cpfErr.style.display = "none";
        cpfIcon.innerText = "";
        return false;
    }

    if (validarCPF(cpf)) {
        cpfErr.style.display = "none";
        cpfIcon.innerText = "✔";
        cpfIcon.style.color = "limegreen";
        return true;
    } else {
        cpfErr.style.display = "block";
        cpfIcon.innerText = "✖";
        cpfIcon.style.color = "red";
        return false;
    }
}

function aplicarMascaraCPF(e) {
    let v = e.target.value.replace(/\D/g, "");

    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = v;
}


document.addEventListener("DOMContentLoaded", () => {

    const cpfInput = document.getElementById("cpf");
    const btnSubmit = document.getElementById("btn-submit");

    cpfInput.addEventListener("input", (e) => {
        aplicarMascaraCPF(e);
        validarCPFField();
    });

    btnSubmit.addEventListener("click", (e) => {
        const valido = validarCPFField();

        if (!valido) {
            e.preventDefault();
        }
    });

});