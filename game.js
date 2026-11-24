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
  const channel = scene.channel.replace('Discord · ', '');
  const directMessage = channel.startsWith('Messages privés · ');
  const conversation = channel.startsWith('#') || directMessage;
  const chat = element('div', '', conversation ? 'chat conversation reveal' : 'chat reveal');
  const list = element('ol');
  // Certains dialogues consultent les actions retenues dans les scènes précédentes.
  const messages = typeof scene.messages === 'function' ? scene.messages(anchors) : scene.messages;
  messages.forEach(([author, message, time]) => {
    const item = element('li');
    const content = element('div');
    const byline = element('div', '', 'message-byline');
    byline.append(element('strong', author));
    if (time) byline.append(element('time', time));
    content.append(byline, element('p', message));
    if (conversation) {
      const avatar = element('span', author[0], 'avatar');
      avatar.dataset.author = author;
      avatar.setAttribute('aria-hidden', 'true');
      item.append(avatar);
    }
    item.append(content);
    list.append(item);
  });
  const title = element('h2', directMessage ? channel.replace('Messages privés · ', '@') : channel);
  if (conversation) {
    title.append(element('span', directMessage ? 'Message privé' : 'Promo 42', 'channel-context'));
  }
  chat.append(title, list);
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

function showFeedback(decision, scene, [, consequence, explanation, anchor]) {
  if (anchor) anchors.add(anchor);
  updateProgress(index + 1, scene.chapter);
  const feedback = element('div', '', 'feedback reveal');
  const heading = element('h2', 'Ce qui se passe ensuite');
  heading.tabIndex = -1;
  feedback.append(heading, element('p', consequence));
  feedback.append(element('h2', 'Repère pour la suite'), element('p', explanation));
  const actions = element('div', '', 'actions');
  actions.append(button(index + 1 === scenes.length ? 'Voir le Debug Report' : 'Continuer', advance, 'primary'));
  decision.replaceChildren(feedback, actions);
  heading.focus();
}

function renderReport() {
  document.body.classList.remove('final-screen');
  exitButton.hidden = true;
  updateProgress(scenes.length, -1);
  const section = element('section', '', 'report reveal');
  section.append(
    element('p', 'FIN DU PARCOURS', 'label'),
    element('h1', 'Debug Report'),
    element('p', 'Quatre repères pour la suite.')
  );
  if (skipped) section.append(element('p', skipped === 1 ? 'Une scène passée. Elle ne compte pas dans tes repères.' : skipped + ' scènes passées. Elles ne comptent pas dans tes repères.', 'meta'));

  const interventions = [
    ['direct', 'intervenir directement'], ['distraire', 'distraire'], ['deleguer', 'déléguer'],
    ['differer', 'différer'], ['documenter', 'documenter']
  ];
  const used = interventions.filter(([key]) => anchors.has(key)).map(([, label]) => label);
  const next = interventions.find(([key]) => !anchors.has(key));
  const identification = [
    ['roles', 'les rôles genrés'], ['credit', 'l’attribution du travail'],
    ['diffusion', 'la diffusion des messages privés'], ['cumul', 'l’accumulation des effets']
  ].filter(([key]) => anchors.has(key)).map(([, label]) => label);
  const topics = [
    ['Identifier les violences', identification.length ? 'Tu as repéré ' + identification.join(', ') + '.' : 'Observe à qui on demande le plus de preuves.'],
    ['Comprendre le consentement', anchors.has('limite') ? 'Tu as pris en compte la limite de Sarah. Un accord peut être retiré.' : 'Une aide ne donne aucun droit à une réponse intime.'],
    ['Intervenir comme témoin', (used.length ? 'Tes stratégies : ' + used.join(', ') + '. ' : '') + 'À essayer : ' + next[1] + '.'],
    ['Connaître les dispositifs d’aide', (anchors.has('aide') ? 'Tu as proposé un relais. ' : '') + 'À 42 Paris, victime ou témoin : social-report@42paris.fr.']
  ];
  const grid = element('div', '', 'report-grid');
  topics.forEach(([title, copy]) => {
    const card = element('article');
    card.append(element('h2', title), element('p', copy));
    grid.append(card);
  });
  const actions = element('div', '', 'actions');
  actions.append(button('Continuer vers la fin', renderEnding, 'primary'), resourcesLink());
  section.append(grid, actions);
  show(section);
}

function renderEnding() {
  document.body.classList.add('final-screen');
  const section = element('section', '', 'ending');
  const heading = element('h1', 'L’intention n’efface pas ', 'reveal');
  heading.append(element('span', 'l’impact.'));
  section.append(heading);

  [
    'Le silence n’interrompt pas la violence.',
    'Le changement commence aussi par les témoins.',
    'Simulation terminée. Dans la réalité, c’est à toi d’agir.'
  ].forEach((line, position) => {
    const paragraph = element('p', line, 'reveal');
    paragraph.style.setProperty('--delay', (position + 1) * 550 + 'ms');
    section.append(paragraph);
  });

  const actions = element('div', '', 'actions');
  actions.append(button('Rejouer', home, 'primary'), button('Revoir le bilan', renderReport), resourcesLink());
  section.append(actions);
  show(section);
}

function home() {
  document.body.classList.remove('final-screen');
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
