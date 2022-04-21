<template>
    <div>
        <h4>Infos</h4>
        <h5>Comics</h5>
        <ul class="list-group" v-if="comics.length > 0">
            <li class="list-group-item" v-for="comic in comics" :key="comic.id" @click="goToComicDetails(comic.id)">
                {{ comic.title }}
            </li>
        </ul>
        <p v-if="comics.length === 0">
            pas de comics
        </p>
        <h5>Events</h5>
        <ul class="list-group" v-if="events.length > 0">
            <li class="list-group-item" v-for="event in events" :key="event.id" @click="goToEventDetails(event.id)">
                {{ event.title }}
            </li>
        </ul>
        <p v-if="events.length === 0">
            pas de events
        </p>
        <h5>Stories</h5>
        <ul class="list-group" v-if="stories.length > 0">
            <li class="list-group-item" v-for="story in stories" :key="story.id" @click="goToStoryDetails(story.id)">
                {{ story.title }}
            </li>
        </ul>
        <p v-else-if="stories.length === 0">
            pas de story
        </p>
    </div>
</template>

<script>
import SerieService from "@/services/SerieService";

export default {
    name: 'SerieInfos',
    data() {
        return {
            comics: [],
            events: [],
            stories: []
        }
    },
    created() {
        this.serieService = new SerieService();
    },
    mounted() {
        this.fetchSerieComics(this.$route.params.id);
        this.fetchSerieEvents(this.$route.params.id);
        this.fetchSerieStories(this.$route.params.id);
    },
    methods: {
        async fetchSerieComics(id) {
            await this.serieService.fetchSerieComics(id).then(data => this.comics = data.results)
        },
        async fetchSerieEvents(id) {
            await this.serieService.fetchSerieEvents(id).then(data => this.events = data.results)
        },
        async fetchSerieStories(id) {
            await this.serieService.fetchSerieStories(id).then(data => this.stories = data.results)
        },
        async goToComicDetails(id) {
            this.$router.push(`/comic/${id}`)
        },
        async goToEventDetails(id) {
            this.$router.push(`/event/${id}`)
        },
        async goToStoryDetails(id) {
            this.$router.push(`/story/${id}`)
        }
    }
}
</script>
