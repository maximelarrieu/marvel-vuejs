<template>
    <div>
        <h4>Characters</h4>
        <ul class="list-group" v-if="characters.length > 0">
            <li class="list-group-item" v-for="character in characters" :key="character.id" @click="goToCharacterDetails(character.id)">
                {{ character.name }}
            </li>
        </ul>
        <p v-if="characters.length === 0">
            pas de characters
        </p>
    </div>
</template>

<script>
import SerieService from "@/services/SerieService";

export default {
    name: 'SerieCharacters',
    data() {
        return {
            characters: []
        }
    },
    created() {
        this.serieService = new SerieService();
    },
    mounted() {
        this.fetchSerieCharacters(this.$route.params.id);
    },
    methods: {
        async fetchSerieCharacters(id) {
            await this.serieService.fetchSerieCharacters(id).then(data => this.characters = data.results)
        },
        async goToCharacterDetails(id) {
            this.$router.push(`/character/${id}`)
        }
    }
}
</script>
