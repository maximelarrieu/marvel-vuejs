<template>
    <div class="container">
        comics details
        <h2>{{ comic.title }}</h2>
        <p>{{ comic.description }}</p>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <ComicCharaters />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
                <ComicInfos />          
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <ComicCreators />
            </div>
        </div>
    </div>
</template>

<script>
import ComicService from '../services/ComicService'
import ComicCharaters from '@/components/Comic/ComicCharaters.vue';
import ComicCreators from '@/components/Comic/ComicCreators.vue';
import ComicInfos from '@/components/Comic/ComicInfos.vue';

export default {
    name: 'ComicDetails',
    components: {
        ComicCharaters,
        ComicCreators,
        ComicInfos
    },
    props: {
        id: Number
    },
    data() {
        return {
            comic: {}
        }
    },
    created() {
        this.comicService = new ComicService();
    },
    mounted() {
        this.fetchOneComic(this.$route.params.id);
    },
    methods: {
        async fetchOneComic(id) {
            await this.comicService.fetchOne(id).then(data => this.comic = data.results[0])
        }
    }
}
</script>
