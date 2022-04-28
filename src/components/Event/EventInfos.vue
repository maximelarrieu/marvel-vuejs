<template>
    <div>
        <h4>Infos</h4>
        <h5 class="text-left">Comics</h5>
        <div v-if="comics.length > 0" class="comics text-left">
            <span
                v-for="comic in comics"
                :key="comic.id"
                @click="goToComicDetails(comic.id)"
            >
                <span class="comic badge badge-pill badge-primary">{{
                    comic.title
                }}</span>
            </span>
        </div>
        <p v-else class="text-left">Pas de comics</p>
        <h5 class="text-left">Series</h5>
        <div v-if="series.length > 0" class="series text-left">
            <span
                v-for="serie in series"
                :key="serie.id"
                @click="goToSerieDetails(serie.id)"
            >
                <span class="serie badge badge-pill badge-warning">{{
                    serie.title
                }}</span>
            </span>
        </div>
        <p v-else class="text-left">Pas de series</p>
        <h5 class="text-left">Stories</h5>
        <div v-if="stories.length > 0" class="stories text-left">
            <span
                v-for="story in stories"
                :key="story.id"
                @click="goToSerieDetails(story.id)"
            >
                <span class="story badge badge-pill badge-danger">{{
                    story.title
                }}</span>
            </span>
        </div>
        <p v-else class="text-left">Pas de stories</p>
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
            this.$router.push(`/comics/${id}`)
        },
        async goToSerieDetails(id) {
            this.$router.push(`/series/${id}`)
        },
        async goToStoryDetails(id) {
            this.$router.push(`/stories/${id}`)
        }
    }
}
</script>
