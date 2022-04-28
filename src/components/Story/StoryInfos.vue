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
        <h5>Events</h5>
        <div class="events">
          <div v-if="events.length > 0">
            <span v-for="event in events" :key="event.id">
              <span class="event badge badge-pill badge-warning" @click="goToPage(`/events/${event.id}`)">{{
                event.title
              }}</span>
            </span>
          </div>
          <p v-else-if="events.length === 0">Pas d'events</p>
        </div>
        <h5>Series</h5>
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
            this.$router.push(`/comics/${id}`)
        },
        async goToEventDetails(id) {
            this.$router.push(`/events/${id}`)
        },
        async goToSerieDetails(id) {
            this.$router.push(`/series/${id}`)
        }
    }
}
</script>
