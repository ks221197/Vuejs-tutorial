<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <v-row>
          <v-col md="1">
            <v-avatar>
              <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-row>Evan You</v-row>
            <v-row>dfgdggd</v-row>
            <v-row>dfgd dfgd dfgdf</v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12"> </v-col>
        </v-row>
      </v-col>
    </v-row>
    <li>
      <!-- <v-flex @click="toggle" class="root-node">
          <span v-if="isRoot">
            <v-icon v-if="toggleDown">mdi-chevron-down</v-icon>
            <v-icon v-else>mdi-chevron-right</v-icon></span
          >
          {{ comments.comment }}
        </v-flex> -->
      <v-flex row>
        <v-flex column sm2 md1 class="pa-1">
          <v-avatar size="36px">
            <img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            />
          </v-avatar>
        </v-flex>
        <v-flex column sm5 md3 class="pa-1">
          <strong>John Leider</strong>
        </v-flex>
      </v-flex>
      <v-row class="node-actions">
        <v-col cols="2">{{ comments.createdAt }}</v-col>
        <v-col cols="1"
          ><v-btn class="comment-btn" @click="addLike(comments.commentId)" plain
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

      <v-flex style="display: none" :id="`replyDiv` + comments.commentId">
        <v-text-field
          v-model="replyForm.comments[comments.commentId]"
          label="Comment"
        ></v-text-field>
        <v-btn @click="addComment(comments.commentId)">comment</v-btn>
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
