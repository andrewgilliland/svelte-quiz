<script>
  export let question;
  export let nextQuestion;
  export let addToScore;

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
      addToScore();
    }
  }
</script>

<style>
  .correct-answer {
    color: teal;
  }

  .incorrect-answer {
    color: tomato;
  }
</style>

<div>
  <h3>
    {@html question.question}
  </h3>

  {#if isAnswered}
    {#if isCorrect}
      <h4 class="correct-answer">You got it right!</h4>
    {:else}
      <h4 class="incorrect-answer">You goofed up</h4>
    {/if}
  {/if}

  {#each allAnswers as answer}
    <button on:click={() => checkQuestion(answer.correct)}>{@html answer.answer}
    </button>
  {/each}

  {#if isAnswered}
    <div><button on:click={nextQuestion}>Next Question</button></div>
  {/if}
</div>
