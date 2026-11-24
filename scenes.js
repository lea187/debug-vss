// Chaque choix contient le texte du bouton, sa conséquence, un repère et,
// éventuellement, un point d’appui utilisé dans le bilan et les dialogues.
const scenes = [
  {
    chapter: 0, time: 'Semaine 1 · 09 h 12', title: 'Premiers tests Libft', channel: 'Discord · #libft',
    story: 'Chacun écrit sa propre Libft. Dans le salon de promo, Sarah propose un test pour comparer les résultats.',
    messages: [
      ['Sarah', 'Sur ft_strlcpy, vous testez aussi quand la taille vaut 0 ? La destination doit rester intacte.', '09:10'],
      ['Thomas', 'Lucas, tu peux vérifier le cas limite ? Sarah, tu peux mettre au propre la liste des tests, t’expliques bien.', '09:11'],
      ['Lucas', 'J’ai pas encore attaqué strlcpy. Tu peux montrer ton entrée, Sarah ?', '09:12']
    ],
    prompt: 'Qu’est-ce que tu écris dans le salon ?',
    choices: [
      ['« Sarah, tu peux poster ton cas ? Ensuite chacun prend les tests qu’il veut. »', 'Sarah partage son exemple. Lucas propose de le lancer sur sa propre Libft.', 'Donner suite à la proposition technique évite que Sarah soit cantonnée à la prise de notes.', 'roles'],
      ['« On change de rôle à la prochaine séance ? »', 'L’idée plaît. Pour cette séance, Sarah se retrouve quand même à rédiger les notes.', 'Faire tourner les rôles peut aider. Vérifie aussi qui a la possibilité de contribuer dès maintenant.'],
      ['« Je peux mettre au propre la moitié de la liste. »', 'Sarah te remercie. Le salon passe à une autre fonction sans revenir à son test.', 'Partager la charge aide. Revenir sur son idée permet aussi de traiter la mise à l’écart.']
    ]
  },
  {
    chapter: 0, time: 'Semaine 1 · 18 h 04', title: 'La preuve en plus', channel: 'Discord · #libft',
    story: 'Lucas partage le résultat d’un test de ft_memmove. Sarah repère un cas que le test ne couvre pas.',
    messages: [
      ['Sarah', 'Essaie de copier le début du buffer un octet plus loin, dans le même tableau. Les zones se chevauchent.', '18:01'],
      ['Thomas', 'T’es sûre que c’est un cas attendu ? Lucas, tu confirmes ?', '18:02'],
      ['Lucas', 'Oui, je viens de tester. C’est bien le cas que Sarah décrit.', '18:03'],
      ['Thomas', 'Ok, je le rajoute à ma liste.', '18:04']
    ],
    prompt: 'Que fais-tu de cet échange ?',
    choices: [
      ['« Merci Sarah pour le cas. On l’ajoute à la liste commune ? »', 'Sarah complète la liste avec le résultat attendu. Le salon reconnaît sa contribution.', 'Nommer la contribution de Sarah lui rend le crédit pour son travail.', 'credit'],
      ['Tu proposes en privé à Thomas de demander la même preuve à tout le monde.', 'Thomas relit le fil. Il dit qu’il essaiera de faire attention lors de la prochaine revue.', 'Un message privé peut faciliter la discussion. Le groupe peut aussi avoir besoin de voir à qui revient l’idée.', 'credit'],
      ['Tu ajoutes le cas à tes propres tests.', 'Ton test passe. Dans le fil, personne ne revient sur la différence de traitement.', 'Résoudre le problème technique et reconnaître la contribution sont deux actions distinctes.']
    ]
  },
  {
    chapter: 0, time: 'Semaine 2 · 22 h 31', title: 'Le canal parallèle', channel: 'Messages privés · Lucas',
    story: 'Une séance de préparation à l’évaluation Libft a circulé dans un salon privé. Sarah l’apprend après coup.',
    messages: [
      ['Lucas', 'Thomas avait mis le créneau dans le petit salon du cluster. On a surtout testé les erreurs d’allocation dans ft_split.', '22:30'],
      ['Lucas', 'Sarah a demandé où trouver les prochains créneaux. Maxime lui a répondu que c’était juste un truc entre potes.', '22:31']
    ],
    prompt: 'Comment réagis-tu à l’organisation du groupe ?',
    choices: [
      ['Tu proposes de publier le prochain créneau dans #libft.', 'La prochaine séance apparaît dans le salon commun. Deux autres personnes jusque-là absentes s’inscrivent.', 'Rendre l’information accessible réduit l’exclusion, même si elle s’est installée sans décision explicite.', 'acces'],
      ['Tu partages tes notes avec Sarah et tu lui proposes de tester ensemble.', 'Sarah récupère les notes. Les invitations suivantes circulent toujours entre les mêmes personnes.', 'Le soutien individuel aide. Modifier la diffusion des invitations agit sur ce qui se répète.'],
      ['Tu demandes à Lucas d’inviter Sarah au salon privé.', 'Sarah reçoit le lien. D’autres étudiants découvrent toujours les séances après coup.', 'Une invitation ciblée peut réparer une omission. Un salon commun réduit la dépendance aux relations personnelles.']
    ]
  },
  {
    chapter: 1, time: 'Semaine 3 · 23 h 17', title: 'Les messages qui restent', channel: 'Messages privés · Sarah',
    sensitive: 'Pression sexuelle et rapport de pouvoir',
    story: 'Thomas, plus avancé dans la formation, aide Sarah à préparer son évaluation. Elle te parle de ses messages privés.',
    messages: [['Sarah', 'Il voulait qu’on révise chez lui. J’ai proposé le campus.'], ['Sarah', 'Il insiste depuis plusieurs soirs. Hier, il a demandé une photo « moins sage » et m’a dit que je risquais de perdre son aide.']],
    prompt: 'Que lui dis-tu ?',
    choices: [
      ['« Tu as déjà posé une limite. Tu veux qu’on cherche un autre soutien pour la soutenance ? »', 'Sarah accepte que tu l’aides à trouver un autre binôme de préparation.', 'Des sollicitations sexuelles répétées et une pression liée à l’aide peuvent relever du harcèlement sexuel. Trouver un autre relais peut réduire la dépendance à Thomas.', 'limite'],
      ['« Tu veux qu’on prépare ensemble un message pour lui dire d’arrêter ? »', 'Sarah te dit qu’elle ne veut pas lui écrire. Tu peux lui proposer ton aide autrement.', 'Formuler une réponse peut aider si la personne le souhaite. Elle n’a aucune obligation de répéter sa limite ni de confronter son interlocuteur.', 'limite'],
      ['« Il croit peut-être que tu plaisantes. Tu veux lui expliquer ce que tu voulais dire ? »', 'Sarah te rappelle qu’elle avait déjà demandé un rendez-vous au campus.', 'L’intention supposée de Thomas ne change ni la limite exprimée ni la pression ressentie.']
    ]
  },
  {
    chapter: 1, time: 'Semaine 4 · 00 h 08', title: 'Capture d’écran', channel: 'Discord · #off-topic',
    sensitive: 'Diffusion de messages privés et moqueries collectives',
    story: 'Une capture de l’échange privé circule. Les réactions s’enchaînent et quelqu’un écrit le prénom de Sarah.',
    messages: [['Maxime', 'J’ai masqué le reste, c’est juste pour la blague.'], ['Lucas', 'On peut encore reconnaître de qui tu parles.'], ['Maxime', 'Ce n’est qu’un screen.']],
    prompt: 'Que fais-tu pendant que le fil continue ?',
    choices: [
      ['Tu demandes à la modération de retirer la capture sans la republier.', 'La modération retire le message. Un membre indique en privé qu’une copie a déjà circulé.', 'Limiter la diffusion réduit l’exposition. Un signalement ciblé avec un lien ou un identifiant évite de relayer le contenu.', 'diffusion'],
      ['Tu réponds « Ne repartagez pas la capture » puis tu écris à Sarah en privé.', 'Une personne annule son repartage. Sarah voit aussi que quelqu’un a pris sa défense.', 'Une intervention publique peut ralentir le groupe. Elle peut s’accompagner d’un signalement et d’un contact discret.', 'diffusion'],
      ['Tu demandes à tes amis de ne pas réagir pour laisser le fil retomber.', 'Les réactions de ton groupe s’arrêtent. La capture reste visible et continue de circuler ailleurs.', 'L’intention de faire rire n’efface pas l’exposition de Sarah. Retirer les réactions laisse le message d’origine visible.']
    ]
  },
  {
    chapter: 1, time: 'Semaine 4 · 12 h 45', title: 'Mythe ou réalité · Le silence', channel: 'Messages privés · Lucas',
    story: 'Après une soirée de promo, Lucas te dit qu’une personne s’est figée quand quelqu’un a essayé de l’embrasser.',
    messages: [['Lucas', 'Elle n’a rien dit. Est-ce qu’on peut se dire qu’elle était d’accord ?']],
    prompt: 'Comment réponds-tu à Lucas ?',
    choices: [
      ['« Le silence ne donne aucun accord. Si quelqu’un se fige, on s’arrête. »', 'Lucas se demande comment vérifier qu’une personne souhaite continuer, sans faire pression.', 'Le consentement se vérifie librement, pour la situation présente. Il peut être retiré à tout moment. Le silence ou l’immobilité ne valent pas accord.', 'silence'],
      ['« Il faudrait lui demander après comment elle l’a vécu. »', 'Lucas veut savoir ce qu’il aurait pu faire dès qu’il a remarqué qu’elle se figeait.', 'Écouter après peut aider. Sur le moment, s’arrêter évite de poursuivre sans accord.'],
      ['« Ça dépend surtout de ce qu’ils avaient accepté avant. »', 'Lucas te demande si on peut changer d’avis une fois la soirée commencée.', 'Un accord passé ne s’étend pas automatiquement à une autre situation et peut être retiré.']
    ]
  },
  {
    chapter: 1, time: 'Semaine 5 · 07 h 06', title: 'Le matin de Sarah', channel: 'Notes de Sarah · Changement de perspective',
    sensitive: 'Effets du harcèlement sur la santé et les études',
    story: 'Tu lis les notes de Sarah. Elle dort mal, a le ventre noué et guette chaque notification. Puis elle coupe Discord.',
    messages: (anchors) => [
      ['Sarah', anchors.has('roles') || anchors.has('credit') ? 'Ça m’a fait du bien quand quelqu’un a pris mon test au sérieux. Depuis, il y a eu les messages et la capture.' : 'Ça a commencé sur #libft. Je devais toujours me justifier un peu plus.'],
      ['Sarah', 'J’ai souvent mal à la tête. Je vois moins mes amis, je rate des corrections. Je commence à douter de ma place ici.']
    ],
    prompt: 'Quel lien retiens-tu entre les événements et son quotidien ?',
    choices: [
      ['Les épisodes s’accumulent et changent la façon dont Sarah étudie, dort et se sent en sécurité.', 'Une camarade lui propose de l’accompagner là où elle choisira de demander de l’aide.', 'Anxiété, hypervigilance, douleurs et isolement peuvent se renforcer. Les réactions varient selon les personnes et les situations.', 'cumul'],
      ['Les échéances et les mauvaises nuits semblent expliquer une partie du décrochage.', 'Sarah reconnaît la fatigue. Elle remarque aussi que les notifications ravivent l’appréhension, même les jours sans rendu.', 'La charge scolaire peut contribuer à l’épuisement. Pour comprendre ce qui se cumule, prends aussi au sérieux ce que la personne associe aux incidents.'],
      ['La capture paraît être l’événement central puisque le groupe entier l’a vue.', 'Sarah se rappelle combien d’efforts elle faisait déjà pour rester dans le groupe avant sa diffusion.', 'Un épisode visible peut s’ajouter à des semaines de mise à l’écart ou de pression que les témoins ont moins remarquées.']
    ]
  },
  {
    chapter: 2, time: 'Semaine 6 · 14 h 23', title: 'Interrompre la boucle', channel: 'Discord · #cluster',
    story: 'De retour au cluster, Sarah approche de votre table. Maxime recommence à commenter la capture devant plusieurs étudiants.',
    messages: (anchors) => [
      ['Maxime', anchors.has('diffusion') ? 'Vous avez freiné les partages, mais tout le monde sait de quoi je parle.' : 'La capture tourne encore. Vous avez vu ?'],
      ['Lucas', 'Elle arrive. On fait quoi ?']
    ],
    prompt: 'Tu peux intervenir de plusieurs façons. Que fais-tu ici ?',
    choices: [
      ['« On arrête les commentaires et les partages. »', 'Le groupe s’interrompt. Maxime proteste brièvement puis change de sujet.', 'Intervenir directement peut poser une limite. Évalue d’abord le contexte, le risque d’escalade et ce que tu peux faire en sécurité.', 'direct'],
      ['Tu proposes à Sarah et au groupe de t’aider sur un test à une autre table.', 'La conversation retombe. Sarah peut rejoindre la nouvelle table à son rythme.', 'Distraire peut casser la dynamique sans exposer Sarah. Un suivi ou un relais peut aider si les propos reprennent.', 'distraire'],
      ['Tu demandes discrètement à une personne encadrante présente de venir interrompre la discussion.', 'La personne intervient et propose un échange à l’écart à celles et ceux qui le souhaitent.', 'Déléguer permet de mobiliser quelqu’un en mesure d’agir. Indique le lieu, les faits observés et l’aide concrète attendue.', 'deleguer']
    ]
  },
  {
    chapter: 2, time: 'Semaine 6 · 18 h 05', title: 'Reprendre contact', channel: 'Messages privés · Sarah',
    story: 'La discussion de l’après-midi s’est arrêtée. Tu as un moment pour prendre des nouvelles de Sarah.',
    messages: (anchors) => [
      ['Sarah', anchors.has('direct') ? 'J’ai entendu ta réponse. J’avais surtout besoin que ça s’arrête.' : anchors.has('distraire') ? 'Changer de table m’a laissé souffler un peu.' : anchors.has('deleguer') ? 'J’ai pu partir quand la personne encadrante est arrivée.' : 'Je suis rentrée tôt. J’avais besoin de calme.'],
      ['Sarah', 'Je ne veux pas que tout le monde sache que je t’en parle.']
    ],
    prompt: 'Quel soutien proposes-tu maintenant ?',
    choices: [
      ['« Je te crois. Tu veux que je t’écoute, que je t’accompagne quelque part ou qu’on en reparle plus tard ? »', 'Sarah demande que tu prennes de ses nouvelles demain. Tu conviens avec elle de ce qu’elle souhaite garder privé.', 'Différer consiste à apporter du soutien après coup. Écouter, proposer des options et respecter le rythme de la personne lui laisse la maîtrise.', 'differer'],
      ['« Je peux transmettre ton récit à l’équipe pédagogique dès ce soir. Est-ce que tu veux qu’on regarde ensemble ce qui serait partagé ? »', 'Sarah souhaite d’abord connaître le rôle de l’équipe et les règles de confidentialité.', 'Expliquer à qui une information ira et ce qu’elle déclenchera permet un choix éclairé. En cas de danger immédiat, la priorité est la sécurité.', 'differer'],
      ['« Je vais demander à nos amis de passer te voir. »', 'Sarah préfère que tu n’en parles pas au groupe pour l’instant.', 'Même une aide bien intentionnée peut faire perdre le contrôle de l’information. Demande qui la personne souhaite associer.']
    ]
  },
  {
    chapter: 2, time: 'Semaine 7 · 10 h 38', title: 'Ce qu’on garde', channel: 'Messages privés · Sarah',
    sensitive: 'Conservation de traces de cyberviolences',
    story: 'Sarah envisage de demander de l’aide, mais ne veut pas décider aujourd’hui si elle fera un signalement. Tu as vu passer des propos dans le canal.',
    messages: [['Sarah', 'Si le message original disparaît, est-ce que tu peux m’aider à garder une trace sans que ça revienne dans le groupe ?']],
    prompt: 'Quelle forme peut prendre ton aide ?',
    choices: [
      ['Tu proposes de noter ce que tu as vu, avec dates et canaux, et vous convenez ensemble de ce qui sera conservé et partagé.', 'Sarah choisit quelles informations garder et à qui les remettre si elle décide de les utiliser.', 'Documenter consiste à conserver des faits précis de façon sûre, avec l’accord de la personne pour l’usage des traces, sans rediffuser de contenu intime.', 'documenter'],
      ['Tu proposes de conserver uniquement le lien vers le message.', 'Sarah préfère éviter une copie de la capture. Vous notez aussi la date et le canal au cas où le lien cesserait de fonctionner.', 'Un lien limite la duplication. Un relevé des faits observés peut compléter une trace fragile.', 'documenter'],
      ['Tu demandes à des camarades de regrouper leurs captures dans un dossier de promo.', 'Sarah te demande de ne pas lancer cette collecte. Elle craint que les fichiers circulent.', 'Une collecte partagée peut exposer de nouveau la personne. Limite l’accès et conviens avec elle de ce qui est utile.']
    ]
  },
  {
    chapter: 2, time: 'Semaine 7 · 16 h 20', title: 'Au-delà du canal', channel: 'Discord · #vie-de-promo',
    story: 'Sarah veut connaître les options disponibles sans engager de démarche tout de suite. La promo réfléchit aussi à ses règles de modération.',
    messages: [['Sarah', 'J’aimerais comprendre qui peut m’écouter et qui peut recevoir un signalement.'], ['Lucas', 'Et on peut poser des règles contre les repartages, même sans parler publiquement de ce qui s’est passé.']],
    prompt: 'Quelle démarche proposes-tu ?',
    choices: [
      ['Tu proposes de vérifier le contact officiel du campus, d’expliquer les options externes et de discuter de règles communes sans citer Sarah.', 'Sarah garde le choix de la démarche. La promo prévoit un circuit de modération et des règles visibles.', 'Accompagner, signaler et prévenir répondent à des besoins différents. Vérifie le dispositif de ton campus et présente les options sans conditionner le soutien à un signalement.', 'aide'],
      ['Tu proposes un rendez-vous avec un service de santé étudiante ou une association pour parler des options.', 'Sarah retient l’idée et demande qui pourrait l’accompagner si elle choisit un rendez-vous.', 'Le soutien peut commencer par des soins, une écoute ou un conseil. Un service ou une association peut expliquer les démarches possibles.', 'aide'],
      ['Tu proposes de publier d’abord de nouvelles règles de modération.', 'La promo se saisit des règles. Sarah te demande à nouveau où elle peut obtenir de l’aide pour elle-même.', 'La prévention collective complète l’accompagnement individuel. Proposer un relais concret aide la personne à connaître ses options.']
    ]
  }
];
