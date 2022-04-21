<template>
  <div class="container">
    <input type="text" class="form-control mb-5" placeholder="Rechercher un comics" />
    <h2>Liste des comics</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comic in comics" :key="comic.id">
          <td>{{ comic.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToComicDetail(comic.id)">Voir les détails</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ComicService from "../services/ComicService";

export default  {
  name: 'HomeView',
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
    },
    async goToComicDetail(id) {
      this.$router.push(`/comic/${id}`)
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
