<template>
    <div>
        <h4>Characters</h4>
        <ul class="list-group" v-if="characters.length > 0">
            <li class="list-group-item" v-for="character in characters" :key="character.id" @click="goToCharacterDetails(character.id)">
                {{ character.name }}
            </li>
        </ul>
        <p v-if="characters.length === 0">
            no characters
        </p>
    </div>
</template>

<script>
import StoryService from "@/services/StoryService";

export default {
    name: 'StoryCharacters',
    data() {
        return {
            characters: []
        }
    },
    created() {
        this.storyService = new StoryService();
    },
    mounted() {
        this.fetchStoryCharacters(this.$route.params.id);
    },
    methods: {
        async fetchStoryCharacters(id) {
            await this.storyService.fetchStoryCharacters(id).then(data => this.characters = data.results)
        },
        async goToCharacterDetails(id) {
            this.$router.push(`/character/${id}`)
        }
    }
}
</script>
