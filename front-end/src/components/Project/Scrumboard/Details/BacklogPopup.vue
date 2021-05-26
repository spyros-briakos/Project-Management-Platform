<template>
  <details class="popupp" ref="details1" v-on:toggle="popupToggled1()">
    <summary>
      <slot name="handle1"></slot>
    </summary>
    <div>
      <slot name="content1">Put your contents here</slot>
    </div>
  </details>
</template>

<script>
export default {
  methods: {
    open() {
      this.$refs.details1.setAttribute("open", "")
    },
    close() {
      this.$refs.details1.removeAttribute("open")
    },
    popupToggled1() {
      const isOpen = this.$refs.details1.getAttribute("open") !== null ? true : false
      this.$emit("popup-toggled1", isOpen)
    }   
  }
}
</script>

<style scope>
/* Experimental : Details implementation */
details.popupp summary {
  outline: none;
  cursor: pointer;
  display: inline-block;
}

details.popupp summary::-webkit-details-marker {
  display: none;
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

details.popupp div {
  position: fixed;
  top: 50%;
  left: 50%;
  animation: fadein 200ms ease-in-out;
  transform: translate(-50%, -50%);
  max-height: calc(100vh - 80px);
  max-width: 600px;
  width: calc(100% - 80px);
  height: 200px;
  overflow-y: auto;
  z-index: 999;
  color: #000;
  background-color: #fff;
  padding: 20px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

details[open].popupp summary:before {
  position: fixed;
  top:-90px;
  right: -20px;
  bottom: -750px;
  left: -70px;
  max-height: 2000px;
  max-width: 900%;
  animation: fadein 200ms ease-in-out;
  cursor: default;
  content: "";
  z-index: 99;
  background: rgba(27, 31, 35, 0.5);
}
</style>
