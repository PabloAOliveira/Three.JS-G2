# G2 — Cena Three.JS

**Integrantes:**
- Pablo Antônio De Oliveira(1134335);
- Gabriela Lenz(1134940);

Trabalho de Computação Gráfica com **Three.js** e **Rapier** (Vanilla JavaScript).

## Cenas

- **Cena 1 — Sala Lounge** (obrigatória): sala com sofá, poltrona, planta, ar-condicionado, luminária e persiana animada com Rapier.
- **Cena 2 — Lounge Laranja** (opção 2): ambiente laranja com janela, plataforma geométrica, puff e iluminação de teto.

Use os botões no topo da tela para alternar entre as cenas.

## Pré-requisitos

- Navegador moderno com suporte a ES Modules (Chrome, Firefox, Edge, Safari)
- Conexão com a internet (as bibliotecas Three.js e Rapier são carregadas via CDN)
- Python 3 instalado (para o servidor local)

## Como executar

Entre na pasta `G2` e inicie o servidor local:

```bash
cd G2
python3 -m http.server -b 127.0.0.1 8000
```

No Windows, se `python3` não funcionar, tente:

```bash
python -m http.server -b 127.0.0.1 8000
```

Depois, abra no navegador:

**http://127.0.0.1:8000/**

## Controles

- **Arrastar com o botão esquerdo:** girar a câmera
- **Scroll do mouse:** aproximar / afastar
- **Botão direito + arrastar:** mover a câmera (pan)

## Estrutura

```
G2/
├── index.html
├── README.md
├── imgs/                  # imagens de referência do trabalho
├── styles/
│   └── main.css
└── src/
    ├── main.js
    └── World/
        ├── World.js
        ├── components/
        │   ├── lounge/    # cena obrigatória
        │   └── orange/    # opção 2
        └── systems/       # Renderer, Resizer, Physics (Rapier)
```

## Tecnologias

- [Three.js](https://threejs.org/) 0.180.0
- [@dimforge/rapier3d-compat](https://rapier.rs/) 0.14.0
