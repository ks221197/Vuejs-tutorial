<template>
  <div>
    <div v-for="c in comment" :key="c.commentId">
      <!-- <comment-view :comments="comment" /> -->
      <tree :comments="c" :postId="id"/>
    </div>
  </div>
</template>

<script>
import commentService from "../../services/commentService";
// import CommentView from "../../components/comment";
import tree from "../../components/treeV1.vue";
import { bus } from "../../main";

export default {
  components: {
    // CommentView,
    tree,
  },
  data: (context) => ({
    comment: [],
    id: context.$route.params.id,
  }),

  created() {
    bus.$on("changeIt", (postId) => {
      this.getComment(postId);
    });
  },

  computed: {},

  watch: {
    comment(data) {
      this.comment = data;
    },
  },
  mounted() {
    this.getComment(this.id);
  },

  methods: {
    async getComment(postId) {
      await commentService
        .get(postId)
        .then(async (response) => {
          if (response.data) {
            this.comment = response.data;
            // if (this.comment.length > 0) {
            // }
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


