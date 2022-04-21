<template>
    <div>
        <h4>Series</h4>
        <ul class="list-group" v-if="series.length > 0">
            <li class="list-group-item" v-for="serie in series" :key="serie.id" @click="goToCreatorSerie(serie.id)">
                {{ serie.title }}
            </li>
        </ul>
        <p v-else-if="series.length === 0">
            pas de series
        </p>
    </div>
</template>

<script>
import CreatorService from "@/services/CreatorService";

export default {
    name: 'CreatorSeries',
    data() {
        return {
            series: [],
        }
    },
    created() {
        this.creatorService = new CreatorService();
    },
    mounted() {
        this.fetchCreatorSeries(this.$route.params.id);
    },
    methods: {
        async fetchCreatorSeries(id) {
            await this.creatorService.fetchCreatorSeries(id).then(data => this.series = data.results)
        },
        async goToCreatorSerie(id) {
            this.$router.push(`/serie/${id}`)
        }
    }
}
</script>
