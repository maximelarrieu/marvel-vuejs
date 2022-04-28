<template>
  <div class="container">
    <input
      type="text"
      @input="fetchAllCharactersWithSearch(search, 0)"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search a character..."
    />
    <h2>Les Personnages</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <div v-else class="characters-container row">
      <div
        v-for="character in characters"
        :key="character.id"
        class="col-md-3 character-preview"
        @click="goToCharacterDetail(character.id)"
      >
        <img
          :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
        />
        <p class="character-title">{{ character.name }}</p>
      </div>
    </div>

    <paginate
      v-if="!isLoading && this.search.length === 0"
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
    <paginate
      v-if="!isLoading && this.search.length > 0"
      v-model="currentPage"
      :page-count="this.nbPages"
      :page-range="5"
      :margin-pages="5"
      :click-handler="clickCallbackWithSearch"
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
      search: "",
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
      this.isLoading = true;
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
    async fetchAllCharactersWithSearch(name, offset) {
      this.isLoading = true;
      try {
        await this.characterService
          .fetchAllForPaginateWithSearch(name, offset === 1 ? 0 : offset)
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
    clickCallbackWithSearch(pageNum) {
      this.isLoading = true;
      this.fetchAllCharactersWithSearch(
        this.search,
        (pageNum - 1) * this.limit
      );
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
.characters-container {
  margin-top: 3rem;
}
.character-preview {
  margin-bottom: 2rem;
}

.character-preview img {
  transition: transform 100ms ease-in-out 25ms;
  box-shadow: 0 26px 24px -16px rgb(0 0 0 / 40%);
}

.character-preview:hover img {
  cursor: pointer;
  transform: translateY(-3%);
}

.character-preview:hover .character-title {
  color: red;
}

.character-preview .character-title {
  margin-top: 2rem;
}

img {
  width: 100%;
}

.pagination {
  justify-content: center;
}
</style>
