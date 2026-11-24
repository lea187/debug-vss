// Chaque choix contient le texte du bouton, sa conséquence, un repère et,
// éventuellement, un point d’appui utilisé dans le bilan et les dialogues.
const scenes = [
  {
    chapter: 0, time: 'Semaine 1 · 09 h 12', title: 'Premier commit', channel: 'Discord · #projet-minishell',
    story: 'Ton équipe se répartit les tâches avant son premier rendu. Sarah vient de proposer une piste pour le parseur.',
    messages: [['Sarah', 'Si on sépare la lecture et la validation, les cas limites seront plus faciles à tester.'], ['Thomas', 'On laisse le parseur à Lucas ? Sarah, tu expliques bien, tu peux prendre la doc.'], ['Lucas', 'Je n’ai jamais écrit de parseur, mais je peux essayer.']],
    prompt: 'Comment réponds-tu dans le canal ?',
    choices: [
      ['« Sarah, tu peux détailler ta piste ? Ensuite on répartit selon les envies. »', 'Sarah poste un exemple. Lucas propose de travailler en binôme avec elle.', 'Demander les préférences et les compétences réelles évite que la répartition reproduise des rôles genrés.', 'roles'],
      ['« On tourne à mi-projet ? Comme ça, tout le monde aura fait un peu de code. »', 'L’équipe approuve. Pour le premier rendu, Sarah hérite quand même de la doc.', 'La rotation ouvre des possibilités. Son effet dépend de qui obtient les premières occasions de coder et de la place laissée aux préférences.'],
      ['« Sarah, je peux prendre la moitié de la doc. »', 'Sarah te remercie. Sa proposition sur le parseur reste sans réponse.', 'Partager la charge aide sur le moment. Revenir sur la proposition technique permet aussi de traiter la mise à l’écart.']
    ]
  },
  {
    chapter: 0, time: 'Semaine 1 · 18 h 04', title: 'La preuve en plus', channel: 'Discord · #revue-de-code',
    story: 'Après le rendu, Sarah repère un problème qui n’apparaît qu’avec une entrée vide.',
    messages: [['Sarah', 'Avec une entrée vide, on libère le même pointeur deux fois.'], ['Maxime', 'Tu es sûre ? Lucas, tu confirmes ?'], ['Lucas', 'Oui, c’est exactement ce que Sarah vient de dire.'], ['Maxime', 'Ok, je corrige.']],
    prompt: 'Que fais-tu de cet échange ?',
    choices: [
      ['« Merci Sarah pour le diagnostic. On ajoute ton cas au test ? »', 'Le cas de test porte le nom du scénario décrit par Sarah. Le canal reconnaît publiquement sa contribution.', 'Rendre le crédit à la personne qui a fait le travail aide à rétablir sa place dans l’échange.', 'credit'],
      ['Tu proposes en privé à Maxime de demander la même preuve à tout le monde.', 'Maxime relit le fil. Il dit qu’il essaiera de faire attention à la prochaine revue.', 'Un échange privé peut faciliter la discussion. Le groupe peut aussi avoir besoin d’un retour visible sur l’attribution du travail.', 'credit'],
      ['Tu ajoutes le test pour éviter que le problème revienne.', 'Le test passe. La différence de traitement se perd dans l’historique.', 'Résoudre le problème technique et reconnaître la contribution sont deux actions distinctes.']
    ]
  },
  {
    chapter: 0, time: 'Semaine 2 · 22 h 31', title: 'Le canal parallèle', channel: 'Messages privés · Lucas',
    story: 'Tu apprends qu’une session d’entraide a été organisée dans un petit canal privé. Sarah découvre la session après coup.',
    messages: [['Lucas', 'Thomas a ajouté les gens qu’il voyait souvent au cluster le soir.'], ['Lucas', 'Quand Sarah a demandé le lien, Maxime lui a dit de ne pas prendre ça personnellement.']],
    prompt: 'Comment réagis-tu à l’organisation du groupe ?',
    choices: [
      ['Tu proposes de publier le prochain créneau dans le canal commun.', 'La prochaine session apparaît dans le canal de promo. Deux autres personnes jusque-là absentes s’inscrivent.', 'Rendre l’information accessible à tous réduit l’exclusion, même si elle s’est installée sans décision explicite.', 'acces'],
      ['Tu partages les notes directement avec Sarah et lui proposes une session.', 'Sarah récupère les notes. Les invitations suivantes continuent à circuler entre les mêmes personnes.', 'Le soutien individuel est utile. Modifier la manière de diffuser les invitations agit sur ce qui se répète.'],
      ['Tu demandes à Lucas d’inviter Sarah au canal privé.', 'Lucas transmet le lien. D’autres étudiants découvrent toujours les sessions après coup.', 'Une invitation ciblée peut réparer une omission. Une règle commune évite que l’accès dépende des relations personnelles.']
    ]
  },
  {
    chapter: 1, time: 'Semaine 3 · 23 h 17', title: 'Les messages qui restent', channel: 'Messages privés · Sarah',
    sensitive: 'Pression sexuelle et rapport de pouvoir',
    story: 'Thomas, plus avancé dans la formation, connaît bien les personnes qui aident à préparer les soutenances. Sarah te décrit des messages qu’elle reçoit en privé.',
    messages: [['Sarah', 'Il me propose de revoir ma soutenance chez lui. J’ai dit que je préférais au campus.'], ['Sarah', 'Il est revenu à la charge plusieurs soirs. Hier, il m’a demandé une photo « un peu moins sage ». Il dit que ce serait dommage de perdre ses conseils.']],
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
    story: 'Une capture recadrée de l’échange privé apparaît dans le canal général. Plusieurs personnes réagissent avec des émojis. Un autre message reprend le prénom de Sarah.',
    messages: [['Maxime', 'J’ai masqué le reste, c’est juste pour la blague.'], ['Lucas', 'On peut encore reconnaître de qui tu parles.'], ['Maxime', 'Ce n’est qu’un screen.']],
    prompt: 'Que fais-tu pendant que le fil continue ?',
    choices: [
      ['Tu demandes à la modération de retirer la capture sans la republier.', 'La modération retire le message. Un membre indique en privé qu’une copie a déjà circulé.', 'Limiter la diffusion réduit l’exposition. Un signalement ciblé avec un lien ou un identifiant évite de relayer le contenu.', 'diffusion'],
      ['Tu réponds « Ne repartagez pas la capture » puis tu écris à Sarah en privé.', 'Une personne annule son repartage. Sarah voit aussi que quelqu’un a pris sa défense.', 'Une intervention publique peut ralentir le groupe. Elle peut s’accompagner d’un signalement et d’un contact discret.', 'diffusion'],
      ['Tu demandes à tes amis de ne pas réagir pour laisser le fil retomber.', 'Les réactions de ton groupe s’arrêtent. La capture reste visible et continue de circuler ailleurs.', 'Les réactions alimentent la visibilité et la banalisation. Leur disparition ne retire pas le message d’origine.']
    ]
  },
  {
    chapter: 1, time: 'Semaine 4 · 12 h 45', title: 'Mythe ou réalité · Le silence', channel: 'Messages privés · Lucas',
    story: 'Après un événement de promo, Lucas te raconte qu’une personne s’est figée quand on s’est rapproché d’elle. Tu ne connais pas son identité.',
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
    story: 'Tu découvres maintenant le point de vue de Sarah. Elle a mal dormi et son ventre se serre à l’idée de croiser Thomas. Elle surveille les notifications en permanence, puis coupe Discord. Elle manque une correction et commence à douter de sa place.',
    messages: (anchors) => [
      ['Sarah', anchors.has('roles') || anchors.has('credit') ? 'Quand quelqu’un a ramené l’équipe à mon idée, ça m’a fait du bien. Depuis, il y a aussi les messages et la capture.' : 'Ça a commencé par des petites choses. Je devais toujours expliquer un peu plus pour qu’on m’écoute.'],
      ['Sarah', 'J’ai souvent mal à la tête. Il y a des jours où je ne viens plus du tout. Mes amis me voient moins, et je prends du retard.']
    ],
    prompt: 'Quel lien retiens-tu entre les événements et son quotidien ?',
    choices: [
      ['Les épisodes s’accumulent et changent la façon dont Sarah étudie, dort et se sent en sécurité.', 'Une camarade lui propose de l’accompagner là où elle choisira de demander de l’aide.', 'Anxiété, hypervigilance, douleurs et isolement peuvent se renforcer. Les réactions varient selon les personnes et les situations.', 'cumul'],
      ['Les échéances et les mauvaises nuits semblent expliquer une partie du décrochage.', 'Sarah reconnaît la fatigue. Elle remarque aussi que les notifications ravivent l’appréhension, même les jours sans rendu.', 'La charge scolaire peut contribuer à l’épuisement. Pour comprendre ce qui se cumule, prends aussi au sérieux ce que la personne associe aux incidents.'],
      ['La capture paraît être l’événement central puisque le groupe entier l’a vue.', 'Sarah se rappelle combien d’efforts elle faisait déjà pour rester dans le groupe avant sa diffusion.', 'Un épisode visible peut s’ajouter à des semaines de mise à l’écart ou de pression que les témoins ont moins remarquées.']
    ]
  },
  {
    chapter: 1, time: 'Semaine 5 · 17 h 52', title: 'Mythe ou réalité · Le contexte', channel: 'Messages privés · Lucas',
    story: 'Tu reprends ton point de vue. Lucas revient sur la discussion, après avoir vu que Sarah a quitté plusieurs canaux.',
    messages: [['Lucas', 'Thomas dit qu’il draguait et qu’il ne voulait pas lui faire de mal. Ça change ce qu’on doit faire ?']],
    prompt: 'Qu’apporte sa version à la discussion ?',
    choices: [
      ['« Ça explique comment il décrit son geste. La pression et les effets sur Sarah restent à prendre en compte. »', 'Lucas propose de parler de faits précis et demande à Sarah comment elle voudrait être soutenue.', 'On peut repérer une pression et agir sur ses effets sans établir ce que l’auteur avait en tête.', 'impact'],
      ['« Parlons à Thomas en premier pour qu’il nous dise ce qu’il voulait. »', 'Lucas hésite à contacter Sarah tant qu’il n’a pas entendu Thomas.', 'L’intention est une information parmi d’autres. Le soutien peut commencer avant d’avoir entendu sa version.'],
      ['« On pourrait leur proposer de s’expliquer ensemble. »', 'Sarah répond en privé qu’elle a besoin de distance. La rencontre n’a pas lieu.', 'Une confrontation imposée peut renforcer la pression. Vérifie toujours les souhaits et la sécurité de la personne concernée.']
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
