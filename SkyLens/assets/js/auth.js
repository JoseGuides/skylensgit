// ============================================================
//  auth.js  —  SkyLens
//  Autenticação com Firebase Auth (email/senha + Google)
// ============================================================

import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

import { salvarPerfil } from './firestore.js';

const googleProvider = new GoogleAuthProvider();

// ── Cadastro com e-mail e senha ────────────────────────────
export async function cadastrar(email, senha, dadosPerfil) {
  const credential = await createUserWithEmailAndPassword(auth, email, senha);
  const user = credential.user;

  // Atualiza o displayName no Firebase Auth
  await updateProfile(user, {
    displayName: `${dadosPerfil.nome} ${dadosPerfil.sobrenome}`.trim(),
  });

  // Salva perfil completo no Firestore
  await salvarPerfil(user.uid, {
    nome:      dadosPerfil.nome,
    sobrenome: dadosPerfil.sobrenome,
    cpf:       dadosPerfil.cpf,
    telefone:  dadosPerfil.telefone,
    tipoUso:   dadosPerfil.tipoUso,
    newsletter: dadosPerfil.newsletter,
    email:     user.email,
    criadoEm:  new Date(),
  });

  return user;
}

// ── Login com e-mail e senha ───────────────────────────────
export async function login(email, senha) {
  const credential = await signInWithEmailAndPassword(auth, email, senha);
  return credential.user;
}

// ── Login com Google ───────────────────────────────────────
export async function loginComGoogle() {
  const credential = await signInWithPopup(auth, googleProvider);
  const user = credential.user;

  // Se for um novo usuário via Google, cria o perfil no Firestore
  const isNewUser = credential._tokenResponse?.isNewUser;
  if (isNewUser) {
    const [nome, ...resto] = (user.displayName || 'Usuário').split(' ');
    await salvarPerfil(user.uid, {
      nome,
      sobrenome:  resto.join(' '),
      email:      user.email,
      tipoUso:    '',
      newsletter: false,
      criadoEm:   new Date(),
    });
  }

  return user;
}

// ── Logout ─────────────────────────────────────────────────
export async function logout() {
  await signOut(auth);
}

// ── Observador de estado de login ─────────────────────────
// Chame em qualquer página para reagir ao login/logout.
// callback(user) → user é o objeto Firebase User ou null.
export function observarLogin(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Retorna o usuário atual sincronamente ──────────────────
export function usuarioAtual() {
  return auth.currentUser;
}