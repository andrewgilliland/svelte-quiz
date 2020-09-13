<script>
  import { score } from "./store.js";

  export let question;
  export let nextQuestion;

  let isCorrect;
  let isAnswered = false;
  let answers = question.incorrect_answers.map((answer) => {
    return {
      answer,
      correct: false,
    };
  });

  let allAnswers = [
    ...answers,
    {
      answer: question.correct_answer,
      correct: true,
    },
  ];

  shuffle(allAnswers);

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function checkQuestion(correct) {
    isAnswered = true;
    isCorrect = correct;

    if (correct) {
      score.update((val) => val + 1);
    }
  }
</script>

<style>
  h5 {
    color: violet;
  }

  .isCorrect {
    color: whitesmoke;
  }

  .wrong {
    color: yellow;
  }

  button {
    background-color: #2c2c2c;
    border: none;
    border-radius: 5px;
    color: #d1d1d1;
    font-weight: 600;
    margin: 10px;
    padding: 10px 20px;
  }

  .question-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 640px) {
    .question-container {
      flex-direction: row;
    }
  }
</style>

<div class="question">
  <h3>
    {@html question.question}
  </h3>

  {#if isAnswered}
    <h5 class:isCorrect class:wrong={!isCorrect}>
      {#if isCorrect}You got it right!{:else}You goofed up{/if}
    </h5>
  {/if}

  <div class="question-container">
    {#each allAnswers as answer}
      <button
        class="answer"
        on:click={() => checkQuestion(answer.correct)}>{@html answer.answer}
      </button>
    {/each}
  </div>

  {#if isAnswered}
    <div><button on:click={nextQuestion}>Next Question</button></div>
  {/if}
</div>
