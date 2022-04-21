<template>
    <div>
        <h4>Comics</h4>
        <ul class="list-group" v-if="comics.length > 0">
            <li class="list-group-item" v-for="comic in comics" :key="comic.id" @click="goToComicDetails(comic.id)">
                {{ comic.title }}
            </li>
        </ul>
        <p v-if="comics.length === 0">
            pas de comics
        </p>
    </div>
</template>

<script>
import CharacterService from "@/services/CharacterService";

export default {
    name: 'CharacterComics',
    data() {
        return {
            comics: []
        }
    },
    created() {
        this.characterService = new CharacterService();
    },
    mounted() {
        this.fetchCharacterComics(this.$route.params.id);
    },
    methods: {
        async fetchCharacterComics(id) {
            await this.characterService.fetchCharacterComics(id).then(data => this.comics = data.results)
        },
        async goToComicDetails(id) {
            this.$router.push(`/comic/${id}`)
        }
    }
}
</script>
