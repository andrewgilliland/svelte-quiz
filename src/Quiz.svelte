<script>
  import { fade, scale, blur, fly, slide } from "svelte/transition";
  import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
  import { get } from "http";
  import App from "./App.svelte";
  import Question from "./Question.svelte";
  import Modal from "./Modal.svelte";
  import { score } from "./store.js";

  let activeQuestion = 0;
  let quiz = getQuiz();
  let isModalOpen = false;

  onMount(() => {
    console.log("I mounted");
  });
  beforeUpdate(() => {
    console.log("before update");
  });
  afterUpdate(() => {
    console.log("after update");
  });

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
    isModalOpen = false;
    score.set(0);
    activeQuestion = 0;
    quiz = getQuiz();
  }

  // Reactive Statement
  $: if ($score > 0) {
    isModalOpen = true;
  }

  // Reactive Declaration
  $: questionNumber = activeQuestion + 1;
</script>

<style>
  button {
    background-color: #2c2c2c;
    border: none;
    border-radius: 5px;
    color: #d1d1d1;
    font-weight: 600;
    padding: 15px 30px;
    text-transform: uppercase;
  }
</style>

<div>
  <button on:click|once={resetQuiz}>Start New Quiz</button>

  <h3>My Score: {$score}</h3>
  <h4>Question #{questionNumber}</h4>

  {#await quiz}
    <div>Loading...</div>
  {:then data}
    {#each data.results as question, index}
      {#if index === activeQuestion}
        <div in:fade>
          <Question {nextQuestion} {question} />
        </div>
      {/if}
    {/each}
  {/await}
</div>

{#if isModalOpen}
  <Modal on:close={resetQuiz}>
    <h2>You Won!</h2>
    <p>Congratulations!</p>
    <button on:click={resetQuiz}>Start Over</button>
  </Modal>
{/if}
