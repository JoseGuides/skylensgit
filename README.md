# SkyLens 🚁

Plataforma de aluguel e venda de drones, câmeras e acessórios profissionais.

---

## Estrutura do Projeto

```
SkyLens/
├── index.html              # Página principal (catálogo + hero)
│
├── pages/
│   ├── produto.html        # Página de detalhe do produto
│   └── cadastro.html       # Cadastro / Login (formulário multi-step)
│
├── assets/
│   ├── css/
│   │   ├── styles.css      # Estilos da index.html
│   │   ├── produto.css     # Estilos da página de produto
│   │   └── cadastro.css    # Estilos da página de cadastro/login
│   ├── js/
│   │   └── script.js       # JavaScript único (filtros, validações, navegação)
│   └── img/
│       ├── DJIMavic3Pro.png
│       └── sonyfx3.png
│
└── README.md
```

---

## Como Rodar

Abra `index.html` diretamente no navegador — o projeto é 100% estático.

Para evitar problemas de CORS com as fontes do Google, prefira usar um servidor local:
```bash
# Python 3
python -m http.server 8080
# Acesse: http://localhost:8080
```

---

## Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Landing page com hero, catálogo com filtros e seção "Como Funciona" |
| `pages/produto.html` | Detalhe de produto: galeria, preços, especificações, avaliações |
| `pages/cadastro.html` | Cadastro em 2 etapas e modo login via `?modo=login` |

---

## Integrantes
Eduardo · Felipe · Gustavo
