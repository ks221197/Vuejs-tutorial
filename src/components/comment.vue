<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="1">
            <v-avatar>
              <v-img
                class="elevation-6"
                :alt="comments.name"
                :src="`http://localhost:3000/` + comments.avatar"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col md="12" class="title-color"
                ><strong> {{ comments.name }}</strong></v-col
              ></v-row
            >
            <v-row no-gutters>
              <v-col md="12">{{ comments.comment }}</v-col></v-row
            >
            <v-row class="node-actions" no-gutters>
              <v-col md="2">{{ comments.createdAt }}</v-col>
              <v-col md="1" align="center">
                <v-icon
                  @click="addLike(comments.commentId)"
                  v-if="!comments.liked"
                  disabled
                  >mdi-heart</v-icon
                >
                <v-icon
                  @click="addLike(comments.commentId)"
                  color="red"
                  v-if="comments.liked"
                  >mdi-heart</v-icon
                >
                <!-- <v-btn
                  class="comment-btn"
                  @click="addLike(comments.commentId)"
                  plain
                  >Like</v-btn> -->
              </v-col>
              <v-col md="1"
                ><v-btn
                  class="comment-btn"
                  @click="reply($event, comments.commentId)"
                  plain
                  >Reply</v-btn
                ></v-col
              >

              <v-col md="3" v-if="comments.children.length > 0"
                ><v-btn class="root-node comment-btn" @click="toggle" plain
                  >View Replies({{ comments.children.length }})</v-btn
                ></v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <li>
      <v-flex style="display: none" :id="`replyDiv` + comments.commentId">
        <v-text-field
          v-model="replyForm.comments[comments.commentId]"
          label="Comment"
        ></v-text-field>
        <v-btn
          @click="addComment(comments.commentId)"
          :ref="`comment-btn` + [comments.commentId]"
          :id="`comment-btn` + [comments.commentId]"
          :disabled="
            replyForm.comments[comments.commentId]
              ? replyForm.comments[comments.commentId].length > 0
                ? false
                : true
              : true
          "
          >comment</v-btn
        >
      </v-flex>

      <ul v-show="toggleDown" v-if="isRoot">
        <comment
          v-for="comments in comments.children"
          :key="comments.commentId"
          :comments="comments"
          :postId="postId"
        >
        </comment>
      </ul>
    </li>
  </v-container>
</template>

<script>
import commentService from "../services/commentService";
import { bus } from "../main";

export default {
  name: "comment",
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
    addLike: function () {
      console.log("here");
    },
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
  position: relative;
}
.node-actions {
  font-size: 12px !important;
  color: #676464;
}
.comment-btn {
  padding: 0px !important;
  color: #676464 !important;
  font-size: 12px !important;
  /* align-items: baseline !important; */
  height: 0px !important;
}
</style>
