import type { Locale } from '../types';

/** Copy for the book card, the retest reminder signup and the privacy page. */
export interface EngagementCopy {
  book: {
    title: string;
    text: string;
    paperback: string;
    kindle: string;
    paid: string;
  };
  reminder: {
    title: string;
    text: string;
    emailLabel: string;
    emailPlaceholder: string;
    /** Wrap the privacy link text in {link}…{/link}. */
    consent: string;
    button: string;
    sending: string;
    success: string;
    invalidEmail: string;
    consentRequired: string;
  };
  privacy: {
    title: string;
    description: string;
    updated: string;
    sections: { title: string; text: string }[];
    footerLink: string;
  };
}

const en: EngagementCopy = {
  book: {
    title: 'Read the method in full',
    text: 'James Copeland’s book explains the reasoning behind every session. This calculator does the arithmetic.',
    paperback: 'Paperback on Amazon',
    kindle: 'Kindle edition',
    paid: 'Paid link',
  },
  reminder: {
    title: 'Get a reminder to retest in 6 weeks',
    text: 'Paces only improve if you update them. We will email you in 6 weeks with a link back to your plan, plus occasional training notes. Unsubscribe in one click.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    consent:
      'I agree to receive the reminder and occasional emails from Norwegian Singles. See the {link}privacy policy{/link}.',
    button: 'Remind me',
    sending: 'Sending…',
    success: 'Almost done: check your inbox and confirm your email.',
    invalidEmail: 'Enter a valid email address.',
    consentRequired: 'Tick the box to agree to the emails.',
  },
  privacy: {
    title: 'Privacy policy',
    description:
      'What Norwegian Singles collects, why, and how to remove it. No tracking cookies and no ads.',
    updated: 'Last updated: 5 November 2026',
    sections: [
      {
        title: 'Who runs this site',
        text: 'Norwegian Singles is an independent, free training calculator built by Jon Ramos (jonramos.dev). It is not affiliated with James Copeland, Marius Bakken or any brand mentioned.',
      },
      {
        title: 'What stays in your browser',
        text: 'Your race result, plan settings and language are saved in your browser’s local storage so your plan is there when you come back. They are never sent to us. Clear your browser data to remove them.',
      },
      {
        title: 'No tracking cookies',
        text: 'The site sets no cookies and runs no third-party analytics or advertising scripts.',
      },
      {
        title: 'Server logs',
        text: 'Like any website, our server records standard request logs (such as the page requested and the time). When you click a shop or support link, we log which link was clicked, on which page and in which language, without cookies or personal identifiers, so we know which recommendations are useful.',
      },
      {
        title: 'Retest reminder emails',
        text: 'If you sign up for the reminder, we store your email address, your language, the link to your plan and the reminder date with our email provider, only to send you the reminder and occasional training emails. Signing up requires confirming your address. Every email has an unsubscribe link, and unsubscribing removes you from the list. You can also ask us to delete your data at any time.',
      },
      {
        title: 'Affiliate links',
        text: 'Some links go to Amazon and are affiliate links: if you buy, we may earn a commission at no extra cost to you. Amazon handles anything that happens on its site under its own privacy policy.',
      },
      {
        title: 'Your rights',
        text: 'Under the GDPR you can ask to access, correct or delete your data, or object to its use. Contact us through jonramos.dev and we will reply within 30 days.',
      },
    ],
    footerLink: 'Privacy',
  },
};

