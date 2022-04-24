<template>
    <div>
        <h4>Creators</h4>
        <ul class="list-group" v-if="creators.length > 0">
            <li class="list-group-item" v-for="creator in creators" :key="creator.id" @click="goToCreatorDetails(creator.id)">
                {{ creator.fullName }}
            </li>
        </ul>
        <p v-if="creators.length === 0">
            pas de creators
        </p>
    </div>
</template>

<script>
import StoryService from "@/services/StoryService";

export default {
    name: 'StoryCreators',
    data() {
        return {
            creators: []
        }
    },
    created() {
        this.storyService = new StoryService();
    },
    mounted() {
        this.fetchStoryCreators(this.$route.params.id);
    },
    methods: {
        async fetchStoryCreators(id) {
            await this.storyService.fetchStoryCreators(id).then(data => this.creators = data.results)
        },
        async goToCreatorDetails(id) {
            this.$router.push(`/creator/${id}`)
        }
    }
}
</script>
