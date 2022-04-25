<template>
  <div class="container">
    
    <input
      type="text"
      v-model="search"
      class="form-control mt-5 mb-5"
      placeholder="Search..."
    />
    <div class="row" v-if="checkIfSearchNotEmpty()">
      <div class="col-sm-12 col-md-6 col-lg-2">
        <h2>Comics</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comic in filteredComics" :key="comic.id">
              <td @click="goToPage(`/comics/${comic.id}`)">{{ comic.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-2">
        <h2>Characters</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="character in filteredCharacters" :key="character.id">
              <td @click="goToPage(`/characters/${character.id}`)">{{ character.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ComicService from "../services/ComicService";
import CharacterService from "../services/CharacterService";

export default {
  name: "HomeView",
  data() {
    return {
      comics: [],
      characters: [],
      search: ""
    };
  },
  created() {
    this.comicService = new ComicService();
    this.characterService = new CharacterService();
  },
  mounted() {
    this.fetchAllComics();
    this.fetchAllCharacters();
  },
  methods: {
    async fetchAllComics() {
      await this.comicService
        .fetchAll()
        .then(data => {
          this.comics = data.results;
          console.log("comics", data.results)
        });
    },
    async fetchAllCharacters() {
      await this.characterService
        .fetchAll()
        .then(data => {
          this.characters = data.results;
          console.log("characeters", data.results)
        });
    },
    checkIfSearchNotEmpty() {
      if(this.search.length > 0) {
        return true
      }
    },
    async goToPage(path) {
      this.$router.push(path);
    },
  },
  computed: {
    filteredComics() {
      return this.comics.filter(comic => {
        return comic.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
      })
    },
    filteredCharacters() {
      return this.characters.filter(character => {
        return character.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1
      })
    }
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

td:hover {
  background-color: rgba(63, 63, 63, 0.2);
}

</style>