const es: EngagementCopy = {
  book: {
    title: 'Lee el método completo',
    text: 'El libro de James Copeland explica el razonamiento detrás de cada sesión. Esta calculadora hace la aritmética.',
    paperback: 'Tapa blanda en Amazon',
    kindle: 'Edición Kindle',
    paid: 'Enlace remunerado',
  },
  reminder: {
    title: 'Recibe un recordatorio para repetir el test en 6 semanas',
    text: 'Los ritmos solo mejoran si los actualizas. Te escribiremos en 6 semanas con un enlace a tu plan, además de notas de entrenamiento ocasionales. Cancela la suscripción con un clic.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@ejemplo.com',
    consent:
      'Acepto recibir el recordatorio y correos ocasionales de Norwegian Singles. Consulta la {link}política de privacidad{/link}.',
    button: 'Recuérdamelo',
    sending: 'Enviando…',
    success:
      'Casi listo: revisa tu bandeja de entrada y confirma tu correo electrónico.',
    invalidEmail: 'Introduce una dirección de correo electrónico válida.',
    consentRequired: 'Marca la casilla para aceptar los correos.',
  },
  privacy: {
    title: 'Política de privacidad',
    description:
      'Qué datos recoge Norwegian Singles, por qué y cómo eliminarlos. Sin cookies de seguimiento y sin anuncios.',
    updated: 'Última actualización: 5 de noviembre de 2026',
    sections: [
      {
        title: 'Quién gestiona este sitio',
        text: 'Norwegian Singles es una calculadora de entrenamiento gratuita e independiente creada por Jon Ramos (jonramos.dev). No está afiliada a James Copeland, Marius Bakken ni a ninguna marca mencionada.',
      },
      {
        title: 'Lo que se queda en tu navegador',
        text: 'Tu resultado de carrera, los ajustes del plan y el idioma se guardan en el almacenamiento local de tu navegador para que tu plan esté ahí cuando vuelvas. Nunca se nos envían. Borra los datos de tu navegador para eliminarlos.',
      },
      {
        title: 'Sin cookies de seguimiento',
        text: 'El sitio no instala cookies ni ejecuta scripts de analítica o publicidad de terceros.',
      },
      {
        title: 'Registros del servidor',
        text: 'Como cualquier sitio web, nuestro servidor guarda registros estándar de las solicitudes (como la página solicitada y la hora). Cuando haces clic en un enlace de tienda o de apoyo, registramos qué enlace se pulsó, en qué página y en qué idioma, sin cookies ni identificadores personales, para saber qué recomendaciones son útiles.',
      },
      {
        title: 'Correos del recordatorio de repetición del test',
        text: 'Si te suscribes al recordatorio, guardamos tu dirección de correo electrónico, tu idioma, el enlace a tu plan y la fecha del recordatorio en nuestro proveedor de correo, únicamente para enviarte el recordatorio y correos ocasionales de entrenamiento. Para suscribirte hay que confirmar tu dirección. Todos los correos incluyen un enlace para cancelar la suscripción, y al cancelarla te eliminamos de la lista. También puedes pedirnos en cualquier momento que borremos tus datos.',
      },
      {
        title: 'Enlaces de afiliación',
        text: 'Algunos enlaces llevan a Amazon y son enlaces de afiliación: si compras, podemos recibir una comisión sin coste adicional para ti. Amazon gestiona lo que ocurra en su sitio conforme a su propia política de privacidad.',
      },
      {
        title: 'Tus derechos',
        text: 'Según el RGPD, puedes solicitar el acceso, la rectificación o la supresión de tus datos, o oponerte a su uso. Contáctanos a través de jonramos.dev y te responderemos en un plazo de 30 días.',
      },
    ],
    footerLink: 'Privacidad',
  },
};

