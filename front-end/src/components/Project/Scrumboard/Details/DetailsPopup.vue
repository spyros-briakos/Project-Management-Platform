<template>
  <details class="popup" ref="details" v-on:toggle="popupToggled()">
    <summary>
      <slot name="handle"></slot>
    </summary>
    <div>
      <slot name="content">Put your contents here</slot>
    </div>
  </details>
</template>

<script>
export default {
  methods: {
    open() {
      this.$refs.details.setAttribute("open", "")
    },
    close() {
      this.$refs.details.removeAttribute("open")
    },
    popupToggled() {
      const isOpen = this.$refs.details.getAttribute("open") !== null ? true : false
      this.$emit("popup-toggled", isOpen)
    }
  }
}
</script>

<style scoped>
/* Experimental : Details implementation */
details.popup summary {
  outline: none;
  cursor: pointer;
  display: inline-block;
}

details.popup summary::-webkit-details-marker {
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

details.popup div {
  position: fixed;
  top: 500%;
  left: 50%;
  animation: fadein 200ms ease-in-out;
  transform: translate(-50%, -50%);
  max-height: calc(100vh - 80px);
  max-width: 600px;
  width: calc(100% - 80px);
  overflow-y: auto;
  z-index: 999; 
  color: #000;
  background-color: #fff;
  padding: 20px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

details[open].popup summary:before {
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
