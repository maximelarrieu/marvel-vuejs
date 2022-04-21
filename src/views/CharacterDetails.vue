<template>
    <div class="container">
        <h3>CHARACTER</h3>
        <img :src="characterImage" alt="character" class="mb-4">
        <h2>{{ character.name }}</h2>
        <p v-if="character.description">{{ character.description }}</p>
        <p v-else-if="!character.description">pas de description</p>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <CharacterComics />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
                <CharacterInfos />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <CharacterSeries />
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
    name: 'CharacterDetails',
    components: {
        CharacterComics,
        CharacterSeries,
        CharacterInfos
    },
    data() {
        return {
            character: {},
            characterImage: ''
        }
    },
    created() {
        this.characterService = new CharacterService();
    },
    mounted() {
        this.fetchOneCharacter(this.$route.params.id);
    },
    methods: {
        async fetchOneCharacter(id) {
            await this.characterService.fetchOne(id).then(data => 
                this.character = data.results[0]
            ).then(character => {
                this.characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`
            })
        }
    }
}
</script>

<style scoped>

img {
    width: 300px;
    height: 300px;
}

</style>
