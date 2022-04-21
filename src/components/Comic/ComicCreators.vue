<template>
    <div>
        <h4>Auteurs</h4>
        <ul>
            <li v-for="creator in creators" :key="creator.id">
                {{ creator.fullName }}
            </li>
        </ul>
    </div>
</template>

<script>
import ComicService from "@/services/ComicService";

export default {
    name: 'ComicCreators',
    props: {
        id: Number,
    },
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
        this.fetchComicCreators(this.id);
    },
    methods: {
        async fetchComicCreators(id) {
            await this.comicService.fetchComicCreators(id).then(data => this.creators = data.results)
        }
    }
}
</script>
