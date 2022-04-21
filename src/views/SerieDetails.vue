<template>
    <div class="container mb-5">
        serie details
        <h2>{{ serie.title }}</h2>
        <p>{{ serie.description }}</p>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <SerieCharacters />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
                <SerieInfos />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <SerieCreators />
            </div>
        </div>
    </div>
</template>

<script>
import SerieService from '@/services/SerieService'
import SerieCharacters from '@/components/Serie/SerieCharacters.vue';
import SerieCreators from '@/components/Serie/SerieCreators.vue';
import SerieInfos from '@/components/Serie/SerieInfos.vue';

export default {
    name: 'SerieDetails',
    components: {
        SerieCharacters,
        SerieCreators,
        SerieInfos
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
