<template>
  <div id="app">
    <div>
      <div class="app-name">CAD</div>
      <div :class="isOnline ? 'circle green-circle' : 'circle red-circle'"></div>
      <!--<button v-on:click.stop.prevent="closeApp()">Fechar</button>-->
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isOnline: window.navigator.onLine,
      historyLength: window.history.length
    };
  },
  created() {
    window.window.addEventListener("online", () => (this.isOnline = true));
    window.addEventListener("offline", () => (this.isOnline = false));
  },
  methods: {
    closeApp: function() {
      let direction = `-${this.historyLength}`;
      window.history.go(direction);
      this.historyLength = 0;
    }
  }
};
</script>

<style lang="scss">
.app-name {
  font-weight: bolder;
  font-size: 150%;
  display: block;
  width: 15vw;
  margin: auto;
}

.circle {
  display: block;
  width: 2vw;
  height: 2vw;
  margin-right: 92vw;
  float: left;
  top: 5vw;
  border-radius: 1vw;
  position: absolute;
}
.green-circle {
  background: greenyellow;
}

.red-circle {
  background: brown;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #ffffff;
}

body {
  background: #d40000;
  background-image: url("assets/background.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}
</style>
