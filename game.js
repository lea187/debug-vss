// La partie vit uniquement en mémoire. Recharger la page efface les choix.
const screen = document.querySelector('#screen');
const progress = document.querySelector('#progress');
const count = document.querySelector('#count');
const chapterItems = [...document.querySelectorAll('#chapters li')];
const motionButton = document.querySelector('#motion');
const exitButton = document.querySelector('#exit');
const intro = screen.firstElementChild;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const anchors = new Set();
let reduceAnimations = false;
let index = 0;
let skipped = 0;

const chapterNames = ['01 — IDENTIFY', '02 — UNDERSTAND', '03 — FIX'];

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(text, onClick, className) {
  const node = element('button', text, className);
  node.type = 'button';
  node.addEventListener('click', onClick);
  return node;
}

function resourcesLink() {
  const link = element('a', 'Consulter les ressources');
  link.href = 'ressources.html';
  return link;
}

function show(section) {
  screen.replaceChildren(section);
  const heading = section.querySelector('h1');
  heading.tabIndex = -1;
  heading.focus();
}

function updateProgress(completed, chapter) {
  progress.max = scenes.length;
  progress.value = completed;
  count.textContent = String(completed).padStart(2, '0') + ' / ' + scenes.length;
  chapterItems.forEach((item, position) => {
    item.removeAttribute('aria-current');
    if (position === chapter) item.setAttribute('aria-current', 'step');
  });
}

function updateMotion() {
  document.body.classList.toggle('reduced', reduceAnimations);
  motionButton.setAttribute('aria-pressed', String(reduceAnimations || reducedMotion.matches));
  motionButton.disabled = reducedMotion.matches;
  motionButton.title = reducedMotion.matches ? 'Préférence de réduction des animations active sur cet appareil' : '';
}

motionButton.addEventListener('click', () => {
  reduceAnimations = !reduceAnimations;
  updateMotion();
});
reducedMotion.addEventListener('change', updateMotion);
updateMotion();

function resetRun() {
  index = 0;
  skipped = 0;
  anchors.clear();
}

function start() {
  resetRun();
  exitButton.hidden = false;
  renderScene();
}

function advance() {
  index += 1;
  if (index === scenes.length) renderReport();
  else renderScene();
}

function skipScene() {
  skipped += 1;
  advance();
}

function renderScene(revealSensitive = false) {
  const scene = scenes[index];
  const section = element('section', '', 'scene reveal');
  updateProgress(index, scene.chapter);
  section.append(
    element('p', chapterNames[scene.chapter], 'label'),
    element('p', scene.time + ' · Scène ' + (index + 1) + ' sur ' + scenes.length, 'meta'),
    element('h1', scene.title)
  );

  if (scene.sensitive && !revealSensitive) {
    const warning = element('div', '', 'warning');
    warning.append(element('strong', 'Scène sensible'), element('p', scene.sensitive + '.'));
    const actions = element('div', '', 'actions');
    actions.append(
      button('Afficher la scène', () => renderScene(true), 'primary'),
      button('Passer cette scène', skipScene)
    );
    section.append(warning, actions);
    show(section);
    return;
  }

  section.append(element('p', scene.story, 'reveal'));
  const chat = element('div', '', 'chat reveal');
  const list = element('ol');
  // Certains dialogues consultent les actions retenues dans les scènes précédentes.
  const messages = typeof scene.messages === 'function' ? scene.messages(anchors) : scene.messages;
  messages.forEach(([author, message]) => {
    const item = element('li');
    item.append(element('strong', author), element('p', message));
    list.append(item);
  });
  chat.append(element('h2', scene.channel), list);
  section.append(chat);

  const decision = element('div');
  const prompt = element('h2', scene.prompt, 'prompt');
  prompt.id = 'prompt';
  const choices = element('div', '', 'choices');
  choices.setAttribute('role', 'group');
  choices.setAttribute('aria-labelledby', prompt.id);
  // La rotation évite que les propositions occupent toujours la même position.
  const offset = index % scene.choices.length;
  const orderedChoices = [...scene.choices.slice(offset), ...scene.choices.slice(0, offset)];
  orderedChoices.forEach((choice, position) => {
    const option = button('', () => showFeedback(decision, scene, choice), 'choice');
    const marker = element('span', String.fromCharCode(65 + position));
    marker.setAttribute('aria-hidden', 'true');
    option.append(marker, document.createTextNode(choice[0]));
    choices.append(option);
  });
  decision.append(prompt, choices);
  if (scene.sensitive) {
    const actions = element('div', '', 'actions');
    actions.append(button('Passer cette scène', skipScene));
    decision.append(actions);
  }
  section.append(decision);
  show(section);
}

