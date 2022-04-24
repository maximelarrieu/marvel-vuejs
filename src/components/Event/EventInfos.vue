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
        <h5>Series</h5>
        <ul class="list-group" v-if="series.length > 0">
            <li class="list-group-item" v-for="serie in series" :key="serie.id" @click="goToSerieDetails(serie.id)">
                {{ serie.title }}
            </li>
        </ul>
        <p v-if="series.length === 0">
            no series
        </p>
        <h5>Stories</h5>
        <ul class="list-group" v-if="stories.length > 0">
            <li class="list-group-item" v-for="story in stories" :key="story.id" @click="goToStoryDetails(story.id)">
                {{ story.title }}
            </li>
        </ul>
        <p v-else-if="stories.length === 0">
            no stories
        </p>
    </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
    name: 'EventInfos',
    data() {
        return {
            comics: [],
            series: [],
            stories: []
        }
    },
    created() {
        this.eventService = new EventService();
    },
    mounted() {
        this.fetchEventComics(this.$route.params.id);
        this.fetchEventSeries(this.$route.params.id);
        this.fetchEventStories(this.$route.params.id);
    },
    methods: {
        async fetchEventComics(id) {
            await this.eventService.fetchEventComics(id).then(data => this.comics = data.results)
        },
        async fetchEventSeries(id) {
            await this.eventService.fetchEventSeries(id).then(data => this.series = data.results)
        },
        async fetchEventStories(id) {
            await this.eventService.fetchEventStories(id).then(data => this.stories = data.results)
        },
        async goToComicDetails(id) {
            this.$router.push(`/comic/${id}`)
        },
        async goToSerieDetails(id) {
            this.$router.push(`/serie/${id}`)
        },
        async goToStoryDetails(id) {
            this.$router.push(`/story/${id}`)
        }
    }
}
</script>
