<template>
    <div>
        <h4 class="text-left">Personnages</h4>
        <div v-if="characters.length > 0" class="characters text-left">
        <span
            v-for="character in characters"
            :key="character.id"
            @click="goToCharacterDetails(character.id)"
        >
            <span class="badge badge-pill badge-info character">{{
            character.name
            }}</span>
        </span>
        </div>
        <p v-else class="text-left">Pas de personnages</p>
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
