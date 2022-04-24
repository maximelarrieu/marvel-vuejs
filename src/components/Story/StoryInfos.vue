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
            no comics
        </p>
        <h5>Events</h5>
        <ul class="list-group" v-if="events.length > 0">
            <li class="list-group-item" v-for="event in events" :key="event.id" @click="goToEventDetails(event.id)">
                {{ event.title }}
            </li>
        </ul>
        <p v-if="events.length === 0">
            no events
        </p>
        <h5>Series</h5>
        <ul class="list-group" v-if="series.length > 0">
            <li class="list-group-item" v-for="serie in series" :key="serie.id" @click="goToSerieDetails(serie.id)">
                {{ serie.title }}
            </li>
        </ul>
        <p v-else-if="series.length === 0">
            no series
        </p>
    </div>
</template>

<script>
import StoryService from "@/services/StoryService";

export default {
    name: 'StoryInfos',
    data() {
        return {
            comics: [],
            events: [],
            series: []
        }
    },
    created() {
        this.storyService = new StoryService();
    },
    mounted() {
        this.fetchStoryComics(this.$route.params.id);
        this.fetchStoryEvents(this.$route.params.id);
        this.fetchStorySeries(this.$route.params.id);
    },
    methods: {
        async fetchStoryComics(id) {
            await this.storyService.fetchStoryComics(id).then(data => this.comics = data.results)
        },
        async fetchStoryEvents(id) {
            await this.storyService.fetchStoryEvents(id).then(data => this.events = data.results)
        },
        async fetchStorySeries(id) {
            await this.storyService.fetchStorySeries(id).then(data => this.series = data.results)
        },
        async goToComicDetails(id) {
            this.$router.push(`/comic/${id}`)
        },
        async goToEventDetails(id) {
            this.$router.push(`/event/${id}`)
        },
        async goToSerieDetails(id) {
            this.$router.push(`/serie/${id}`)
        }
    }
}
</script>