function showFeedback(decision, scene, [selection, consequence, explanation, anchor]) {
  if (anchor) anchors.add(anchor);
  updateProgress(index + 1, scene.chapter);
  const feedback = element('div', '', 'feedback reveal');
  const heading = element('h2', 'Ce qui se passe ensuite');
  heading.tabIndex = -1;
  feedback.append(heading, element('p', 'Ton choix — ' + selection, 'meta'), element('p', consequence));
  feedback.append(element('h2', 'Repère pour la suite'), element('p', explanation));
  const actions = element('div', '', 'actions');
  actions.append(button(index + 1 === scenes.length ? 'Voir le Debug Report' : 'Continuer', advance, 'primary'));
  decision.replaceChildren(feedback, actions);
  heading.focus();
}

function renderReport() {
  exitButton.hidden = true;
  updateProgress(scenes.length, -1);
  const section = element('section', '', 'report reveal');
  section.append(
    element('p', 'FIN DU PARCOURS', 'label'),
    element('h1', 'Debug Report'),
    element('p', 'Des repères tirés de tes décisions pour réfléchir à ce que tu pourrais faire dans une situation réelle.')
  );
  if (skipped) section.append(element('p', skipped === 1 ? 'Une scène passée. Elle ne compte pas dans tes repères.' : skipped + ' scènes passées. Elles ne comptent pas dans tes repères.', 'meta'));

  const interventions = [
    ['direct', 'intervenir directement'], ['distraire', 'distraire'], ['deleguer', 'déléguer'],
    ['differer', 'différer'], ['documenter', 'documenter']
  ];
  const used = interventions.filter(([key]) => anchors.has(key)).map(([, label]) => label);
  const next = interventions.find(([key]) => !anchors.has(key));
  const identification = [
    ['roles', 'les rôles genrés'], ['credit', 'l’attribution du travail'], ['acces', 'l’exclusion par les canaux privés'],
    ['diffusion', 'la diffusion des messages privés'], ['cumul', 'l’accumulation des effets'], ['impact', 'la distinction entre intention et impact']
  ].filter(([key]) => anchors.has(key)).map(([, label]) => label);
  const topics = [
    ['Identifier les violences', identification.length ? 'Tes choix ont abordé ' + identification.join(', ') + '. En réunion, observe aussi qui doit apporter davantage de preuves pour être entendu.' : 'Observe les faits qui se répètent. Qui obtient les tâches techniques ? Qui doit défendre son diagnostic ? Qui reçoit les invitations ?'],
    ['Comprendre le consentement', anchors.has('silence') ? 'Tu as proposé de s’arrêter face à l’immobilité. En pratique, laisse à l’autre la possibilité de refuser ou de changer d’avis sans pression.' : anchors.has('limite') ? 'Tu as pris en compte une limite exprimée. Quand une personne hésite ou se fige, arrête-toi aussi et laisse-lui le choix de reprendre.' : 'Quand une personne se fige ou hésite, arrête-toi. Cherche un accord libre pour ce moment précis, sans insister.'],
    ['Intervenir comme témoin', (used.length ? 'Tu as mis en pratique ces stratégies : ' + used.join(', ') + '. ' : '') + 'Pour élargir tes options, entraîne-toi à ' + (next ? next[1] : 'adapter ton intervention aux risques et aux besoins de la personne') + ' quand le contexte le permet.'],
    ['Connaître les dispositifs d’aide', anchors.has('aide') ? 'Tu as proposé un relais. Repère le contact officiel de ton campus et le rôle de chaque service avant d’en avoir besoin.' : 'Explore les ressources pour distinguer l’écoute, les soins, le signalement interne et les démarches externes.']
  ];
  const grid = element('div', '', 'report-grid');
  topics.forEach(([title, copy]) => {
    const card = element('article');
    card.append(element('h2', title), element('p', copy));
    grid.append(card);
  });
  const ending = element('div', '', 'ending');
  [
    'L’intention n’efface pas l’impact.',
    'Le silence n’interrompt pas la violence.',
    'Le changement commence aussi par les témoins.',
    'Simulation terminée. Dans la réalité, c’est à toi d’agir.'
  ].forEach((line, position) => {
    const paragraph = element('p', line, 'reveal');
    paragraph.style.setProperty('--delay', position * 500 + 'ms');
    ending.append(paragraph);
  });
  const actions = element('div', '', 'actions');
  actions.append(button('Rejouer', home, 'primary'), resourcesLink());
  section.append(grid, ending, actions);
  show(section);
}

function home() {
  resetRun();
  exitButton.hidden = true;
  updateProgress(0, -1);
  show(intro);
}

exitButton.addEventListener('click', () => {
  home();
  const notice = element('p', 'Tu as quitté la simulation. Les ressources restent accessibles.', 'feedback');
  notice.id = 'exit-notice';
  notice.tabIndex = -1;
  intro.querySelector('#exit-notice')?.remove();
  intro.querySelector('#start').before(notice);
  notice.focus();
});

document.querySelector('#start').addEventListener('click', () => {
  intro.querySelector('#exit-notice')?.remove();
  start();
});
updateProgress(0, -1);
