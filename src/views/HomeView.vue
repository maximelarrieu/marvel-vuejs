<template>
    <div class="home">
        <h1>Home</h1>
    </div>
</template>

<script>
import ComicService from "../services/ComicService";

export default  {
  name: 'HomeView',
  props: {
    msg: String
  },
  data() {
    return {
      comics: []
    }
  },
  created() {
    this.comicService = new ComicService();
  },
  mounted() {
    this.fetchAllComics();
  },
  methods: {
    async fetchAllComics() {
      await this.comicService.fetchAll().then(data => this.comics = data.results)
    }
  }
}
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
