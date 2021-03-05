# Super-Simple The Office Trivia API

We all love "The Office" and if you don't, you're probably a very bad person.

This super-simple API allows you to fetch a few trivia questions and then check the answers to them.

## Installation

1. Clone the repository
2. Run `yarn`
3. There you go, you can start it in prod mode with `yarn start` or in dev mode with `yarn dev`
## Routes

### `GET /questions`

Params:
- `limit`: allows to limit the amount of questions received from API. Default: 10

Returns JSON with the following structure:

```json
{
  "length": 10,
  "questions": [
    {
      "question": "How many minutes did Michael Scott work at the Scranton office?",
      "answers": [
        "66,924,540",
        "3,450,000",
        "9,986,000",
        "6,500,100"
      ]
    },
    // .........
  ]
}
```
### `POST /answers`

Requires to have the body with following structure:

```json
[
  {
    "question": "What did Michael promised to give his Scott's Tots?",
    "answers": [
      "To pay for their tuition",
      "To pay for their cars",
      "To give them all apartments",
      "To give them a 10.000 dollars each"
    ],
    "answer": 2 // <---- this is the index of the answer that user supplied
  }
]
```

**Note that the body NEEDS to supply the full question and possible answers along with user's answer.**

Returns the JSON with following structure:

```json
[
  {
    "question": "What did Michael promised to give his Scott's Tots?",
    "answers": [
      "To pay for their tuition",
      "To pay for their cars",
      "To give them all apartments",
      "To give them a 10.000 dollars each"
    ],
    "answer": 2,
    "isCorrect": "false"
  }
]
```