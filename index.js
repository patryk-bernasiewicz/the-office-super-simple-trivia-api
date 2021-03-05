const questions = require('./questions.json');
const express = require('express');

const port = 5000;
const app = express();

app.use(express.json());

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
  const { answers } = req.body;
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