const ko: EngagementCopy = {
  book: {
    title: '메서드 전체를 읽어 보세요',
    text: 'James Copeland의 책은 모든 세션의 근거를 설명합니다. 이 계산기는 계산을 대신해 줍니다.',
    paperback: 'Amazon 종이책',
    kindle: 'Kindle 전자책',
    paid: '유료 링크',
  },
  reminder: {
    title: '6주 후 재측정 알림 받기',
    text: '페이스는 갱신해야만 좋아집니다. 6주 후에 내 플랜으로 돌아오는 링크와 가끔 보내는 훈련 노트를 이메일로 보내 드립니다. 클릭 한 번으로 수신을 거부할 수 있습니다.',
    emailLabel: '이메일',
    emailPlaceholder: 'you@example.com',
    consent:
      '알림 및 Norwegian Singles의 가끔 발송되는 이메일을 받는 데 동의합니다. {link}개인정보 처리방침{/link}을 확인하세요.',
    button: '알림 받기',
    sending: '전송 중…',
    success: '거의 끝났어요. 받은편지함을 확인하고 이메일을 인증해 주세요.',
    invalidEmail: '올바른 이메일 주소를 입력해 주세요.',
    consentRequired: '이메일 수신에 동의하려면 체크박스를 선택해 주세요.',
  },
  privacy: {
    title: '개인정보 처리방침',
    description:
      'Norwegian Singles가 수집하는 정보, 수집 이유, 삭제 방법을 안내합니다. 추적 쿠키와 광고는 없습니다.',
    updated: '최종 업데이트: 2026년 11월 5일',
    sections: [
      {
        title: '사이트 운영자',
        text: 'Norwegian Singles는 Jon Ramos(jonramos.dev)가 만든 독립적인 무료 훈련 계산기입니다. James Copeland, Marius Bakken 또는 언급된 어떤 브랜드와도 제휴 관계가 없습니다.',
      },
      {
        title: '브라우저에만 저장되는 정보',
        text: '대회 기록, 플랜 설정, 언어는 다시 방문했을 때 플랜이 그대로 있도록 브라우저의 로컬 저장소에 저장됩니다. 이 정보는 저희에게 전송되지 않습니다. 삭제하려면 브라우저 데이터를 지우세요.',
      },
      {
        title: '추적 쿠키 없음',
        text: '이 사이트는 쿠키를 설정하지 않으며, 제3자 분석 또는 광고 스크립트를 실행하지 않습니다.',
      },
      {
        title: '서버 로그',
        text: '다른 웹사이트와 마찬가지로 저희 서버는 요청한 페이지와 시간 같은 표준 요청 로그를 기록합니다. 쇼핑 링크나 후원 링크를 클릭하면 쿠키나 개인 식별자 없이 어떤 링크를 어느 페이지에서 어떤 언어로 클릭했는지를 기록하여, 어떤 추천이 유용한지 파악합니다.',
      },
      {
        title: '재측정 알림 이메일',
        text: '알림을 신청하면 이메일 주소, 언어, 내 플랜 링크, 알림 날짜를 이메일 서비스 제공업체에 저장하며, 이는 알림과 가끔 보내는 훈련 이메일을 보내는 용도로만 사용됩니다. 신청하려면 이메일 주소를 인증해야 합니다. 모든 이메일에는 수신 거부 링크가 있으며, 수신을 거부하면 목록에서 삭제됩니다. 언제든지 데이터 삭제를 요청할 수도 있습니다.',
      },
      {
        title: '제휴 링크',
        text: '일부 링크는 Amazon으로 연결되는 제휴 링크입니다. 구매하시면 추가 비용 없이 저희가 수수료를 받을 수 있습니다. Amazon 사이트에서 일어나는 일은 Amazon의 자체 개인정보 처리방침에 따라 처리됩니다.',
      },
      {
        title: '이용자의 권리',
        text: 'GDPR에 따라 본인의 데이터에 대한 열람, 정정, 삭제를 요청하거나 데이터 사용에 반대할 수 있습니다. jonramos.dev를 통해 문의해 주시면 30일 이내에 답변드립니다.',
      },
    ],
    footerLink: '개인정보',
  },
};

