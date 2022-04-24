<template>
    <div class="container mb-5">
        <h3>EVENT</h3>
        <img :src="eventImage" alt="event" class="mb-4">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <EventCharaters />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
                <EventInfos />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <EventCreators />
            </div>
        </div>
    </div>
</template>

<script>
import EventService from '@/services/EventService'
import EventCharaters from '@/components/Event/EventCharaters.vue';
import EventCreators from '@/components/Event/EventCreators.vue';
import EventInfos from '@/components/Event/EventInfos.vue';

export default {
    name: 'EventDetails',
    components: {
        EventCharaters,
        EventCreators,
        EventInfos
    },
    data() {
        return {
            event: {},
            eventImage: ''
        }
    },
    created() {
        this.eventService = new EventService();
    },
    mounted() {
        this.fetchOneEvent(this.$route.params.id);
    },
    methods: {
        async fetchOneEvent(id) {
            await this.eventService.fetchOne(id).then(data => 
                this.event = data.results[0]
            ).then(event => {
                this.eventImage = `${event.thumbnail.path}.${event.thumbnail.extension}`
            })
        }
    }
}
</script>

<style scoped>

img {
    width: 300px;
    height: 300px;
}

</style>
