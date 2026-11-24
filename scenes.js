// Chaque choix contient son libellé, sa conséquence, un repère et une action facultative.
const scenes = [
  {
    chapter: 0, time: 'Piscine · Vendredi', title: 'Rush00', channel: 'Discord · #rush00',
    story: 'Ton groupe teste son premier programme en C.',
    messages: [
      ['Sarah', 'Avec une largeur de 1, ça affiche deux caractères.', '21:10'],
      ['Thomas', 'Lucas, regarde la boucle. Sarah, tu prends les notes ?', '21:11']
    ],
    prompt: 'Que proposes-tu ?',
    choices: [
      ['Sarah nous montre son test.', 'Sarah repère le bug en partageant son écran.', 'Suivre sa piste lui donne la main sur le code.', 'roles'],
      ['Sarah et Lucas déboguent ensemble.', 'Ils corrigent en vocal. Lucas poste le patch.', 'Le binôme partage le travail. Le salon peut aussi créditer le diagnostic.', 'binome'],
      ['Je prends les notes. Sarah montre le test à Lucas.', 'Sarah lui envoie le test en privé.', 'L’entraide libère du temps. Le groupe ne voit pas forcément sa contribution.']
    ]
  },
  {
    chapter: 0, time: 'Après la Piscine', title: 'La preuve en plus', channel: 'Discord · #libft',
    story: 'Chacun écrit sa Libft. Le salon est ouvert à toute la promo.',
    messages: (anchors) => [
      ['Sarah', 'Mon test de ft_memmove échoue quand les zones se chevauchent.'],
      ['Thomas', 'T’es sûre ? Lucas, tu confirmes ?'],
      ['Lucas', anchors.has('roles') ? 'Oui. Comme sur le rush, c’est Sarah qui a trouvé le cas limite.' : anchors.has('binome') ? 'Oui. On avait déjà débogué ensemble sur le rush.' : 'Oui. Je viens de faire le test.']
    ],
    prompt: 'Comment réagis-tu ?',
    choices: [
      ['Je remercie Sarah pour le test dans le salon.', 'D’autres reprennent son exemple.', 'Citer son travail rend sa contribution visible.', 'credit'],
      ['Je demande à Thomas en privé pourquoi il a vérifié auprès de Lucas.', 'Thomas relit le fil.', 'Un échange privé peut faire ressortir la différence de traitement.', 'credit'],
      ['J’ajoute le cas à mes tests.', 'Ton test passe. Le fil avance.', 'Vérifier le code et reconnaître la contribution sont deux gestes distincts.']
    ]
  },
  {
    chapter: 1, time: 'Quelques jours plus tard', title: 'En privé', channel: 'Messages privés · Sarah',
    sensitive: 'Pression sexuelle',
    story: 'Thomas aide Sarah à préparer son évaluation.',
    messages: [
      ['Sarah', 'Il insiste pour réviser chez lui. J’ai dit que je préférais le campus.'],
      ['Sarah', 'Il m’a demandé une photo intime. Il dit qu’il pourrait arrêter de m’aider.']
    ],
    prompt: 'Que lui dis-tu ?',
    choices: [
      ['« Tu veux qu’on trouve un autre relais ? »', 'Sarah accepte.', 'L’aide ne donne aucun droit à une réponse intime. Le consentement doit être libre et peut être retiré.', 'limite'],
      ['« Tu veux que je t’aide à lui répondre ? »', 'Sarah préfère ne pas lui écrire.', 'Elle n’a pas à répéter sa limite. Insistance et pression peuvent relever du harcèlement sexuel.', 'limite'],
      ['« Tu crois qu’il a compris ta réponse ? »', 'Sarah rappelle qu’elle avait déjà proposé le campus.', 'Une hésitation ou un silence ne vaut pas accord. À lui de respecter sa limite.']
    ]
  },
  {
    chapter: 1, time: 'Le lendemain', title: 'Ce que Sarah voit', channel: 'Notes de Sarah · Changement de perspective',
    sensitive: 'Cyberviolences et santé',
    story: 'Maxime partage une capture des messages. Il dit que c’est pour rire. Tu lis les notes de Sarah.',
    messages: (anchors) => [
      ['Sarah', anchors.has('roles') ? 'Au rush, montrer mon test m’avait redonné confiance.' : 'Au rush, j’avais déjà l’impression de devoir prouver ma place.'],
      ['Sarah', 'Depuis la capture, je guette les notifications. Je dors mal, j’ai mal au ventre et je rate des corrections.']
    ],
    prompt: 'Quel effet remarques-tu ?',
    choices: [
      ['Les incidents s’accumulent.', 'Sarah hésite à revenir au cluster.', 'Anxiété, douleurs et isolement peuvent se renforcer. Les réactions varient.', 'cumul'],
      ['Le partage change la situation.', 'Sarah ignore qui a vu la capture.', 'La diffusion prolonge l’exposition. L’intention de faire rire n’efface pas l’impact.', 'diffusion']
    ]
  },
  {
    chapter: 2, time: 'Au cluster', title: 'Interrompre', channel: 'Discord · #cluster',
    story: 'Sarah arrive. Maxime reparle de la capture devant le groupe.',
    messages: [['Lucas', 'On fait quoi ?']],
    prompt: 'Comment interviens-tu ?',
    choices: [
      ['« On arrête les commentaires et les partages. »', 'Le fil se calme.', 'Intervenir directement peut poser une limite si tu peux agir en sécurité.', 'direct'],
      ['Je propose à Sarah de tester son code à une autre table.', 'Sarah s’éloigne du groupe.', 'Distraire peut interrompre la situation. Reviens vers elle ensuite.', 'distraire'],
      ['Je demande à une personne du staff de venir.', 'Elle interrompt la discussion.', 'Déléguer permet de mobiliser quelqu’un qui peut agir.', 'deleguer']
    ]
  },
  {
    chapter: 2, time: 'Le soir', title: 'Le prochain pas', channel: 'Messages privés · Sarah',
    story: 'Tu reprends contact avec Sarah.',
    messages: (anchors) => [
      ['Sarah', anchors.has('direct') ? 'Merci d’avoir dit stop.' : anchors.has('distraire') ? 'Changer de table m’a aidée.' : 'Quand le staff est arrivé, j’ai pu partir.'],
      ['Sarah', 'À qui je peux en parler ?']
    ],
    prompt: 'Que proposes-tu ?',
    choices: [
      ['Je lui propose de regarder ensemble comment contacter le Social Report.', 'Sarah peut choisir si elle veut être accompagnée.', 'Victime ou témoin à 42 Paris, contacte social-report@42paris.fr.', 'aide'],
      ['Je lui propose de l’écouter maintenant ou d’en reparler demain.', 'Sarah choisit demain.', 'Soutenir après coup laisse la personne fixer le rythme.', 'differer'],
      ['Je propose de noter les faits et les dates avec elle.', 'Sarah choisit les traces qu’elle veut garder.', 'Documente les faits sans rediffuser la capture. Conviens avec elle de l’usage des traces.', 'documenter']
    ]
  }
];
