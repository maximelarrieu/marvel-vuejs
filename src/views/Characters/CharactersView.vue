<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Rechercher un personnage"
    />
    <h2>Liste des personnages</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in characters" :key="character.id">
          <td>{{ character.name }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="goToCharacterDetail(character.id)"
            >
              Voir les détails
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      v-if="!isLoading"
      v-model="currentPage"
      :page-count="this.nbPages"
      :page-range="5"
      :margin-pages="5"
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
import CharacterService from "../../services/CharacterService";
import Paginate from "vuejs-paginate-next";
import LoaderComponent from "../../components/Loader/Loader.vue";

export default {
  name: "CharactersView",
  components: {
    paginate: Paginate,
    loader: LoaderComponent,
  },
  data() {
    return {
      currentPage: 1,
      isLoading: true,
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
      try {
        await this.characterService
          .fetchAllForPaginate(offset === 1 ? 0 : offset)
          .then((data) => {
            this.characters = data.results;
            this.totalCharacters = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async goToCharacterDetail(id) {
      this.$router.push(`/characters/${id}`);
    },
    clickCallback(pageNum) {
      this.isLoading = true;
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
