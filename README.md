# Melodia — Sua Música, Sua Forma

Landing page do **Melodia**, um app de músicas para quem ama música, jovens e pessoas que buscam novas descobertas musicais. Projeto desenvolvido para o **Checkpoint 5 de Front-End (FIAP)**.

🔗 **Página publicada:** https://arturfbrandi.github.io/cp5-front-end/

## Sobre a aplicação

A página apresenta os diferenciais do Melodia: **qualidade de som superior**, **playlists personalizadas**, **descoberta de novos artistas** e **interface intuitiva**. O visual é moderno e clean, com tema escuro, cores vibrantes (gradiente rosa → roxo → índigo) e elementos musicais como disco de vinil, equalizador animado e letras sincronizadas.

A direção visual foi inspirada em referências de landing pages do [Dribbble](https://dribbble.com/search/front-end): tema escuro com brilhos coloridos, tipografia grande nos títulos, botões em formato de pílula, cards em grid "bento" e prova social com avatares.

### Seções

| Seção | O que tem |
| --- | --- |
| **Menu fixo** | Transparente no topo e com efeito de vidro (blur) ao rolar, feito em JavaScript. Menu hambúrguer no mobile e destaque da seção atual. |
| **Hero** | Título "Melodia: Sua Música, Sua Forma", descrição, botão **"Ouvir Agora"** e um mockup do app com **player de música funcional** (tocar/pausar, próxima, anterior, aleatório, repetir, barra de progresso). |
| **Gêneros** | Faixa animada infinita com os estilos musicais. |
| **Apresentação** | Os 4 benefícios principais em cards com ícones do Font Awesome. |
| **Funcionalidades** | Grid "bento" com playlists por humor (interativo), Hi-Fi, radar semanal, letras sincronizadas, modo offline e "Ouça junto". |
| **Depoimentos** | 6 depoimentos com citação, avaliação e foto de perfil. |
| **Formulário de contato** | Coleta nome, e-mail e estilo favorito para campanhas de marketing, com validação em JavaScript e mensagem de sucesso. |
| **Rodapé** | Contato, redes sociais, navegação e Política de Privacidade (modal). |

## Tecnologias

- **HTML5**: estrutura semântica (`header`, `nav`, `main`, `section`, `article`, `figure`, `blockquote`, `footer`, `dialog`).
- **CSS3** (`css/style.css`): variáveis CSS, gradientes, `@keyframes`, `backdrop-filter`, `mask-image`, `prefers-reduced-motion`.
- **Tailwind CSS v4**: layout responsivo e estilização com classes utilitárias; cores e fontes da marca definidas com `@theme`.
- **Font Awesome 6**: ícones.
- **Google Fonts**: *Unbounded* (títulos) e *Manrope* (textos).
- **JavaScript**: menu fixo, menu mobile, player de áudio, playlists por humor, validação do formulário e modal.
- **AOS (Animate On Scroll)**: biblioteca JS de animações ao rolar a página.

## Destaques técnicos (para a apresentação)

- **Estrutura HTML:** cada parte da página é uma `section` com `id`, usada pelos links do menu. Os ícones decorativos usam `aria-hidden="true"` e os botões só com ícone têm `aria-label`.
- **Classes Tailwind:** os tokens da marca ficam em `@theme` no `<head>` (ex.: `--color-brand-500`), o que gera classes como `bg-ink-950`, `text-brand-400` e `font-display`.
- **Layout responsivo (mobile first):** as classes sem prefixo valem para o celular e os prefixos `sm:`, `md:` e `lg:` adaptam o layout. Exemplos: `grid sm:grid-cols-2 lg:grid-cols-4` nos benefícios, `md:col-span-2` no grid de funcionalidades e `sm:columns-2 lg:columns-3` nos depoimentos.
- **Menu com transparência:** `js/main.js` adiciona a classe `header-scrolled` quando `window.scrollY > 24`. Essa classe (em `css/style.css`) aplica fundo translúcido + `backdrop-filter: blur()`.
- **Interações em JS:**
  - o player usa a API de `Audio` do navegador (eventos `play`, `pause`, `timeupdate`, `ended`);
  - o `IntersectionObserver` destaca no menu a seção visível;
  - o formulário é validado sem recarregar a página e salva o cadastro no `localStorage` (o projeto não tem back-end);
  - a Política de Privacidade usa o elemento nativo `<dialog>`.
- **CSS3 + Tailwind juntos:** o Tailwind cuida de layout, espaçamento e cores. O `style.css` fica com o que o Tailwind não cobre bem: animações (`equalize`, `spin`, `marquee`, `lyric`), capas geradas com `radial-gradient` e os estados alterados pelo JS.
- **Acessibilidade:** link "Pular para o conteúdo", foco visível, erros do formulário ligados aos campos com `aria-describedby`/`aria-invalid`, e animações desligadas para quem ativa "reduzir movimento" no sistema.

## Estrutura de pastas

```
cp5-front-end/
├── index.html          # página principal
├── css/
│   └── style.css       # estilos customizados (CSS3)
├── js/
│   └── main.js         # interações da página
├── assets/
│   ├── audio/          # prévias das músicas (CC BY 4.0)
│   └── img/            # favicon/logo e fotos de perfil
└── requisitos/         # enunciado do checkpoint
```

## Como executar

Não precisa instalar nada, basta um navegador. Para o player de áudio funcionar direito, sirva a pasta com um servidor local:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Outra opção é usar a extensão **Live Server** do VS Code.

## Publicação no GitHub Pages

1. Envie o código para a branch `main` do repositório.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, depois a branch `main` e a pasta `/ (root)`.
4. Em alguns minutos a página fica disponível em `https://arturfbrandi.github.io/cp5-front-end/`.

## Créditos

- **Músicas:** "Chill Wave", "Carefree" e "Local Forecast - Elevator", de Kevin MacLeod ([incompetech.com](https://incompetech.com)), licenciadas sob [Creative Commons: By Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). Os arquivos foram cortados em prévias de 90 segundos.
- **Fotos de perfil:** [Unsplash](https://unsplash.com) (Unsplash License).
- **Ícones:** [Font Awesome](https://fontawesome.com) (Free License).
- Os nomes, depoimentos, números e contatos exibidos na página são fictícios.

## Integrantes

- Artur Fabi Brandi RM570258
- Victor Bertacchini De Godoy RM571452
- Victor Lula Heineken Rodrigues RM570782
