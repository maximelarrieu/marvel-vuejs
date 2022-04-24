<template>
    <div>
        <h4>Characters</h4>
        <ul class="list-group" v-if="characters.length > 0">
            <li class="list-group-item" v-for="character in characters" :key="character.id" @click="goToCharacterDetails(character.id)">
                {{ character.name }}
            </li>
        </ul>
        <p v-if="characters.length === 0">
            pas de personnages
        </p>
    </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
    name: 'EventCharacters',
    data() {
        return {
            characters: []
        }
    },
    created() {
        this.eventService = new EventService();
    },
    mounted() {
        this.fetchEventCharacters(this.$route.params.id);
    },
    methods: {
        async fetchEventCharacters(id) {
            await this.eventService.fetchEventCharacters(id).then(data => this.characters = data.results)
        },
        async goToCharacterDetails(id) {
            this.$router.push(`/character/${id}`)
        }
    }
}
</script>
