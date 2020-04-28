<template>
  <div>
    <router-link to="/scan">
      <img class="settings-button" src="../assets/gear.svg" alt="Configurações" />
    </router-link>
    <div class="settings">
      <h2>Certificador de Autenticidade de Documentos</h2>

      <p>
        <b>Versão</b>
        <br />
        {{ appVersion }}
      </p>

      <p>{{ description }}</p>

      <h5>&copy; CBMDF</h5>
    </div>
  </div>
</template>

<script>
import { version, author, description } from "../../package.json";
export default {
  name: "settings",
  data() {
    return {
      appVersion: version,
      author: author,
      description: description
    };
  }
};
</script>

<style scoped lang="scss">
.settings {
  text-align: left;
  background: #222;
  border-radius: 2vw;
  padding: 2vw;
  margin: 5vw 2vw;
  font-size: 90%;
}

.settings-button {
  display: block;
  width: 8vw;
  height: 8vw;
  margin-left: 88vw;
  float: right;
  top: 5vw;
  border-radius: 1vw;
  position: absolute;
}

h5 {
  text-align: center;
}
</style>
