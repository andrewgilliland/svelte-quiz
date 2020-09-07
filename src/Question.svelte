<script>
  export let question;

  let answers = question.incorrect_answers;
</script>

<div>
  <h3>
    {@html question.question}
  </h3>

  {#each answers as answer}
    <button>{@html answer}</button>
  {/each}
</div>
