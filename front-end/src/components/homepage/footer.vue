<template>
  <div class="myfooter">
    <div class="info_footer">
      <div class="info_text" v-for="item in menu" :key="item.title">
        <div class="title">{{ item.title }}</div>
        <ul>
          <li v-for="link in item.links" :key="link.name">
            <a href="link.link"> {{ link.name }} </a>
          </li>
          <li v-for="cont in item.content" :key="cont">{{ cont }}</li>
        </ul>
      </div>
    </div>
    <div class="copyright_footer">
      {{ copyright }}
    </div>
  </div>
</template>

<script>
export default {
  name: "myFooter",
  data() {
    return {
      menu: [
        {
          title: "Για εμάς",
          content: "",
          links: [
            { name: "Η εταιρία μας", link: "#" },
            { name: "Θέσεις Εργασίας", link: "#" },
          ],
        },

        {
          title: "Επικοινωνία",
          content: [
            "Γεργίου Ζωγράφου 16, Αθήνα",
            "6980112090",
            "dmpalaskas@gmail.com",
          ],
          links: "",
        },

        {
          title: "Legal",
          content: "",
          links: [
            { name: "Πολιτική Προστασίας Απορρήτου", link: "#" },
            { name: "Όροι Χρήσης", link: "#" },
          ],
        },
      ],
      copyright: "2021, ScruManiac",
    };
  },
};
</script>

<style scoped>
  @import "../../assets/css/foot_style.css";
</style>
