<template>
  <div>
    <div></div>
    <div>
      <li>
        <div @click="toggle" class="root-node">
          <span v-if="isRoot">
            <v-icon v-if="toggleDown">mdi-chevron-down</v-icon>
            <v-icon v-else>mdi-chevron-right</v-icon></span
          >
          {{ comments.comment }}
        </div>
        <v-row class="node-actions">
          <v-col cols="2">{{ comments.createdAt }}</v-col>
          <v-col cols="1"
            ><v-btn
              class="comment-btn"
              @click="addLike(comments.commentId)"
              plain
              >Like</v-btn
            ></v-col
          >
          <v-col cols="1"
            ><v-btn
              class="comment-btn"
              @click="reply($event, comments.commentId)"
              plain
              >Reply</v-btn
            ></v-col
          >
          <v-col cols="8" />
        </v-row>

        <div style="display: none" :id="`replyDiv` + comments.commentId">
          <v-text-field
            v-model="replyForm.comments[comments.commentId]"
            label="Comment"
          ></v-text-field>
          <v-btn @click="addComment(comments.commentId)">comment</v-btn>
        </div>

        <ul v-show="toggleDown" v-if="isRoot">
          <tree
            v-for="comments in comments.children"
            :key="comments.commentId"
            :comments="comments"
            :postId="postId"
          >
          </tree>
        </ul>
      </li>
    </div>
  </div>
</template>

<script>
import commentService from "../services/commentService";
import { bus } from "../main";

export default {
  name: "Tree",
  props: {
    comments: Object,
    postId: String,
  },
  data: function () {
    return {
      toggleDown: false,
      replyForm: {
        comments: [],
      },
    };
  },
  watch: {
    comments(data) {
      this.comments = data;
    },
  },
  computed: {
    isRoot: function () {
      return this.comments.children && this.comments.children.length;
    },
  },
  methods: {
    toggle: function () {
      if (this.isRoot) {
        this.toggleDown = !this.toggleDown;
      }
    },
    addLike: function () {},
    addComment: async function (commentId) {
      const data = {
        comment: this.replyForm.comments[commentId],
        parentId: commentId,
        postId: this.postId,
      };
      await commentService
        .create(data)
        .then(async (response) => {
          if (response.data) {
            document.getElementById(`replyDiv` + commentId).style.display =
              "none";
            bus.$emit("changeIt", this.postId);
            this.toggleDown = true;
          }
          if (response.error) {
            console.log(response);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async reply(event, commentId) {
      document.getElementById(`replyDiv` + commentId).style.display = "block";
    },
  },
};
</script>

<style  scoped>
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: none;
}
li {
  list-style-type: none;
}
.root-node {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding-left: 8px;
  padding-right: 8px;
  position: relative;
}
.node-actions {
  font-size: 12px;
  color: grey;
}
.comment-btn {
  padding: 0px !important;
  color: grey !important;
  font-size: 12px !important;
  align-items: baseline !important;
}
</style>
