<template>
  <div id="app" :class="[{'collapsed' : collapsed}]"> 
    <!-- <router-view/> -->
    <!-- :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]" -->
    <div class="demo">
      <sidebar-menu
        :menu="menu"
        :collapsed="collapsed"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />
      <!-- v-if="isOnMobile && !collapsed" -->
      <div
        v-if="!collapsed"
        class="sidebar-overlay"
        @click="collapsed = true"
      />
    </div>
      <!--these two lines for roadmap and burndown -->
      <!-- <div id="app"><chart></chart></div> -->
      <!-- <div id="app"><chart></chart></div> -->
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "demo",
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Όνομα Project",
          hiddenOnCollapse: true,
        },
        {
          href: "/projects/boards/d033c156-5972-4767-ceb0-8a91a5c282db",
          title: "Πίνακας Scrum",
          icon: "fa fa-layer-group",
        },
        {
          href: "/projects/roadmap",
          title: "Roadmap",
          icon: "fa fa-map",
        },
        {
          href: "/projects/kanban",
          title: "Πίνακας Kanban",
          icon: "fa fa-clipboard-list",
        },
        {
          href: "/projects/chart",
          title: "Διάγραμμα Burndown",
          icon: "fa fa-chart-bar",
        },
        {
          href: "/projects/comments",
          title: "Αναφορές Μελών",
          icon: "fa fa-comments",
        },
        {
          href: "/projects/history",
          title: "Ιστορικό",
          icon: "fa fa-history",
        },
      ],
      collapsed: true,
      // themes: [
      //   {
      //     name: 'Default theme',
      //     input: ''
      //   },
      //   {
      //     name: 'White theme',
      //     input: 'white-theme'
      //   }
      // ],
      selectedTheme: "white-theme",
      isOnMobile: false,
    };
  },
  mounted() {
    // this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
    onItemClick(event, item, node) {
      console.log("onItemClick");
      console.log(event);
      console.log(item);
      console.log(node);
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true;
        this.collapsed = true;
      } else {
        this.isOnMobile = false;
        this.collapsed = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600");

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
  display: flex;
}
.demo {
  // padding: 50px;
  display: flex;
  // margin-left: 500px;
}
.container {
  max-width: 900px;
  // display: flex;
}
pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
// .app {
//   width: 100%;
//   min-width: 310px;
//   height: 400px;
//   margin: 0 auto;
// }
// #app {
  // padding-left: 350px ;
// }
// #app.collapsed {
  // padding-left: 50px;
// }
</style>