const de: EngagementCopy = {
  book: {
    title: 'Lies die ganze Methode',
    text: 'James Copelands Buch erklärt die Überlegungen hinter jeder Einheit. Dieser Rechner übernimmt das Rechnen.',
    paperback: 'Taschenbuch bei Amazon',
    kindle: 'Kindle-Ausgabe',
    paid: 'Bezahlter Link',
  },
  reminder: {
    title: 'Erinnerung zum erneuten Test in 6 Wochen erhalten',
    text: 'Paces verbessern sich nur, wenn du sie aktualisierst. Wir schreiben dir in 6 Wochen eine E-Mail mit einem Link zurück zu deinem Plan, dazu gelegentlich Trainingshinweise. Abmeldung mit einem Klick.',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'du@beispiel.de',
    consent:
      'Ich bin damit einverstanden, die Erinnerung und gelegentliche E-Mails von Norwegian Singles zu erhalten. Siehe die {link}Datenschutzerklärung{/link}.',
    button: 'Erinnere mich',
    sending: 'Wird gesendet…',
    success:
      'Fast geschafft: Sieh in deinem Posteingang nach und bestätige deine E-Mail-Adresse.',
    invalidEmail: 'Gib eine gültige E-Mail-Adresse ein.',
    consentRequired: 'Setze das Häkchen, um den E-Mails zuzustimmen.',
  },
  privacy: {
    title: 'Datenschutzerklärung',
    description:
      'Was Norwegian Singles erfasst, warum und wie du es entfernen kannst. Keine Tracking-Cookies und keine Werbung.',
    updated: 'Zuletzt aktualisiert: 5. November 2026',
    sections: [
      {
        title: 'Wer diese Website betreibt',
        text: 'Norwegian Singles ist ein unabhängiger, kostenloser Trainingsrechner von Jon Ramos (jonramos.dev). Er steht in keiner Verbindung zu James Copeland, Marius Bakken oder einer anderen erwähnten Marke.',
      },
      {
        title: 'Was in deinem Browser bleibt',
        text: 'Dein Wettkampfergebnis, die Planeinstellungen und die Sprache werden im lokalen Speicher deines Browsers abgelegt, damit dein Plan beim nächsten Besuch noch da ist. Sie werden nie an uns gesendet. Lösche deine Browserdaten, um sie zu entfernen.',
      },
      {
        title: 'Keine Tracking-Cookies',
        text: 'Die Website setzt keine Cookies und führt keine Analyse- oder Werbeskripte von Drittanbietern aus.',
      },
      {
        title: 'Server-Logs',
        text: 'Wie jede Website protokolliert unser Server Standard-Anfragen (etwa die aufgerufene Seite und die Uhrzeit). Wenn du auf einen Shop- oder Unterstützungslink klickst, protokollieren wir, welcher Link auf welcher Seite und in welcher Sprache angeklickt wurde, ohne Cookies und ohne persönliche Kennungen, damit wir wissen, welche Empfehlungen nützlich sind.',
      },
      {
        title: 'E-Mails zur Erinnerung an den erneuten Test',
        text: 'Wenn du dich für die Erinnerung anmeldest, speichern wir deine E-Mail-Adresse, deine Sprache, den Link zu deinem Plan und das Erinnerungsdatum bei unserem E-Mail-Anbieter, ausschließlich um dir die Erinnerung und gelegentliche Trainings-E-Mails zu senden. Für die Anmeldung muss deine Adresse bestätigt werden. Jede E-Mail enthält einen Abmeldelink, und mit der Abmeldung wirst du aus der Liste entfernt. Du kannst uns außerdem jederzeit bitten, deine Daten zu löschen.',
      },
      {
        title: 'Affiliate-Links',
        text: 'Einige Links führen zu Amazon und sind Affiliate-Links: Wenn du etwas kaufst, erhalten wir möglicherweise eine Provision, ohne dass dir Mehrkosten entstehen. Für alles, was auf der Amazon-Website geschieht, gilt die eigene Datenschutzerklärung von Amazon.',
      },
      {
        title: 'Deine Rechte',
        text: 'Nach der DSGVO kannst du Auskunft über deine Daten verlangen, sie berichtigen oder löschen lassen oder ihrer Verwendung widersprechen. Kontaktiere uns über jonramos.dev, wir antworten innerhalb von 30 Tagen.',
      },
    ],
    footerLink: 'Datenschutz',
  },
};

