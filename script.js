const jeopardyBoard = document.getElementById('jeopardy-board');
const modal = document.createElement('div');
const modalContent = document.createElement('div');
const closeModal = document.createElement('span');

const categories = ['Would She Rather', 'Would He Rather', 'By the Numbers', 'Travel', 'Food/Drink'];

const questions = [
  ['Coffee or Tea?', 'Rice or Noodles?', 'Yoga or Hiking?', 'Live close to a big city or close to nature and the outdoors?', 'Would Lauren rather never be able to watch reality TV again or never be able to find a hike that feels satisfying after again?'],
  ['Tennis with Lauren or Walk with Suki?', 'Out on the Town or Cozy night at home?', 'Salty or Sweet?', 'Golfing with Friends or Pokemon on Youtube?', 'A meal that has a teeny tiny portion size but is 100/10 in taste or a meal that has a massive portion size but is only 6.5/10 in taste?'],
  ['Average number of steps Lauren and Jim average while travelling', 'Number of times Lauren and Jim have accidentally stopped at the same JJs in Lincoln by accident while travelling from CO to IN or IN to CO', 'Number of times Lauren and Jim have gone camping and came home the same night because they wanted Sushi', 'Number of consecutive PokeGrids that Lauren and Jim have completed, their longest streak', 'Number of times that Jim has called a baby ugly after Lauren shows him her phone and says: Look at this cute baby'],
  ['Where did Jim propose to Lauren?', 'Where did Lauren live for 2 years abroad?', 'How many countries has the couple been to together?', 'What is Jim\'s favorite country they have visited together?', 'What country would Jim like to live in most outside of the US?'],
  ['What food does Jim always want that Lauren never does?', 'If Lauren asked Jim to get her a drink from the bar with no other criteria, what drink would Jim bring back to her?', 'What is Lauren\'s favorite meal that Jim has cooked for her?', 'What is the most memorable meal Lauren and Jim have had together? good or bad', 'Who does Jim thinks like food more between him and Lauren?']
];

const answers = [
  ['Coffee', 'Noodles', 'Hiking, subnote from Jim: She\'s been on her hiking grind the last few months', 'Big City', 'Never find a satisfying hike again, subnote from Jim: WOW what a question...a tough one for sure'],
  ['Tennis with Lauren, subnote from Jim: Suki is a nightmare incarnate, definitely Tennis', 'Cozy Night at Home', 'Salty', 'Pokemon on Youtube, subnote from Jim: Tough one', 'Large Portion & 6.5/10, subnote from Jim: EZ, I\'m a volume shooter. Give me ten chicken tendies over two unbelievable dumplings any day'],
  ['20K', '12x', 'One Time', '36', '200'],
  ['Jeju Island, Korea', 'Cambodia', '9, 11 if you count layovers', 'Korea', 'England'],
  ['Mapo Tofu or any messy foods like wings or ribs', 'White Linen from Proud Mary in South Africa; if that\'s not available then a refreshing Gin cocktail', 'Chicken Ruby', 'Good: Dishoom, Thanksgiving buffet Korea, Shake Shack in Seoul, Bad: the one true answer is Garlic Scallion Noodles that Jim made, Most memorable for embarrassing reasons: Breakfast pufferfish experience in Busan', 'Jim, subnote from Jim: Lauren appreciates food more, Jim enjoys it more based on quantity']
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
