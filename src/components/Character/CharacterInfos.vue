<template>
    <div>
        <h4>Infos</h4>
        <h5>Events</h5>
        <ul class="list-group" v-if="events.length > 0">
            <li class="list-group-item" v-for="event in events" :key="event.id" @click="goToComicDetails(event.id)">
                {{ event.title }}
            </li>
        </ul>
        <p v-if="events.length === 0">
            pas de events
        </p>
        <h5>Stories</h5>
        <ul class="list-group" v-if="stories.length > 0">
            <li class="list-group-item" v-for="story in stories" :key="story.id">
                {{ story.title }}
            </li>
        </ul>
        <p v-else-if="stories.length === 0">
            pas de story
        </p>
    </div>
</template>

<script>
import CharacterService from "@/services/CharacterService";

export default {
    name: 'CharacterComics',
    data() {
        return {
            events: [],
            stories: []
        }
    },
    created() {
        this.characterService = new CharacterService();
    },
    mounted() {
        this.fetchCharacterEvents(this.$route.params.id);
        this.fetchCharacterStories(this.$route.params.id)
    },
    methods: {
        async fetchCharacterEvents(id) {
            await this.characterService.fetchCharacterEvents(id).then(data => this.events = data.results)
        },
        async fetchCharacterStories(id) {
            await this.characterService.fetchCharacterStories(id).then(data => this.stories = data.results)
        }
    }
}
</script>
