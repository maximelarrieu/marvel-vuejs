<template>
    <div class="container mb-5">
        <h3>CREATOR</h3>
        <img :src="creatorImage" alt="creator" />
        <h2>{{ creator.fullName }}</h2>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <CreatorComics />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
                <!-- <SerieInfos /> -->
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <CreatorSeries />
            </div>
        </div>
    </div>
</template>

<script>
import CreatorService from '@/services/CreatorService'
import CreatorComics from '@/components/Creator/CreatorComics.vue';
import CreatorSeries from '@/components/Creator/CreatorSeries.vue';
// import SerieInfos from '@/components/Serie/SerieInfos.vue';

export default {
    name: 'CreatorDetails',
    components: {
        CreatorComics,
        CreatorSeries
        // SerieInfos
    },
    data() {
        return {
            creator: {},
            creatorImage: ''
        }
    },
    created() {
        this.creatorService = new CreatorService();
    },
    mounted() {
        this.fetchOneCreator(this.$route.params.id);
    },
    methods: {
        async fetchOneCreator(id) {
            await this.creatorService.fetchOne(id).then(data => 
                this.creator = data.results[0]
            ).then(creator => {
                this.creatorImage = `${creator.thumbnail.path}.${creator.thumbnail.extension}`
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
