export const SUBSCRIPTION: {name: string, url: string}[] = [
  {name: 'Кіно', url: 'cinema'},
  {name: 'Музика', url: 'music'},
  {name: 'Дизайн', url: 'design'},
  {name: 'Навчання', url: 'studie'},
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
      { name: 'disney-icon', url: 'assets/icons/cinema-disney-icon.png' },
      { name: 'hbo-icon', url: 'assets/icons/cinema-hbo-icon.png' },
      { name: 'netflix-icon', url: 'assets/icons/cinema-netflix-icon.png' },
      { name: 'youtube-icon', url: 'assets/icons/cinema-youtube-icon.png' }
    ],
    url: 'cinema'
  },
  {
    name: 'Музика',
    icons: [
      { name: 'amazon-icon', url: 'assets/icons/music-amazon-icon.png' },
      { name: 'apple-icon', url: 'assets/icons/music-apple-icon.png' },
      { name: 'soundcloud-icon', url: 'assets/icons/music-soundcloud-icon.png' },
      { name: 'spotify-icon', url: 'assets/icons/music-spotify-icon.png' }
    ],
    url: 'music'
  },
  {
    name: 'Дизайн',
    icons: [
      { name: 'adobe-icon', url: 'assets/icons/design-adobe-icon.png' },
      { name: 'affinity-icon', url: 'assets/icons/design-affinity-icon.png' },
      { name: 'figma-icon', url: 'assets/icons/design-figma-icon.png' },
      { name: 'canva-icon', url: 'assets/icons/design-canva-icon.png' }
    ],
    url: 'design'
  },
  {
    name: 'Навчання',
    icons: [
      { name: 'coursera-icon', url: 'assets/icons/study-coursera-icon.png' },
      { name: 'linkedin-icon', url: 'assets/icons/study-linkedin-icon.png' },
      { name: 'skillshare-icon', url: 'assets/icons/study-skillshare-icon.png' },
      { name: 'udemy-icon', url: 'assets/icons/study-udemy-icon.png' }
    ],
    url: 'studie'
  },
  {
    name: 'Ігри',
    icons: [
      { name: 'nvidia-icon', url: 'assets/icons/game-nvidia-icon.png' },
      { name: 'play-icon', url: 'assets/icons/game-play-icon.png' },
      { name: 'playstation-icon', url: 'assets/icons/game-playstation-icon.png' },
      { name: 'xbox-icon', url: 'assets/icons/game-xbox-icon.png' }
    ],
    url: 'game'
  },
  {
    name: 'Соцмережі',
    icons: [
      { name: 'reddit-icon', url: 'assets/icons/social-reddit-icon.png' },
      { name: 'snapchat-icon', url: 'assets/icons/social-snapchat-icon.png' },
      { name: 'twitter-icon', url: 'assets/icons/social-twitter-icon.png' },
      { name: 'pinterest-icon', url: 'assets/icons/social-pinterest-icon.png' }
    ],
    url: 'social'
  }
];
