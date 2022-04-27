<template>
  <div class="container mb-5 text-left">
    <div class="row">
      <div class="col-md-2 img-container">
        <img :src="characterImage" alt="personnage" class="mb-4" />
      </div>
      <div class="col-md-10">
        <div class="mb-4">
          <h2 class="text-left">{{ character.name }}</h2>
          <p v-if="character.description !== ''">{{ character.description }}</p>
          <p v-else class="text-left">Aucune description</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <CharacterComics />
      </div>
      <div class="col-12">
        <CharacterSeries />
      </div>
      <div class="col-12">
        <CharacterInfos />
      </div>
    </div>
  </div>
</template>

<script>
import CharacterService from "@/services/CharacterService";
import CharacterComics from "@/components/Character/CharacterComics.vue";
import CharacterSeries from "@/components/Character/CharacterSeries.vue";
import CharacterInfos from "@/components/Character/CharacterInfos.vue";

export default {
  name: "CharacterDetails",
  components: {
    CharacterComics,
    CharacterSeries,
    CharacterInfos,
  },
  data() {
    return {
      character: {},
      characterImage: "",
    };
  },
  created() {
    this.characterService = new CharacterService();
  },
  mounted() {
    this.fetchOneCharacter(this.$route.params.id);
  },
  methods: {
    async fetchOneCharacter(id) {
      await this.characterService
        .fetchOne(id)
        .then((data) => (this.character = data.results[0]))
        .then((character) => {
          this.characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        });
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
