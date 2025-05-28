export const SUBSCRIPTION: {name: string, url: string}[] = [
  {name: 'Кіно', url: 'cinema'},
  {name: 'Музика', url: 'music'},
  {name: 'Дизайн', url: 'design'},
  {name: 'Навчання', url: 'study'},
  {name: 'Ігри', url: 'game'},
  {name: 'Соцмережі', url: 'social'},
];

export const FAQS: {question: string, answer: string}[] = [
  {question: 'Як купити підписку?', answer: 'Оберіть підписку, яка вас цікавить, натисніть Купити, і дотримуйтесь інструкцій. Оплата проходить через захищену платіжну систему, а платформа резервує кошти до моменту підтвердження отримання підписки.'},
  {question: 'Як я отримаю доступ після покупки?', answer: 'Після оплати продавець надає вам дані для входу або активує підписку на ваш акаунт. Ви отримаєте повідомлення у своєму профілі та на email, коли це буде зроблено.'},
  {question: 'Чи є гарантія, що підписка буде працювати?', answer: 'Так, платформа перевіряє продавців та надає гарантію на кожну покупку. Якщо підписка неактивна або не працює, ви зможете оформити скаргу, і кошти будуть повернені.'},
  {question: 'Що робити, якщо продавець не передав підписку?', answer: 'Якщо після покупки продавець не надав підписку протягом зазначеного часу, ви можете повідомити про проблему — підтримка втрутиться, а гроші будуть заморожені до вирішення ситуації.'},
  {question: 'Чи можу я повернути гроші, якщо щось піде не так?', answer: 'Так, якщо підписка неактивна, недоступна або не відповідає опису, ви можете подати запит на повернення коштів через службу підтримки.'},
  {question: 'Чи можу я продати свою невикористану підписку?', answer: "Так, ви можете створити оголошення, вказати тип підписки, термін дії та ціну. Після перевірки модерацією ваше оголошення з'явиться на платформі."},
  {question: 'Чи безпечно купувати та продавати підписки на цій платформі?', answer: 'Так, всі транзакції проходять через захищений платіжний шлюз, а платформа виступає гарантом між покупцем і продавцем до моменту успішного завершення угоди.'}
];

export const SUBSCRIPTION_CATEGORIES: {name: string, icons: {name: string, url: string}[], url: string}[] = [
  {
    name: 'Кіно',
    icons: [
      { name: 'Disney+ Premium', url: 'assets/icons/cinema-disney-icon.png' },
      { name: 'HBO Max Standard', url: 'assets/icons/cinema-hbo-icon.png' },
      { name: 'Netflix Premium', url: 'assets/icons/cinema-netflix-icon.png' },
      { name: 'YouTube Premium', url: 'assets/icons/cinema-youtube-icon.png' }
    ],
    url: 'cinema'
  },
  {
    name: 'Музика',
    icons: [
      { name: 'Amazon Music Unlimited', url: 'assets/icons/music-amazon-icon.png' },
      { name: 'Apple Music Individual', url: 'assets/icons/music-apple-icon.png' },
      { name: 'SoundCloud Go+', url: 'assets/icons/music-soundcloud-icon.png' },
      { name: 'Spotify Premium Individual', url: 'assets/icons/music-spotify-icon.png' }
    ],
    url: 'music'
  },
  {
    name: 'Дизайн',
    icons: [
      { name: 'Adobe Creative Cloud', url: 'assets/icons/design-adobe-icon.png' },
      { name: 'Affinity Designer License', url: 'assets/icons/design-affinity-icon.png' },
      { name: 'Figma Professional', url: 'assets/icons/design-figma-icon.png' },
      { name: 'Canva Pro', url: 'assets/icons/design-canva-icon.png' }
    ],
    url: 'design'
  },
  {
    name: 'Навчання',
    icons: [
      { name: 'Coursera Plus', url: 'assets/icons/study-coursera-icon.png' },
      { name: 'LinkedIn Learning Premium', url: 'assets/icons/study-linkedin-icon.png' },
      { name: 'Skillshare Premium', url: 'assets/icons/study-skillshare-icon.png' },
      { name: 'Udemy Personal Plan', url: 'assets/icons/study-udemy-icon.png' }
    ],
    url: 'study'
  },
  {
    name: 'Ігри',
    icons: [
      { name: 'NVIDIA GeForce NOW Priority', url: 'assets/icons/game-nvidia-icon.png' },
      { name: 'Google Play Pass', url: 'assets/icons/game-play-icon.png' },
      { name: 'PlayStation Plus Extra', url: 'assets/icons/game-playstation-icon.png' },
      { name: 'Xbox Game Pass Ultimate', url: 'assets/icons/game-xbox-icon.png' }
    ],
    url: 'game'
  },
  {
    name: 'Соцмережі',

    icons: [
      { name: 'Reddit Premium', url: 'assets/icons/social-reddit-icon.png' },
      { name: 'Snapchat+', url: 'assets/icons/social-snapchat-icon.png' },
      { name: 'Twitter Blue (X Premium)', url: 'assets/icons/social-twitter-icon.png' },
      { name: 'Pinterest Premium', url: 'assets/icons/social-pinterest-icon.png' }
    ],
    url: 'social'
  }
];
