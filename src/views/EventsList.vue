<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Search an event"
    />
    <h2>Events list</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToEventDetail(event.id)">
              Show détails
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      :page-count="this.nbPages"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<script>
import EventService from "../services/EventService";
import Paginate from "vuejs-paginate-next";

export default {
  name: "CharactersList",
  components: {
    paginate: Paginate,
  },
  data() {
    return {
      limit: 20,
      events: [],
      totalEvents: 0,
      nbPages: 0,
    };
  },
  created() {
    this.eventService = new EventService();
  },
  mounted() {
    this.fetchAllEvents(0);
  },
  methods: {
    async fetchAllEvents(offset) {
      await this.eventService
        .fetchAllForPaginate(offset === 1 ? 0 : offset)
        .then((data) => {
          this.events = data.results;
          this.totalEvents = data.total;
          this.nbPages = Math.floor(data.total / this.limit);
        });
    },
    async goToEventDetail(id) {
      this.$router.push(`/event/${id}`);
    },
    clickCallback(pageNum) {
      this.fetchAllEvents((pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.events.length;
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
