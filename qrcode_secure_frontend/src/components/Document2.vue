<template>
  <div class="document-2">
    <h3>Projeto de Incêndio</h3>

    <p>
      <b>Selo de Autenticação gerado em:</b>
      <br />
      {{ dateLocale }}
    </p>

    <p>
      <b>Número do Parecer de Aprovação:</b>
      <br />
      {{ dataArray[2] }}
    </p>
    <p>
      <b>Número do processo SCIP:</b>
      <br />
      {{ dataArray[3] }}
    </p>
    <p>
      <b>Endereço da Edificação:</b>
      <br />
      {{ dataArray[4] }}
    </p>
    <p>
      <b>Proprietário / CPF / CNPJ:</b>
      <br />
      {{ dataArray[5] }}
    </p>
    <p>
      <b>Altura do último pavimento:</b>
      <br />
      {{ dataArray[6] }}
    </p>
    <p>
      <b>Risco / Área total:</b>
      <br />
      {{ dataArray[7] }}
    </p>
    <p>
      <b>Número de pavimentos acima e abaixo do logradouro:</b>
      <br />
      {{ dataArray[8] }}
    </p>
    <p>
      <b>Destinação:</b>
      <br />
      {{ dataArray[9] }}
    </p>
    <p>
      <b>Medidas aprovadas:</b>
      <br />
      {{ dataArray[10] }}
    </p>
    <p>
      <b>Link para as Pranchas aprovadas:</b>
      <br />
      <a :href="dataArray[11]">Clique aqui</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Document2",
  props: {
    dataArray: {},
    contentHash: null,
    documentTimestamp: null
  },
  methods: {
    _: function(word) {
      return word.replace(/['"]+/g, "");
    }
  },
  computed: {
    data: function() {
      var elements = this.dataArray.split(";");
      var output = [];
      elements.map(element => {
        output.push(this._(element));
      });
      return output;
    },
    dateLocale: function() {
      var date = new Date(this.documentTimestamp * 1000);
      return new Date(date).toLocaleString("pt-BR");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.document-2 {
  display: block;
  text-align: justify;
  padding: 2vw;
  font-size: 100%;
}
</style>