const fr: EngagementCopy = {
  book: {
    title: 'Lis la méthode en entier',
    text: 'Le livre de James Copeland explique le raisonnement derrière chaque séance. Ce calculateur s’occupe de l’arithmétique.',
    paperback: 'Livre broché sur Amazon',
    kindle: 'Édition Kindle',
    paid: 'Lien rémunéré',
  },
  reminder: {
    title: 'Reçois un rappel pour refaire un test dans 6 semaines',
    text: 'Les allures ne progressent que si tu les mets à jour. Nous t’enverrons un e-mail dans 6 semaines avec un lien vers ton plan, ainsi que de temps en temps des conseils d’entraînement. Désabonnement en un clic.',
    emailLabel: 'E-mail',
    emailPlaceholder: 'toi@exemple.fr',
    consent:
      'J’accepte de recevoir le rappel et des e-mails occasionnels de Norwegian Singles. Consulte la {link}politique de confidentialité{/link}.',
    button: 'Rappelle-moi',
    sending: 'Envoi en cours…',
    success:
      'Presque terminé : vérifie ta boîte de réception et confirme ton adresse e-mail.',
    invalidEmail: 'Saisis une adresse e-mail valide.',
    consentRequired: 'Coche la case pour accepter de recevoir les e-mails.',
  },
  privacy: {
    title: 'Politique de confidentialité',
    description:
      'Ce que Norwegian Singles collecte, pourquoi, et comment le supprimer. Pas de cookies de suivi et pas de publicité.',
    updated: 'Dernière mise à jour : 5 novembre 2026',
    sections: [
      {
        title: 'Qui gère ce site',
        text: 'Norwegian Singles est un calculateur d’entraînement gratuit et indépendant, créé par Jon Ramos (jonramos.dev). Il n’est affilié ni à James Copeland, ni à Marius Bakken, ni à aucune marque mentionnée.',
      },
      {
        title: 'Ce qui reste dans ton navigateur',
        text: 'Ton résultat de course, les paramètres de ton plan et ta langue sont enregistrés dans le stockage local de ton navigateur afin que ton plan soit là à ton retour. Ils ne nous sont jamais envoyés. Efface les données de ton navigateur pour les supprimer.',
      },
      {
        title: 'Pas de cookies de suivi',
        text: 'Le site ne dépose aucun cookie et n’exécute aucun script d’analyse ou de publicité tiers.',
      },
      {
        title: 'Journaux du serveur',
        text: 'Comme tout site web, notre serveur enregistre des journaux de requêtes standard (comme la page demandée et l’heure). Quand tu cliques sur un lien vers une boutique ou de soutien, nous enregistrons quel lien a été cliqué, sur quelle page et dans quelle langue, sans cookies ni identifiants personnels, afin de savoir quelles recommandations sont utiles.',
      },
      {
        title: 'E-mails de rappel pour refaire un test',
        text: 'Si tu t’inscris au rappel, nous conservons ton adresse e-mail, ta langue, le lien vers ton plan et la date du rappel chez notre prestataire d’e-mailing, uniquement pour t’envoyer le rappel et des e-mails d’entraînement occasionnels. L’inscription nécessite de confirmer ton adresse. Chaque e-mail contient un lien de désabonnement, et te désabonner te retire de la liste. Tu peux aussi nous demander à tout moment de supprimer tes données.',
      },
      {
        title: 'Liens d’affiliation',
        text: 'Certains liens mènent vers Amazon et sont des liens d’affiliation : si tu achètes, nous pouvons percevoir une commission sans frais supplémentaires pour toi. Amazon gère tout ce qui se passe sur son site selon sa propre politique de confidentialité.',
      },
      {
        title: 'Tes droits',
        text: 'En vertu du RGPD, tu peux demander l’accès à tes données, leur rectification ou leur suppression, ou t’opposer à leur utilisation. Contacte-nous via jonramos.dev et nous te répondrons sous 30 jours.',
      },
    ],
    footerLink: 'Confidentialité',
  },
};

