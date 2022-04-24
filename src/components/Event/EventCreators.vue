<template>
    <div>
        <h4>Creators</h4>
        <ul class="list-group" v-if="creators.length > 0">
            <li class="list-group-item" v-for="creator in creators" :key="creator.id" @click="goToCreatorDetails(creator.id)">
                {{ creator.fullName }}
            </li>
        </ul>
        <p v-else-if="creators.length === 0">
            no creators
        </p>
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
