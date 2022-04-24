<template>
    <div>
        <h4>Infos</h4>
        <h5>Events</h5>
        <ul class="list-group" v-if="events.length > 0">
            <li class="list-group-item" v-for="event in events" :key="event.id">
                {{ event.title }}
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
import CreatorService from "@/services/CreatorService";

export default {
    name: 'CreatorInfos',
    data() {
        return {
            events: [],
            stories: []
        }
    },
    created() {
        this.creatorService = new CreatorService();
    },
    mounted() {
        this.fetchCreatorEvents(this.$route.params.id);
        this.fetchCreatorStories(this.$route.params.id);
    },
    methods: {
        async fetchCreatorEvents(id) {
            await this.creatorService.fetchCreatorEvents(id).then(data => this.events = data.results)
        },
        async fetchCreatorStories(id) {
            await this.creatorService.fetchCreatorStories(id).then(data => this.stories = data.results)
        },
    }
}
</script>
