<template>
  <div class="container">
    <h2>Présentation du projet</h2>
    <h4>Application web développée en VueJS 3</h4>
    <p>Utilisation de la Marvel API</p>
    <p>
      Cet application vous premettra de rechercher vos comics préférés.
      Aussi, les personnages présent et les séries, créateurs, évènements et histoires correspondants.
    </p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

td:hover {
  background-color: rgba(63, 63, 63, 0.2);
}
</style>
