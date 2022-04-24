<template>
    <div class="container mb-5">
        <h3>STORY</h3>
        <!-- <img :src="storyImage" alt="story" class="mb-4"> -->
        <h2>{{ story.title }}</h2>
        <p>{{ story.description }}</p>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <StoryCharacters />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
                <StoryInfos />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <StoryCreators />
            </div>
        </div>
    </div>
</template>

<script>
import StoryService from '@/services/StoryService'
import StoryCharacters from '@/components/Story/StoryCharacters.vue';
import StoryCreators from '@/components/Story/StoryCreators.vue';
import StoryInfos from '@/components/Story/StoryInfos.vue';

export default {
    name: 'StoryDetails',
    components: {
        StoryCharacters,
        StoryCreators,
        StoryInfos
    },
    data() {
        return {
            story: {},
            storyImage: ''
        }
    },
    created() {
        this.storyService = new StoryService();
    },
    mounted() {
        this.fetchOneStory(this.$route.params.id);
    },
    methods: {
        async fetchOneStory(id) {
            await this.storyService.fetchOne(id).then(data => 
                this.story = data.results[0]
            ).then(story => {
                this.storyImage = `${story.thumbnail.path}.${story.thumbnail.extension}`
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