const it: EngagementCopy = {
  book: {
    title: 'Leggi il metodo per intero',
    text: 'Il libro di James Copeland spiega il ragionamento dietro ogni sessione. Questo calcolatore fa i conti.',
    paperback: 'Copertina flessibile su Amazon',
    kindle: 'Edizione Kindle',
    paid: 'Link pubblicitario',
  },
  reminder: {
    title: 'Ricevi un promemoria per rifare il test tra 6 settimane',
    text: 'I ritmi migliorano solo se li aggiorni. Ti scriveremo tra 6 settimane con un link al tuo piano, più qualche nota di allenamento ogni tanto. Annulli l’iscrizione con un clic.',
    emailLabel: 'E-mail',
    emailPlaceholder: 'tu@esempio.it',
    consent:
      'Accetto di ricevere il promemoria e qualche e-mail occasionale da Norwegian Singles. Consulta l’{link}informativa sulla privacy{/link}.',
    button: 'Ricordamelo',
    sending: 'Invio in corso…',
    success:
      'Quasi fatto: controlla la posta in arrivo e conferma il tuo indirizzo e-mail.',
    invalidEmail: 'Inserisci un indirizzo e-mail valido.',
    consentRequired: 'Spunta la casella per accettare le e-mail.',
  },
  privacy: {
    title: 'Informativa sulla privacy',
    description:
      'Cosa raccoglie Norwegian Singles, perché e come rimuoverlo. Nessun cookie di tracciamento e nessuna pubblicità.',
    updated: 'Ultimo aggiornamento: 5 novembre 2026',
    sections: [
      {
        title: 'Chi gestisce questo sito',
        text: 'Norwegian Singles è un calcolatore di allenamento gratuito e indipendente creato da Jon Ramos (jonramos.dev). Non è affiliato a James Copeland, Marius Bakken né ad alcun marchio citato.',
      },
      {
        title: 'Cosa resta nel tuo browser',
        text: 'Il tuo risultato di gara, le impostazioni del piano e la lingua vengono salvati nella memoria locale del browser, così il tuo piano è lì quando torni. Non ci vengono mai inviati. Cancella i dati del browser per rimuoverli.',
      },
      {
        title: 'Nessun cookie di tracciamento',
        text: 'Il sito non imposta cookie e non esegue script di analisi o pubblicità di terze parti.',
      },
      {
        title: 'Log del server',
        text: 'Come qualsiasi sito web, il nostro server registra i log standard delle richieste (come la pagina richiesta e l’orario). Quando clicchi su un link a un negozio o di sostegno, registriamo quale link è stato cliccato, su quale pagina e in quale lingua, senza cookie né identificatori personali, per sapere quali consigli sono utili.',
      },
      {
        title: 'E-mail del promemoria per rifare il test',
        text: 'Se ti iscrivi al promemoria, conserviamo il tuo indirizzo e-mail, la tua lingua, il link al tuo piano e la data del promemoria presso il nostro fornitore di servizi e-mail, solo per inviarti il promemoria e qualche e-mail di allenamento occasionale. Per iscriverti devi confermare il tuo indirizzo. Ogni e-mail contiene un link per annullare l’iscrizione, e annullandola vieni rimosso dalla lista. Puoi anche chiederci in qualsiasi momento di cancellare i tuoi dati.',
      },
      {
        title: 'Link di affiliazione',
        text: 'Alcuni link portano ad Amazon e sono link di affiliazione: se acquisti, potremmo ricevere una commissione senza costi aggiuntivi per te. Amazon gestisce tutto ciò che avviene sul suo sito secondo la propria informativa sulla privacy.',
      },
      {
        title: 'I tuoi diritti',
        text: 'Ai sensi del GDPR puoi chiedere di accedere ai tuoi dati, correggerli o cancellarli, oppure opporti al loro utilizzo. Contattaci tramite jonramos.dev e ti risponderemo entro 30 giorni.',
      },
    ],
    footerLink: 'Privacy',
  },
};

