<template>
    <div>
        <h4>Personnages</h4>
        <ul class="list-group" v-if="characters.length > 0">
            <li class="list-group-item" v-for="character in characters" :key="character.id" @click="goToCharacterDetails(character.id)">
                {{ character.name }}
            </li>
        </ul>
        <p v-if="characters.length === 0">
            pas de personnages
        </p>
    </div>
</template>

<script>
import ComicService from "@/services/ComicService";

export default {
    name: 'ComicCharacters',
    data() {
        return {
            characters: []
        }
    },
    created() {
        this.comicService = new ComicService();
    },
    mounted() {
        this.fetchComicCharacters(this.$route.params.id);
    },
    methods: {
        async fetchComicCharacters(id) {
            await this.comicService.fetchComicCharacters(id).then(data => this.characters = data.results)
        },
        async goToCharacterDetails(id) {
            this.$router.push(`/character/${id}`)
        }
    }
}
</script>
