<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <v-row>
          <v-col md="12">
            <div class="headline mt-3 font-weight-bold title-color">
              {{ postData.title }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
            <p class="subheading mt-3">
              {{ postData.description }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
            <h3 class="mt-3 font-weight-bold title-color">Comment</h3>

            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form>
                <ValidationProvider
                  name="comment"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="RequestPayload.comment"
                    :error-messages="errors[0]"
                    @click="isValid = false"
                  ></v-text-field>
                </ValidationProvider>

                <v-btn
                  class="mr-4"
                  @click="addComment(0)"
                  :disabled="invalid || isValid"
                >
                  post
                </v-btn>
              </form>
            </ValidationObserver>
          </v-col>
        </v-row>

        <v-row v-if="comments.length > 0">
          <v-col md="12">
            <div v-for="comment in comments" :key="comment.commentId">
              <comment :comments="comment" :postId="id" />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postService from "../../services/postService";
import commentService from "../../services/commentService";
import Comment from "../../components/comment.vue";
import { bus } from "../../main";

export default {
  components: { Comment },
  data: (context) => ({
    postData: [],
    comments: [],
    id: context.$route.params.id.toString(),
    RequestPayload: { comment: "" },
    isValid: false,
  }),

  created() {
    bus.$on("changeIt", (postId) => {
      this.getComment(postId);
    });
  },

  watch: {
    postData(data) {
      this.postData = data;
    },
    comments(data) {
      this.comments = data;
    },
  },

  mounted() {
    this.getPost(this.id);
    this.getComment(this.id);
  },

  methods: {
    async getPost(id) {
      await postService
        .getById(id)
        .then(async (response) => {
          if (response.data) {
            this.postData = response.data[0];
          }
          if (response.error) {
            console.log(response);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async getComment(postId) {
      await commentService
        .get(postId)
        .then(async (response) => {
          if (response.data) {
            this.comments = response.data;
          }
          if (response.error) {
            console.log(response);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async addComment(parentId) {
      console.log(parentId);
      const isValid = await this.$refs.form.validate();
      if (isValid) {
        const data = {
          comment: this.RequestPayload.comment,
          parentId: parentId,
          postId: this.id,
        };
        await commentService
          .create(data)
          .then(async (response) => {
            if (response.data) {
              await this.getComment(this.id);
            }
            if (response.error) {
              console.log(response);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    //no using
    async prepareTree(comments, container) {
      console.log(container);
      console.log(document.getElementById("comment"));

      for (let i = 0; i < comments.length; i++) {
        var li = document.createElement("li");
        li.innerHTML =
          comments[i].comment +
          " parentId: " +
          comments[i].parentId +
          " commentId: " +
          comments[i].commentId;
        if (comments[i].child.length > 0) {
          var ul = document.createElement("ul");
          li.appendChild(ul);
          this.prepareTree(comments[i].child, ul);
        }
        container.appendChild(li);
      }
    },

    async reply(event, commentId) {
      console.log(event.currentTarget.id);
      console.log(document.getElementById(`replyDiv` + commentId));
      document.getElementById(`replyDiv` + commentId).style.display = "block";
      console.log(this.replyForm.comments[commentId]);
    },

    async insert(commentId) {
      console.log(this.replyForm.comments[commentId]);

      const data = {
        comment: this.replyForm.comments[commentId],
        parentId: commentId,
        postId: this.id,
      };
      await commentService
        .create(data)
        .then(async (response) => {
          if (response.data) {
            await this.getComment(this.id);
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

<style >
.title-color {
  color: #1c8282;
}
</style>


