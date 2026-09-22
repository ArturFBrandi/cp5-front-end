/* =====================================================================
   Melodia — interações da landing page
   1. Menu fixo com efeito de transparência
   2. Menu mobile
   3. Link ativo no menu conforme a seção visível
   4. Faixa de gêneros (marquee)
   5. Player de música do mockup
   6. Playlists por humor
   7. Formulário de contato (validação + cadastro)
   8. Modal da Política de Privacidade
   9. Animações ao rolar (biblioteca AOS)
   ===================================================================== */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = $('#header');

/* ---------- 1. Menu fixo: transparente no topo, com fundo de vidro ao rolar ---------- */
function initHeader() {
  const onScroll = () => header.classList.toggle('header-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- 2. Menu mobile ---------- */
function initMobileMenu() {
  const toggle = $('#menu-toggle');
  const menu = $('#mobile-menu');
  const icon = $('i', toggle);

  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  };

  toggle.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
  $$('a', menu).forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setOpen(false));
}

/* ---------- 3. Destaca no menu a seção que está na tela ---------- */
function initScrollSpy() {
  const links = $$('[data-nav]');
  // O hero (#inicio) também é observado: quando ele está na tela, nenhum link fica ativo
  const sections = ['#inicio', ...new Set(links.map((link) => link.getAttribute('href')))]
    .map((id) => $(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- 4. Duplica a lista de gêneros para o loop infinito do marquee ---------- */
function initMarquee() {
  const track = $('.marquee__track');
  const list = $('ul', track);
  const clone = list.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.removeAttribute('aria-label');
  track.append(clone);
}

/* ---------- 5. Player de música ---------- */
const tracks = [
  { title: 'Chill Wave', artist: 'Kevin MacLeod', src: 'assets/audio/chill-wave.m4a', cover: 'cover--1' },
  { title: 'Carefree', artist: 'Kevin MacLeod', src: 'assets/audio/carefree.m4a', cover: 'cover--2' },
  { title: 'Local Forecast', artist: 'Kevin MacLeod', src: 'assets/audio/local-forecast.m4a', cover: 'cover--3' },
];

function initPlayer() {
  const audio = new Audio();
  audio.preload = 'metadata';

  const visual = $('#hero-visual');
  const cover = $('#player-cover');
  const title = $('#player-title');
  const artist = $('#player-artist');
  const progress = $('#player-progress');
  const current = $('#player-current');
  const duration = $('#player-duration');
  const playBtn = $('#player-play');
  const heroBtn = $('#hero-play');
  const shuffleBtn = $('#player-shuffle');
  const repeatBtn = $('#player-repeat');
  const likeBtn = $('#player-like');

  let index = 0;
  let shuffle = false;

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const setProgress = (percent) => {
    const value = Number.isFinite(percent) ? percent : 0;
    progress.value = value;
    progress.style.setProperty('--progress', `${value}%`);
  };

  // Atualiza botões, ícones e animações (vinil + equalizador) conforme o estado
  const render = (playing) => {
    visual.classList.toggle('is-playing', playing);
    $('[data-icon]', playBtn).className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    playBtn.setAttribute('aria-label', playing ? 'Pausar' : 'Tocar');
    $('[data-icon]', heroBtn).className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    $('[data-label]', heroBtn).textContent = playing ? 'Pausar' : 'Ouvir Agora';
    heroBtn.setAttribute('aria-pressed', String(playing));
  };

  const play = () => {
    audio.play().catch(() => render(!audio.paused));
  };

  const loadTrack = (newIndex, autoplay) => {
    index = (newIndex + tracks.length) % tracks.length;
    const track = tracks[index];
    audio.src = track.src;
    title.textContent = track.title;
    artist.textContent = track.artist;
    cover.classList.remove(...tracks.map((t) => t.cover));
    cover.classList.add(track.cover);
    current.textContent = '0:00';
    setProgress(0);
    if (autoplay) play();
  };

  const next = (autoplay = !audio.paused) => {
    let nextIndex = index + 1;
    if (shuffle && tracks.length > 1) {
      do nextIndex = Math.floor(Math.random() * tracks.length);
      while (nextIndex === index);
    }
    loadTrack(nextIndex, autoplay);
  };

  const prev = () => {
    // Como nos apps de música: se já passou de 3s, volta ao início da faixa
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    loadTrack(index - 1, !audio.paused);
  };

  const toggle = () => (audio.paused ? play() : audio.pause());

  // Eventos do elemento <audio>
  audio.addEventListener('play', () => render(true));
  audio.addEventListener('pause', () => render(false));
  audio.addEventListener('ended', () => next(true));
  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('timeupdate', () => {
    current.textContent = formatTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  });

  // Controles
  heroBtn.addEventListener('click', toggle);
  playBtn.addEventListener('click', toggle);
  $('#player-next').addEventListener('click', () => next());
  $('#player-prev').addEventListener('click', prev);

  progress.addEventListener('input', () => {
    setProgress(Number(progress.value));
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  shuffleBtn.addEventListener('click', () => {
    shuffle = !shuffle;
    shuffleBtn.setAttribute('aria-pressed', String(shuffle));
  });

  repeatBtn.addEventListener('click', () => {
    audio.loop = !audio.loop;
    repeatBtn.setAttribute('aria-pressed', String(audio.loop));
  });

  likeBtn.addEventListener('click', () => {
    const liked = likeBtn.getAttribute('aria-pressed') !== 'true';
    likeBtn.setAttribute('aria-pressed', String(liked));
    likeBtn.classList.toggle('text-brand-500', liked);
    $('i', likeBtn).className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  });

  loadTrack(0, false);
}

/* ---------- 6. Playlists por humor ---------- */
const moods = {
  foco: {
    name: 'Foco total',
    meta: '32 faixas · 1h 48min',
    cover: 'cover--3',
    songs: [
      ['Página 42', 'Estúdio Norte', '3:12'],
      ['Café e Chuva', 'Lia Sato', '2:47'],
      ['Madrugada Lo-fi', 'Nuvem Baixa', '3:05'],
    ],
  },
  treino: {
    name: 'Treino pesado',
    meta: '28 faixas · 1h 32min',
    cover: 'cover--2',
    songs: [
      ['Pulso 150', 'Voltagem', '3:21'],
      ['Última Série', 'MC Aurora', '2:58'],
      ['Sprint', 'Os Contraventos', '3:40'],
    ],
  },
  relax: {
    name: 'Fim de tarde',
    meta: '40 faixas · 2h 15min',
    cover: 'cover--1',
    songs: [
      ['Maré Mansa', 'Clara Vento', '4:02'],
      ['Varanda', 'Trio Ipê', '3:33'],
      ['Horizonte', 'Sofia Lume', '3:48'],
    ],
  },
  festa: {
    name: 'Sextou',
    meta: '50 faixas · 2h 50min',
    cover: 'cover--4',
    songs: [
      ['Pista Cheia', 'Neon Club', '3:15'],
      ['Batidão de Verão', 'MC Aurora', '2:51'],
      ['Até o Sol Nascer', 'Duo Farol', '3:36'],
    ],
  },
};

function initMoods() {
  const chips = $$('[data-mood]');
  const cover = $('#mood-cover');
  const name = $('#mood-name');
  const meta = $('#mood-meta');
  const list = $('#mood-songs');

  const createSong = ([songTitle, songArtist, time], position) => {
    const li = document.createElement('li');
    li.className = 'flex items-center gap-3 py-2.5';
    li.innerHTML = `
      <span class="w-4 text-white/35"></span>
      <span class="min-w-0 flex-1">
        <span class="block truncate font-semibold"></span>
        <span class="block truncate text-white/45"></span>
      </span>
      <span class="text-white/40"></span>`;
    const [num, , songEl, artistEl, timeEl] = li.querySelectorAll('span');
    num.textContent = position + 1;
    songEl.textContent = songTitle;
    artistEl.textContent = songArtist;
    timeEl.textContent = time;
    return li;
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const mood = moods[chip.dataset.mood];
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      cover.classList.remove('cover--1', 'cover--2', 'cover--3', 'cover--4');
      cover.classList.add(mood.cover);
      name.textContent = mood.name;
      meta.textContent = mood.meta;
      list.replaceChildren(...mood.songs.map(createSong));
    });
  });
}

/* ---------- 7. Formulário de contato ---------- */
function initForm() {
  const form = $('#newsletter-form');
  const success = $('#form-success');
  const submit = $('button[type="submit"]', form);

  const rules = {
    name: (field) => field.value.trim().length >= 2 || 'Informe seu nome (mínimo de 2 letras).',
    email: (field) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value.trim()) || 'Digite um e-mail válido, como voce@email.com.',
    consent: (field) => field.checked || 'Marque esta opção para receber nossos e-mails.',
  };

  // Valida um campo e mostra/esconde a mensagem de erro
  const validate = (fieldName) => {
    const field = form.elements[fieldName];
    const result = rules[fieldName](field);
    const message = result === true ? '' : result;
    $(`#${fieldName}-error`).textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  };

  Object.keys(rules).forEach((fieldName) => {
    const field = form.elements[fieldName];
    const eventName = field.type === 'checkbox' ? 'change' : 'blur';
    field.addEventListener(eventName, () => validate(fieldName));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(fieldName);
    });
  });

  const saveLead = (lead) => {
    try {
      const leads = JSON.parse(localStorage.getItem('melodia:leads') || '[]');
      leads.push(lead);
      localStorage.setItem('melodia:leads', JSON.stringify(leads));
    } catch {
      // Navegação privada ou armazenamento bloqueado: segue sem salvar
    }
  };

  const setLoading = (loading) => {
    submit.disabled = loading;
    $('[data-label]', submit).textContent = loading ? 'Enviando...' : 'Quero meu mês grátis';
    $('[data-icon]', submit).className = loading ? 'fa-solid fa-circle-notch fa-spin' : 'fa-solid fa-paper-plane';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = Object.keys(rules);
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      form.elements[fields.find((f) => form.elements[f].getAttribute('aria-invalid') === 'true')].focus();
      return;
    }

    const lead = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim().toLowerCase(),
      genre: form.elements.genre.value,
      createdAt: new Date().toISOString(),
    };

    // Simula o envio (não há back-end neste projeto)
    setLoading(true);
    setTimeout(() => {
      saveLead(lead);
      setLoading(false);
      $('#success-name').textContent = lead.name.split(' ')[0];
      $('#success-email').textContent = lead.email;
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.focus();
    }, 900);
  });

  $('#form-reset').addEventListener('click', () => {
    form.reset();
    Object.keys(rules).forEach((f) => form.elements[f].removeAttribute('aria-invalid'));
    success.classList.add('hidden');
    form.classList.remove('hidden');
    form.elements.name.focus();
  });
}

/* ---------- 8. Modal da Política de Privacidade ---------- */
function initPrivacyDialog() {
  const dialog = $('#privacy-dialog');
  $$('[data-open-privacy]').forEach((button) => button.addEventListener('click', () => dialog.showModal()));
  // Fecha ao clicar fora da caixa (no fundo escurecido)
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

/* ---------- Inicialização ---------- */
initHeader();
initMobileMenu();
initScrollSpy();
initMarquee();
initPlayer();
initMoods();
initForm();
initPrivacyDialog();
$('#year').textContent = new Date().getFullYear();

/* ---------- 9. Animações ao rolar (AOS) ---------- */
if (window.AOS) {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
}
