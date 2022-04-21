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
            <button class="btn btn-primary">Voir les détails</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h4>Comic Details page</h4>
    <ComicDetails id="1158" />
  </div>
</template>

<script>
import ComicService from "@/services/ComicService";
import ComicDetails from "@/views/ComicDetails.vue";

export default {
  name: 'HelloWorld',
  components: {
    ComicDetails
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
