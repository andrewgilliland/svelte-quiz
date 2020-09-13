import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "folks",
  },
});

export default app;
