<script>
  export let name;
  import Quiz from "./Quiz.svelte";
</script>

<style>
  main {
    background-color: deeppink;
    color: #2c2c2c;
    border-radius: 15px;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #2c2c2c;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Svelte Quiz!</h1>
  <h2>Hi {name}! Are you ready for some knowledge?</h2>
  <Quiz />
</main>
