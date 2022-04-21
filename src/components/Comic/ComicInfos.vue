<template>
    <div>
        <h4>Infos</h4>
        <h5>Events</h5>
        <ul class="list-group" v-if="events.length > 0">
            <li class="list-group-item" v-for="event in events" :key="event.id">
                {{ event.name }}
            </li>
        </ul>
        <p v-else-if="events.length === 0">
            pas d'events
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
import ComicService from "@/services/ComicService";

export default {
    name: 'ComicInfos',
    data() {
        return {
            events: [],
            stories: []
        }
    },
    created() {
        this.comicService = new ComicService();
    },
    mounted() {
        this.fetchComicEvents(this.$route.params.id);
        this.fetchComicStories(this.$route.params.id);
    },
    methods: {
        async fetchComicEvents(id) {
            await this.comicService.fetchComicEvents(id).then(data => this.events = data.results)
        },
        async fetchComicStories(id) {
            await this.comicService.fetchComicStories(id).then(data => this.stories = data.results)
        },
    }
}
</script>
