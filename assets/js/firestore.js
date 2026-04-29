// ============================================================
//  firestore.js  —  SkyLens
//  Operações no Firestore: perfis, pedidos e avaliações
// ============================================================

import { db, auth } from './firebase-config.js';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ============================================================
//  PERFIS DE USUÁRIO  (coleção: "usuarios")
// ============================================================

/** Salva ou atualiza o perfil do usuário. */
export async function salvarPerfil(uid, dados) {
  await setDoc(doc(db, 'usuarios', uid), dados, { merge: true });
}

/** Busca o perfil do usuário logado. */
export async function buscarPerfil() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');
  const snap = await getDoc(doc(db, 'usuarios', uid));
  return snap.exists() ? snap.data() : null;
}

// ============================================================
//  PEDIDOS  (coleção: "pedidos")
// ============================================================

/**
 * Cria um pedido de aluguel ou compra.
 * @param {Object} pedido
 * @param {string} pedido.produtoSlug   - ex: 'dji-mavic-3-pro'
 * @param {string} pedido.produtoNome   - ex: 'DJI Mavic 3 Pro'
 * @param {string} pedido.tipo          - 'aluguel' | 'compra'
 * @param {string} pedido.plano         - ex: 'Diaria', 'Semanal', 'Mensal'
 * @param {string} pedido.preco         - ex: 'R$650'
 * @param {string} pedido.periodo       - ex: '/dia'
 */
export async function criarPedido(pedido) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Faça login para continuar.');

  const docRef = await addDoc(collection(db, 'pedidos'), {
    ...pedido,
    uid,
    email:     auth.currentUser.email,
    status:    'pendente',          // pendente | confirmado | cancelado
    criadoEm:  serverTimestamp(),
  });

  return docRef.id;
}

/** Busca todos os pedidos do usuário logado, do mais recente ao mais antigo. */
export async function buscarMeusPedidos() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário não autenticado.');

  const q = query(
    collection(db, 'pedidos'),
    where('uid', '==', uid),
    orderBy('criadoEm', 'desc'),
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ============================================================
//  AVALIAÇÕES  (coleção: "avaliacoes")
// ============================================================

/**
 * Salva uma avaliação de produto.
 * @param {string} produtoSlug  - slug do produto avaliado
 * @param {number} nota         - 1 a 5
 * @param {string} comentario   - texto da avaliação
 */
export async function avaliarProduto(produtoSlug, nota, comentario) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Faça login para avaliar.');

  await addDoc(collection(db, 'avaliacoes'), {
    produtoSlug,
    nota,
    comentario,
    uid,
    nomeUsuario: auth.currentUser.displayName || 'Usuário',
    criadoEm:   serverTimestamp(),
  });
}

/** Busca todas as avaliações de um produto. */
export async function buscarAvaliacoes(produtoSlug) {
  const q = query(
    collection(db, 'avaliacoes'),
    where('produtoSlug', '==', produtoSlug),
    orderBy('criadoEm', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}