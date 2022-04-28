<template>
    <div>
        <h4 class="text-left">Créateurs</h4>
        <div v-if="creators.length > 0" class="creators text-left">
        <span
            v-for="creator in creators"
            :key="creator.id"
            @click="goToComicCreator(creator.id)"
        >
            <span class="creator badge badge-pill badge-secondary">{{
            creator.fullName
            }}</span>
        </span>
        </div>
        <p v-else-if="creators.length === 0">Pas de créateurs</p>
    </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
    name: 'EventCreators',
    data() {
        return {
            creators: [],
        }
    },
    created() {
        this.eventService = new EventService();
    },
    mounted() {
        this.fetchEventCreators(this.$route.params.id);
    },
    methods: {
        async fetchEventCreators(id) {
            await this.eventService.fetchEventCreators(id).then(data => this.creators = data.results)
        },
        async goToCreatorDetails(id) {
            this.$router.push(`/creator/${id}`);
        }
    }
}
</script>