const ptBR: EngagementCopy = {
  book: {
    title: 'Leia o método completo',
    text: 'O livro de James Copeland explica o raciocínio por trás de cada sessão. Esta calculadora faz a aritmética.',
    paperback: 'Brochura na Amazon',
    kindle: 'Edição Kindle',
    paid: 'Link de afiliado',
  },
  reminder: {
    title: 'Receba um lembrete para refazer o teste em 6 semanas',
    text: 'Os ritmos só melhoram se você os atualizar. Vamos enviar um e-mail em 6 semanas com um link de volta ao seu plano, além de dicas de treino ocasionais. Cancele a inscrição com um clique.',
    emailLabel: 'E-mail',
    emailPlaceholder: 'voce@exemplo.com',
    consent:
      'Concordo em receber o lembrete e e-mails ocasionais do Norwegian Singles. Veja a {link}política de privacidade{/link}.',
    button: 'Me lembre',
    sending: 'Enviando…',
    success: 'Quase lá: confira sua caixa de entrada e confirme seu e-mail.',
    invalidEmail: 'Digite um endereço de e-mail válido.',
    consentRequired: 'Marque a caixa para concordar em receber os e-mails.',
  },
  privacy: {
    title: 'Política de privacidade',
    description:
      'O que o Norwegian Singles coleta, por quê e como remover. Sem cookies de rastreamento e sem anúncios.',
    updated: 'Última atualização: 5 de novembro de 2026',
    sections: [
      {
        title: 'Quem mantém este site',
        text: 'O Norwegian Singles é uma calculadora de treino gratuita e independente criada por Jon Ramos (jonramos.dev). Não é afiliado a James Copeland, Marius Bakken nem a qualquer marca mencionada.',
      },
      {
        title: 'O que fica no seu navegador',
        text: 'Seu resultado de prova, as configurações do plano e o idioma são salvos no armazenamento local do seu navegador, para que seu plano esteja lá quando você voltar. Eles nunca são enviados para nós. Limpe os dados do navegador para removê-los.',
      },
      {
        title: 'Sem cookies de rastreamento',
        text: 'O site não define cookies e não executa scripts de análise ou publicidade de terceiros.',
      },
      {
        title: 'Registros do servidor',
        text: 'Como qualquer site, nosso servidor registra logs padrão de requisições (como a página solicitada e o horário). Quando você clica em um link de loja ou de apoio, registramos qual link foi clicado, em qual página e em qual idioma, sem cookies nem identificadores pessoais, para sabermos quais recomendações são úteis.',
      },
      {
        title: 'E-mails do lembrete de novo teste',
        text: 'Se você se inscrever no lembrete, armazenamos seu endereço de e-mail, seu idioma, o link do seu plano e a data do lembrete no nosso provedor de e-mail, apenas para enviar o lembrete e e-mails de treino ocasionais. Para se inscrever, é preciso confirmar seu endereço. Todo e-mail tem um link de cancelamento, e cancelar remove você da lista. Você também pode pedir a qualquer momento que apaguemos seus dados.',
      },
      {
        title: 'Links de afiliado',
        text: 'Alguns links levam à Amazon e são links de afiliado: se você comprar, podemos ganhar uma comissão sem custo extra para você. A Amazon cuida de tudo o que acontece no site dela conforme a própria política de privacidade.',
      },
      {
        title: 'Seus direitos',
        text: 'De acordo com o GDPR (RGPD da UE), você pode pedir acesso, correção ou exclusão dos seus dados, ou se opor ao uso deles. Fale com a gente pelo jonramos.dev e responderemos em até 30 dias.',
      },
    ],
    footerLink: 'Privacidade',
  },
};

export const engagementCopy: Record<Locale, EngagementCopy> = {
  en,
  es,
  ko,
  de,
  fr,
  it,
  'pt-BR': ptBR,
};
