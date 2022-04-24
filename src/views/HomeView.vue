<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-3">
        <button class="btn btn-primary" @click="goToPage('/comics')">
          Les Comics
        </button>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-3">
        <button class="btn btn-primary" @click="goToPage('/creators')">
          Les Créateurs
        </button>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-3">
        <button class="btn btn-primary" @click="goToPage('/characters')">
          Les Personnages
        </button>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-3">
        <button class="btn btn-primary" @click="goToPage('/series')">
          Les Séries
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    async goToPage(path) {
      this.$router.push(path);
    },
  },
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
</style>
