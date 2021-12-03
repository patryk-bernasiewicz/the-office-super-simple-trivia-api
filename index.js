const questions = require('./questions.json');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.get('/', (_, res) => {
  return res.json({ response: 'Hello!' });
});

app.get('/questions', (req, res) => {
  const { limit = 10 } = req.query;
  const randomQuestions = questions
    .sort(() => .5 - Math.random())
    .slice(0, limit)
    .map(({ question, answers }) => ({ question, answers }));
  return res.json({
    length: randomQuestions.length,
    questions: randomQuestions,
  });
});

app.post('/answers', (req, res) => {
  const answers = req.body;

  const hasAllAnswers = answers.every((answer) => 'answer' in answer);
  if (!hasAllAnswers) {
    return res
      .status(400)
      .json({ message: 'All questions must be answered.' });
  }

  const checkedAnswers = answers
    .map((answer) => {
      const originalQuestion = questions.find((question) => question.question === answer.question);
      return {
        ...answer,
        isCorrect: (answer.answer === originalQuestion.correctAnswer).toString(),
      };
    });
  return res.json(checkedAnswers);
});

app.get('*', (_, res) => {
  return res.status(404).json({ response: 'Not found.' });
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}...`);
});