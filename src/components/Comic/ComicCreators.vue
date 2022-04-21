<template>
    <div>
        <h4>Auteurs</h4>
        <ul v-if="creators.length > 0">
            <li v-for="creator in creators" :key="creator.id">
                {{ creator.fullName }}
            </li>
        </ul>
        <p v-else-if="creators.length === 0">
            pas de créateurs
        </p>
    </div>
</template>

<script>
import ComicService from "@/services/ComicService";

export default {
    name: 'ComicCreators',
    data() {
        return {
            creators: [],
            comicProp: this.comic 
        }
    },
    created() {
        this.comicService = new ComicService();
    },
    mounted() {
        this.fetchComicCreators(this.$route.params.id);
    },
    methods: {
        async fetchComicCreators(id) {
            await this.comicService.fetchComicCreators(id).then(data => this.creators = data.results)
        }
    }
}
</script>
