<template>
    <div>
        <h4 class="text-left">Créateurs</h4>
        <div v-if="creators.length > 0" class="creators text-left">
        <span
            v-for="creator in creators"
            :key="creator.id"
            @click="goToCreatorDetails(creator.id)"
        >
            <span class="creator badge badge-pill badge-primary">{{
            creator.fullName
            }}</span>
        </span>
        </div>
        <p v-else-if="creators.length === 0">Pas de créateurs</p>
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
            this.$router.push(`/creators/${id}`)
        }
    }
}
</script>
