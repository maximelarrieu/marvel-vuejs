<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Search a character"
    />
    <h2>Charaters list</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in characters" :key="character.id">
          <td>{{ character.name }}</td>
          <td>
            <button class="btn btn-primary" @click="goToCharacterDetail(character.id)">
              Show détails
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      :page-count="this.nbPages"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<script>
import CharacterService from "../services/CharacterService";
import Paginate from "vuejs-paginate-next";

export default {
  name: "CharactersList",
  components: {
    paginate: Paginate,
  },
  data() {
    return {
      limit: 20,
      characters: [],
      totalCharacters: 0,
      nbPages: 0,
    };
  },
  created() {
    this.characterService = new CharacterService();
  },
  mounted() {
    this.fetchAllCharacters(0);
  },
  methods: {
    async fetchAllCharacters(offset) {
      await this.characterService
        .fetchAllForPaginate(offset === 1 ? 0 : offset)
        .then((data) => {
          this.characters = data.results;
          this.totalCharacters = data.total;
          this.nbPages = Math.floor(data.total / this.limit);
        });
    },
    async goToCharacterDetail(id) {
      this.$router.push(`/character/${id}`);
    },
    clickCallback(pageNum) {
      this.fetchAllCharacters((pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.characters.length;
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
