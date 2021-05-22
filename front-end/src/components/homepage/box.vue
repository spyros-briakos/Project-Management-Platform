<template>
  <div
    class="box"
    :class="{ master_center: center }"
    :style="{ 'background-color': green ? '#56BA9D' : 'transparent' }"
  >
    <div
      class="text_box_flex"
      :style="{
        'max-width': text_width ? text_width : '50%',
        margin: right ? '0 0 0 auto' : left ? '0 auto 0 0' : '',
        extra,
      }"
    >
      <div class="mytitle" v-if="B_title.length" >{{ B_title }}</div>
      <div class="subtitle" v-if="B_subtitle.length > 0"
        :style="{
          'color': green ? '' : '#418B75',
        }"
      >
        {{ B_subtitle }}
      </div>
      <div class="comment" v-if="B_comment.length"
        :style="{
        }"
        
        >{{ B_comment }}</div>
    </div>
    <img
      v-if="img"
      :src="require('../../assets/img/' + img + '')"
      :alt="{ alt: alt ? alt : '' }"
      :style="{ order: left ? 2 : right ? -1 : '',
                width: img_width ? img_width : '30%',
                height: img_height ? img_height : '40%',
                }"
    />
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    text_width: String,
    B_title: String,
    B_subtitle: String,
    B_comment: String,
    left: Boolean,
    right: Boolean,
    center: Boolean,
    green: Boolean,
    img: String,
    alt: String,
    img_width: String,
    img_height: String,
    extra: String,
  },
};
</script>

<style scoped>
@import url(../../assets/css/homepage.css);
</style>
