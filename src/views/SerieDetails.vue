<template>
    <div class="container">
        <h2>{{ serie.title }}</h2>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <!-- <ComicCharaters /> -->
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
                <!-- <ComicInfos />           -->
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <!-- <ComicCreators /> -->
            </div>
        </div>
    </div>
</template>

<script>
import SerieService from '@/services/SerieService'
// import ComicCharaters from '@/components/Comic/ComicCharaters.vue';
// import ComicCreators from '@/components/Comic/ComicCreators.vue';
// import ComicInfos from '@/components/Comic/ComicInfos.vue';

export default {
    name: 'SerieDetails',
    components: {
        // ComicCharaters,
        // ComicCreators,
        // ComicInfos
    },
    data() {
        return {
            serie: {}
        }
    },
    created() {
        this.serieService = new SerieService();
    },
    mounted() {
        this.fetchOneSerie(this.$route.params.id);
    },
    methods: {
        async fetchOneSerie(id) {
            await this.serieService.fetchOne(id).then(data => this.serie = data.results[0])
        }
    }
}
</script>
