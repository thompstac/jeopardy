const jeopardyBoard = document.getElementById('jeopardy-board');
const modal = document.createElement('div');
const modalContent = document.createElement('div');
const closeModal = document.createElement('span');

const categories = ["Would Rummer Rather", "Would Zach Rather", "By the Numbers", "Travel and Adventure", "Misc."];

const questions = [
  ["Manicure or pedicure?", "Cook or garden?", "Do a photoshoot for a friend or go for a hike with a friend?", "Never be able to spoil the end of a movie again or never be able to watch the Oscars again?", "Would Rum rather never be able to drink a fun little plain latte again or never be able to find a book she deeply connects to ever again?"],
  ["On a Saturday afternoon, do a home reno project or go for a walk with Meex?", "Go out on the town or have a cozy night in at home?", "Salty or sweet?", "Have to cook 3 homemade meals a day for a month or do a triathlon with only a month to train?", "Give up playing sports forever, disc golf, etc. or give up watching sports forever, go dawgs?"],
  ["Number of national parks you have visited together", "Number of Twenty One Pilots concerts you have visited together", "Number of times Rummer and Zach have watched the Dawgs win a National Championship together", "Number of books Rummer read last year", "Number of times Rummer has farted on Zach on purpose"],
  ["Where did Zach propose to Rummer?", "Where did Rummer live abroad for several years? Bonus points, who else in the room lived abroad at the same time as Rummer?", "Where was the first vacation you guys took together?", "What is Zachs fav place you guys have traveled together?", "If you guys had to live abroad for a year, what country would Zach choose? Bonus points, what does Zach think Rummer would choose?"],
  ["How does Rummer take her coffee?", "What is a chore that Zach does not mind doing that Rummer hates doing?", "What is Rummers favorite way to spend a Saturday?", "If Zach had to go get Rummer an alcoholic drink from the bar without asking her what she wants, what would Zach order her?", "How big of a priority is food in Rummer and Zachs life?"]
];

const answers = [
  [
    "Manicure, From Zach: Followed by me acting as paparazzi when she gets home to take pics and be excited for her cool new nails",
    "Garden, From Zach: She is a great cook and seems to be enjoying it quite a bit lately, but cmon people! We aka Rummer dream about garden season year round",
    "Photoshoot!, From Zach: She will be more excited and less stressed for hiking leading up but will be way happier after a photoshoot",
    "Never be able to spoil the end of a movie again, From Zach: We already have a rule against spoilers in this house. But you cannot touch the Oscars, or Timothy Chalamet and his peaches if you want to stay with Rum dawg. Of note, I have won the Oscars comp the past two seasons",
    "No satisfying books again, From Zach: Rummer will read books even if they do not satisfy her, but she will stop drinking a latte and throw it away for a better one if it is not adequate. I think that is clear enough reasoning. Example: Rummer 5 pages into a 650 page book: Ugh I hate this book. Me: Quit reading it and start one of the other ones you're excited about. Her: No, I already started."
  ],
  [
    "Walk with Meex!, From Zach: I guess it really depends on the project or phase of the project, but most of the time Mika sounds more enjoyable than the 70 year old discoveries I make behind the walls of our house.",
    "Cozy night at home, From Zach: No doubt about this one. We are old. I would rather hang with Rum Dawg than be out in public 10 out of 10 times.",
    "Salty, From Zach: Chipotle over chocolate",
    "Triathlon, From Zach: I would choose this even if it were 1 meal total in the month. Being outside is way more fun",
    "Give up playing sports, From Zach: If we are talking actual sports, it is a no brainer, I am rolling with the Dawgs. If we also include exercising or races, I would sadly have to stop watching"
  ],
  ["14", "2", "0", "31", "2"],
  [
    "Great Falls Park, located around a very special house from Rummers coming of age years that she was kind enough to fill me in on right before we arrived to the park HAHA",
    "Okinawa, Japan, Bonus points: Lauren!",
    "Technically, it would have been Ocean Beach with Rums mom but first trip just the two of us would have been Big Bear",
    "Iceland for me, Vietnam for Rum",
    "Yikes... hopefully those days are over. Maybe Portugal. Rummer would choose somewhere like Mongolia."
  ],
  [
    "McDonalds plain latte, at home though she will use a french press. Two spoons of coffee in the french press. Sugar cubes that are not uniform in size but usually one big one and one little one. A little cream to that and you will not get complaints",
    "Breaking down boxes or taking out the trash. Those are boy chores.",
    "Slow roll out of bed, maybe with some coffee and reading before getting up. Soak in the sun for a bit. Take a long walk, preferably in the woods. Play in the garden. Do a physical activity. Early bedtime with more reading before sleep.",
    "Tequila shot, or a hard seltzer, or one sip of a bloody mary",
    "Somewhat a priority, Rummer is Whole Foods and health."
  ]
];

modal.id = 'question-modal';
modalContent.id = 'modal-content';
closeModal.id = 'close-modal';
closeModal.innerHTML = '&times;';
modalContent.appendChild(closeModal);
modal.appendChild(modalContent);
document.body.appendChild(modal);

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalContent.innerHTML = '';
  modalContent.appendChild(closeModal);
});

function createJeopardyCell(text, question, answer, isClickable, columnIndex) {
  const cell = document.createElement('div');
  cell.classList.add('jeopardy-cell');
  if (!isClickable) {
    cell.classList.add('header-cell');
  } else {
    cell.classList.add(`column-${columnIndex + 1}`);
    cell.addEventListener('click', () => showQuestion(question, answer, cell));
  }
  cell.innerText = text;
  return cell;
}

function showQuestion(question, answer, cell) {
  modal.style.display = 'block';
  modalContent.style.backgroundColor = window.getComputedStyle(cell).backgroundColor;

  const questionText = document.createElement('div');
  questionText.classList.add('question');
  questionText.innerText = question;

  const answerButton = document.createElement('button');
  answerButton.innerText = 'Show Answer';
  answerButton.addEventListener('click', () => {
    answerText.style.display = 'block';
    answerButton.style.display = 'none';
    cell.classList.add('answered');
    cell.style.pointerEvents = 'none'; // Make the cell unclickable
  });

  const answerText = document.createElement('div');
  answerText.classList.add('answer');
  answerText.innerText = answer;
  answerText.style.display = 'none';

  modalContent.appendChild(questionText);
  modalContent.appendChild(answerButton);
  modalContent.appendChild(answerText);
}

// Create headers
categories.forEach((category, columnIndex) => {
  jeopardyBoard.appendChild(createJeopardyCell(category, '', '', false, columnIndex));
});

// Create question cells
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < categories.length; j++) {
    const question = questions[j][i];
    const answer = answers[j][i];
    const points = (i + 1) * 100;
    jeopardyBoard.appendChild(createJeopardyCell(points, question, answer, true, j));
  }
}
