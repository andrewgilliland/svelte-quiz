<script>
  import { fade, scale, blur, fly, slide } from "svelte/transition";
  import { get } from "http";
  import App from "./App.svelte";
  import Question from "./Question.svelte";

  let activeQuestion = 0;
  let score = 0;
  let quiz = getQuiz();

  async function getQuiz() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
    );
    const quiz = await res.json();
    return quiz;
  }

  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }

  function resetQuiz() {
    score = 0;
    activeQuestion = 0;
    quiz = getQuiz();
  }

  function addToScore() {
    score = score + 1;
  }

  // Reactive Statement
  $: if (score > 7) {
    alert("You won!");
    resetQuiz();
  }

  // Reactive Declaration
  $: questionNumber = activeQuestion + 1;
</script>

<style>
</style>

<div>
  <button on:click={resetQuiz}>Start New Quiz</button>

  <h3>My Score: {score}</h3>
  <h4>Question #{questionNumber}</h4>

  {#await quiz}
    <div>Loading...</div>
  {:then data}
    {#each data.results as question, index}
      {#if index === activeQuestion}
        <div in:fade>
          <Question {addToScore} {nextQuestion} {question} />
        </div>
      {/if}
    {/each}
  {/await}
</div>
