<template>
  <v-container grid-list-md text-md-center fluid fill-height>
    <v-row justify="space-around">
      <v-col md="10">
        <v-row style="padding-top: 17px" justify="space-between">
          <v-col class="text-left" style="color: #1c8282">
            <h1>Posts</h1>
          </v-col>
          <v-col class="text-right">
            <v-btn to="/post/create">New Post</v-btn>
          </v-col></v-row
        >

        <v-row justify="space-around">
          <v-col>
            <v-row dense>
              <v-col
                v-for="item in items"
                :key="item.postId"
                cols="4"
                style="padding-top: 20px"
              >
                <v-card class="mx-auto">
                  <v-img
                    class="white--text align-end"
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                  >
                  </v-img>
                  <v-card-title> {{ item.title }} </v-card-title>

                  <v-card-text class="text--primary">
                    <div>{{ item.description.slice(0, 100) }}...</div>
                  </v-card-text>
                  <v-card-subtitle> {{ item.createdAt }} </v-card-subtitle>
                  <v-btn
                    text
                    color="deep-purple accent-4"
                    :to="{ name: 'detail', params: { id: item.postId } }"
                  >
                    Read
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postService from "../../services/postService";

export default {
  components: {},
  data: () => ({
    items: [],
  }),
  watch: {
    items(data) {
      this.items = data;
    },
  },
  mounted() {
    this.getPostList();
  },
  methods: {
    async getPostList() {
      await postService
        .get()
        .then(async (response) => {
          if (response.data) {
            this.items = response.data;
          }
          if (response.error) {
            console.log(response);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>


