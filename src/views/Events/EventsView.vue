<template>
  <div class="container">
    <input
      type="text"
      @input="fetchAllEventsWithSearch(search, 0)"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search an event..."
    />
    <h2>Events list</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td><img :src="`${event.thumbnail.path}.${event.thumbnail.extension}`" /></td>
          <td>{{ event.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToEventDetail(event.id)">
              Show details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      v-if="!isLoading && this.search.length === 0"
      v-model="currentPage"
      :page-count="this.nbPages"
      :page-range="5"
      :margin-pages="5"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
    <paginate
      v-if="!isLoading && this.search.length > 0"
      v-model="currentPage"
      :page-count="this.nbPages"
      :page-range="5"
      :margin-pages="5"
      :click-handler="clickCallbackWithSearch"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import Paginate from "vuejs-paginate-next";
import LoaderComponent from "../../components/Loader/Loader.vue";

export default {
  name: "EventsView",
  components: {
    paginate: Paginate,
    loader: LoaderComponent
  },
  data() {
    return {
      currentPage: 1,
      isLoading: true,
      limit: 20,
      events: [],
      totalEvents: 0,
      nbPages: 0,
      search: ""
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
      try {
        await this.eventService
          .fetchAllForPaginate(offset === 1 ? 0 : offset)
          .then((data) => {
            this.events = data.results;
            this.totalEvents = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
        });
      } catch(error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchAllEventsWithSearch(name, offset) {
      try {
        await this.eventService
          .fetchAllForPaginateWithSearch(name, offset === 1 ? 0 : offset)
          .then((data) => {
            this.events = data.results;
            this.totalEvents = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
        });
      } catch(error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async goToEventDetail(id) {
      this.$router.push(`/events/${id}`);
    },
    clickCallback(pageNum) {
      this.isLoading = true;
      this.fetchAllEvents((pageNum - 1) * this.limit);
    },
    clickCallbackWithSearch(pageNum) {
      this.isLoading = true;
      this.fetchAllEventsWithSearch(this.search, (pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.events.length;
    }
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
img {
  width: 100px;
  height: 100px;
}
</style>
