<template>
  <div id="app">
    <div class="comments-outside">
      <div class="comments-header">
        <div class="comments-stats">
          <span><i class="fa fa-thumbs-up"></i> {{ likes }}</span>
          <span><i class="fa fa-comment"></i> {{ comments.length }}</span>
        </div>
        <div class="post-owner">
          <div class="avatar">
            <img :src="creator.avatar" alt="" />
          </div>
          <div class="username">
            <a href="#">@{{ creator.user }}</a>
          </div>
        </div>
      </div>
      <comments
        :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
        :comments="comments"
        :current_user="current_user"
        @submit-comment="submitComment"
      ></comments>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Comments from "./UserReport.vue";

export default {
  name: "app",
  components: {
    Comments,
  },
  data() {
    return {
      likes: 15,
      creator: {
        avatar: "http://via.placeholder.com/100x100/a74848",
        user: "tsotsosCreator",
      },
      current_user: {
        avatar: "http://via.placeholder.com/100x100/a74848",
        user: "alexaapo",
      },
      comments: [
        {
          id: 1,
          user: "spympr",
          avatar: "http://via.placeholder.com/100x100/a74848",
          text: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",

        },
        {
          id: 2,
          user: "meropy",
          avatar: "http://via.placeholder.com/100x100/2d58a7",
          text: "lorem ipsum dolor",
        },
        {
          id: 3,
          user: "antrikos",
          avatar: "http://via.placeholder.com/100x100/36846e",
          text: "lorem ipsum dolor again",
        },
      ],
    };
  },
  methods: {
    submitComment: function (reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
        text: reply,
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* padding-left: 50px; */
  /* padding-top: 50px; */
}
a {
  text-decoration: none;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ececec;
  margin: 1em 0;
  padding: 0;
}
.comments-outside {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 100px 50px 10px 500px;
  max-width: 700px;
  /* padding-top: 100px; */
}
.comments-header {
  background-color: #c8c8c8;
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #333;
  min-height: 80px;
  font-size: 20px;
}
.comments-header .comments-stats span {
  margin-left: 10px;
}
.post-owner {
  display: flex;
  align-items: center;
}
.post-owner .avatar > img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.post-owner .username {
  margin-left: 5px;
}
.post-owner .username > a {
  color: #333;
}
</style>
