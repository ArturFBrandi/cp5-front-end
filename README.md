
# Melodia

### Sua Música, Sua Forma

Landing page de uma plataforma de streaming musical, desenvolvida com foco em experiência do usuário, design responsivo e interatividade.

O **Melodia** é um projeto acadêmico desenvolvido para o Checkpoint 5 da disciplina de Front-End Design da FIAP. A aplicação apresenta a proposta de uma plataforma de streaming que combina qualidade sonora, personalização e descoberta musical em uma interface moderna e intuitiva.

O projeto utiliza HTML5, CSS3, Tailwind CSS e JavaScript para construir uma experiência de navegação dinâmica, acessível e adaptada a diferentes dispositivos.

**[Acessar aplicação](https://arturfbrandi.github.io/cp5-front-end/)**

---

## 1. Visão geral

O Melodia foi idealizado para proporcionar uma experiência musical personalizada, conectando usuários a novos artistas, gêneros e conteúdos de acordo com suas preferências.

A landing page apresenta os principais diferenciais da plataforma e permite que o visitante explore seus recursos por meio de componentes interativos.

A interface utiliza uma identidade visual baseada em tons escuros, gradientes e elementos gráficos associados ao universo musical, combinando estética contemporânea com princípios de usabilidade.

### Objetivos do projeto

- Desenvolver uma landing page responsiva utilizando tecnologias Front-End.
- Aplicar conceitos de HTML semântico e acessibilidade.
- Construir componentes visuais reutilizáveis e interativos.
- Implementar funcionalidades dinâmicas utilizando JavaScript.
- Proporcionar uma experiência consistente em dispositivos móveis e desktops.
- Aplicar boas práticas de organização, versionamento e documentação de código.

---

## 2. Funcionalidades

A aplicação apresenta os recursos da plataforma por meio de seções organizadas e componentes interativos.

| Funcionalidade | Descrição |
|---|---|
| Navegação responsiva | Menu fixo com adaptação para dispositivos móveis e destaque da seção ativa. |
| Player musical | Reprodução de áudio com controles de reprodução, navegação entre faixas, modo aleatório, repetição e barra de progresso. |
| Exploração de gêneros | Apresentação dinâmica de diferentes estilos musicais por meio de uma faixa animada. |
| Playlists personalizadas | Seleção interativa de playlists organizadas por diferentes estados de espírito. |
| Apresentação de recursos | Grid de funcionalidades com informações sobre qualidade sonora, descoberta musical e recursos da plataforma. |
| Depoimentos | Seção de prova social com avaliações e perfis demonstrativos. |
| Formulário de contato | Validação de dados em JavaScript, armazenamento local e confirmação visual de cadastro. |
| Política de privacidade | Exibição de informações em uma janela modal nativa. |

### Player de áudio

O player é um dos principais componentes interativos da aplicação.

Desenvolvido com JavaScript e a API `Audio` do navegador, permite reproduzir arquivos de áudio locais e controlar a execução das faixas diretamente pela interface.

O componente oferece controles de reprodução e pausa, navegação entre músicas, reprodução aleatória, repetição e acompanhamento do progresso da faixa.

Os eventos `play`, `pause`, `timeupdate` e `ended` são utilizados para sincronizar os controles e as informações exibidas na interface.

**Nota:** o Melodia é uma landing page demonstrativa. Funcionalidades como modo offline, recomendações personalizadas e reprodução compartilhada são apresentadas como recursos propostos para a plataforma, não como serviços completos implementados.

---

## 3. Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estruturação semântica e organização dos elementos da página. |
| CSS3 | Estilização personalizada, animações, gradientes e efeitos visuais. |
| Tailwind CSS v4 | Construção de layouts responsivos e aplicação de classes utilitárias. |
| JavaScript | Implementação do player musical, navegação, formulários e demais interações. |
| Font Awesome 6 | Biblioteca de ícones utilizados nos componentes da interface. |
| Google Fonts | Utilização das famílias tipográficas Unbounded e Manrope. |
| AOS | Animações de entrada dos elementos durante a rolagem. |
| Git e GitHub | Versionamento e gerenciamento colaborativo do código-fonte. |
| GitHub Pages | Hospedagem e publicação da aplicação. |

---

## 4. Arquitetura e implementação

### Estrutura semântica

A aplicação utiliza elementos semânticos do HTML5, como `header`, `nav`, `main`, `section`, `article`, `figure` e `footer`.

Cada seção possui um identificador individual, permitindo a navegação por âncoras e a integração com o sistema de identificação da seção ativa.

A utilização desses elementos contribui para a organização do documento, sua manutenção e a acessibilidade da interface.

### Estilização e responsividade

O projeto adota a abordagem *mobile first*, priorizando a experiência em dispositivos móveis e adaptando os componentes para resoluções maiores.

O Tailwind CSS é utilizado para definir layouts, espaçamentos, tipografia e estilos responsivos por meio de classes utilitárias.

A identidade visual é centralizada em tokens personalizados definidos com a diretiva `@theme`, permitindo a reutilização de cores e fontes em diferentes componentes.

O arquivo `css/style.css` complementa a estilização com animações, efeitos visuais e estados dinâmicos controlados pelo JavaScript.

Entre os recursos utilizados estão:

- CSS Grid e Flexbox para organização dos layouts.
- Media queries e breakpoints responsivos.
- Animações personalizadas com `@keyframes`.
- Gradientes e efeitos de transparência.
- `backdrop-filter` para o efeito de desfoque do cabeçalho.
- `prefers-reduced-motion` para adequação das animações às preferências do usuário.

### Interatividade com JavaScript

O arquivo `js/main.js` concentra a lógica das interações da aplicação.

**Navegação dinâmica:** o cabeçalho altera sua aparência conforme a posição de rolagem da página. A API `IntersectionObserver` identifica a seção visível e atualiza o destaque correspondente no menu.

**Player musical:** a API `Audio` gerencia a reprodução das faixas e permite sincronizar os controles da interface com o estado do áudio.

**Playlists por humor:** a interação com os componentes permite explorar diferentes seleções musicais.

**Formulário de contato:** a validação é realizada no navegador, sem recarregar a página. Após o preenchimento válido, os dados são armazenados no `localStorage` e uma mensagem de confirmação é exibida.

**Política de privacidade:** o elemento HTML `dialog` é utilizado para apresentar o conteúdo em uma janela modal.

### Acessibilidade

A interface incorpora recursos voltados à acessibilidade e à navegação por diferentes dispositivos e métodos de interação.

Entre as implementações estão a estrutura semântica, o link para acesso direto ao conteúdo principal, indicadores de foco visível e atributos ARIA para identificação de controles e mensagens de erro.

A aplicação também considera a preferência do usuário por movimento reduzido, adaptando as animações por meio de `prefers-reduced-motion`.

---

## 5. Estrutura de diretórios

```text
cp5-front-end/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── audio/
│   └── img/
├── requisitos/
└── README.md
```

| Diretório ou arquivo | Descrição |
|---|---|
| `index.html` | Estrutura principal da landing page. |
| `css/style.css` | Estilos personalizados, animações e efeitos visuais. |
| `js/main.js` | Lógica de interação e funcionalidades desenvolvidas em JavaScript. |
| `assets/audio/` | Arquivos de áudio utilizados no player musical. |
| `assets/img/` | Recursos visuais, incluindo imagens de perfil, logo e favicon. |
| `requisitos/` | Documentação e enunciado do Checkpoint. |
| `README.md` | Documentação técnica do projeto. |

---

## 6. Execução local

O projeto é uma aplicação Front-End estática e não requer instalação de dependências ou configuração de um servidor back-end.

### Pré-requisitos

- Navegador web atualizado.
- Git para clonagem do repositório.
- Python 3 ou uma extensão de servidor local, como Live Server.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/arturfbrandi/cp5-front-end.git
```

Acesse o diretório do projeto:

```bash
cd cp5-front-end
```

Inicie um servidor HTTP local:

```bash
python -m http.server 8000
```

Acesse a aplicação pelo navegador:

```text
http://localhost:8000
```

Alternativamente, abra o projeto no Visual Studio Code e utilize a extensão Live Server para executar o arquivo `index.html`.

O uso de um servidor local é recomendado para garantir o carregamento adequado dos recursos de áudio.

---

## 7. Publicação

A aplicação está publicada no GitHub Pages e pode ser acessada diretamente pelo navegador.

**[Melodia — Aplicação publicada](https://arturfbrandi.github.io/cp5-front-end/)**

A publicação é realizada a partir da branch `main`, utilizando a pasta raiz do repositório como origem dos arquivos estáticos.

---

## 8. Créditos e licenciamento

### Recursos de áudio

As músicas utilizadas no player são composições de Kevin MacLeod, disponibilizadas pelo site [Incompetech](https://incompetech.com).

- Chill Wave.
- Carefree.
- Local Forecast - Elevator.

Os arquivos foram utilizados em versões reduzidas de aproximadamente 90 segundos.

Licença informada para os arquivos de áudio: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

### Recursos visuais

- Fotografias: [Unsplash](https://unsplash.com) — Unsplash License.
- Ícones: [Font Awesome](https://fontawesome.com) — Free License.
- Referências de interface: [Dribbble](https://dribbble.com/search/front-end).

Os nomes, depoimentos, avaliações e dados apresentados na aplicação são fictícios e utilizados exclusivamente para fins demonstrativos.

---

## 9. Equipe de desenvolvimento

Projeto desenvolvido por estudantes da **FIAP — Faculdade de Informática e Administração Paulista**, como parte do Checkpoint 5 da disciplina de Front-End Design.

| Integrante | 
|---|---|
| Artur Fabi Brandi | RM570258 |
| Victor Bertacchini De Godoy | RM571452 |
| Victor Lula Heineken Rodrigues | RM570782 |

---

**FIAP — Engenharia de Software | Checkpoint 5 — Front-End Design**

Melodia — Sua Música, Sua Forma.