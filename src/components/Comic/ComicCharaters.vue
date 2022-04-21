<template>
    <div>
        <h4>Personnages</h4>
        <ul>
            <li v-for="character in characters" :key="character.id">
                {{ character.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import ComicService from "@/services/ComicService";

export default {
    name: 'ComicCharacters',
    props: {
        id: Number
    },
    data() {
        return {
            characters: []
        }
    },
    created() {
        this.comicService = new ComicService();
    },
    mounted() {
        this.fetchComicCharacters(this.id);
    },
    methods: {
        async fetchComicCharacters(id) {
            await this.comicService.fetchComicCharacters(id).then(data => this.characters = data.results)
        }
    }
}
</script>
