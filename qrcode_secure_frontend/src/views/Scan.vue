<template>
  <div>
    <router-link to="/settings">
      <img class="settings" src="../assets/gear.svg" alt="Configurações" />
    </router-link>
    <div class="scan-square">
      <div class="qrcode-stream">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
      <p class="error">{{ error }}</p>
    </div>
    <div>
      <router-link to="/">
        <img class="power-on" alt="CAD logo" src="../assets/camera.svg" />
      </router-link>
    </div>
    <br />

    <!--<button class="simular-leitura" v-on:click.stop.prevent="simularLeitura()">Simular Leitura</button>-->

    <div class="decode-result">
      <component v-bind:is="currentComponent" v-bind="currentProperties"></component>
      {{ result }}
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import ProjetoIncendio from "@/components/Document2.vue";
import { Howl } from "howler";
import crypto from "crypto";

export default {
  name: "scan",
  components: {
    QrcodeStream,
    ProjetoIncendio
  },

  // Propriedades do componente
  data() {
    return {
      error: "", // String contendo o erro na leitura do QRCode.
      currentComponent: "", // Componente que sera rendereizado de acordo com o tipo de documento.
      result: "",
      dataArray: null,
      contentHash: null,
      documentTimestamp: null,
      input: null
    };
  },
  // Variáveis computadas
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    currentProperties: function() {
      return {
        dataArray: this.dataArray,
        contentHash: this.contentHash,
        documentTimestamp: this.documentTimestamp
      };
    }
  },
  // Funções do componente
  methods: {
    simularLeitura: async function() {
      this.input = `{"version":"1","data":"i7ycDQB7KulNWO7kA2zlaooSUGSs8HmW495ORitWGeUNInWjt02qVz45xv41URTcxmqnBQMz1V8TWXhnbYIocBGNicPhQnWE31U/qHSp3td9gxSY/6uf1Vv3IdcyOaLV4uu8R7IvqUxSOIbQ/ON3K0aU/SZ6Ho2a2BhOIHwQdz8AEIvK7VMMHiiuSXlBbqvxRVkza6u4KOgjZjXgOp1rmm/HeUpwuzAAG7aUL2vN1JJNFk96JdKWBBF7jPrR0EYhX12+1cmQq3koPLw8vAVf94A5AfOQjrWMVpmbNX7ih1yxHzhOjxTB+ts5uu+BDeJnt6zraULrqB/dkuD7J/OgRxafWwrfMgo04iR609/JntXb7+1exFRpAJL83elKXIEK1EDEPMUVjfpIW+mkmqtQv+f5OWZgqYBSZ9AxybSl55bW9zLug66+NlPzu0Lw2okEmPu+38n1PMCoMnQf/nmgnC1jswPB41L9cEXCFZwDh9KG0tHCQlZTuxsu4sqa5rgD/K6qGu2OLZtudgcA6rkt76hRg+1/u+nogJlxFoMqUGjYFLsl+vcWZXkmv597O+7RQrjbEcJHrOzJZQQvqk7Dc+rffOKSsM2zbpT4Pc5obVuVxSojbQ/iUgN6hfOloGobS9roVdzHd9tq7w5yLZNC7Z+rn6R57P2189Fqq8yqcws="}`;
      let jsonData = await this.decrypt();
      //console.log(jsonData);
      this.getDocumentType(jsonData);
    },
    _: function(word) {
      return word.replace(/['"]+/g, "");
    },
    getDocumentType: function(jsonData) {
      let dataString = jsonData.d;
      let dataArray = dataString.split(";");
      let documentType = dataArray[0];
      let contentHash = jsonData.h;
      let documentTimestamp = jsonData.t;

      //console.log("documentType", documentType);
      //console.log("contentHash", contentHash);
      //console.log("documentTimestamp", documentTimestamp);

      this.renderDocument(
        documentType,
        dataArray,
        contentHash,
        documentTimestamp
      );
    },
    renderDocument: function(
      documentType,
      dataArray,
      contentHash,
      documentTimestamp
    ) {
      this.contentHash = contentHash;
      this.dataArray = dataArray;
      this.documentTimestamp = documentTimestamp;

      switch (this._(documentType)) {
        case "0":
          break;
        case "1":
          break;
        case "2":
          this.currentComponent = "ProjetoIncendio";
          break;
        default:
          //console.log("Tipo documento não reconhecido!");
          break;
      }
    },
    decrypt() {
      const input = this.input;
      var replaced = input.split(" ").join("+"); // tratamento para URL encode.

      const jsonInput = JSON.parse(replaced);

      /* Para uso futuro quando houver mais de uma versão do app.
      // const version = jsonInput.version;
      */

      const data = jsonInput.data;

      // Cria um array a partir do data CSV
      var arrCrypt = data.split(",");

      // Decriptografa cada parte
      let output = "";
      arrCrypt.map(chunk => {
        let encrypted = Buffer.from(chunk, "base64");
        const decrypted = this.decryptString(encrypted);
        output = output.concat(decrypted);
      });

      return JSON.parse(output);
    },
    decryptString: function(encrypted) {
      // Ja recebe encrypted como Buffer. Nao eh necessario converter.
      const { publicKey } = require("../public_key");

      const decrypted = crypto.publicDecrypt(publicKey, encrypted);
      return decrypted.toString();
    },

    // Evento que ocorre como resultado da leitura do QRCode
    async onDecode(result) {
      this.input = result;
      let jsonData = await this.decrypt();
      //console.log(jsonData);
      this.getDocumentType(jsonData);

      var sound = new Howl({
        src: ["./sound/camera.wav"]
      });

      sound.play();
    },

    // Inicialização da câmera e do leitor.
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  },
  props: {
    msg: {}
  }
};
</script>

<style scoped lang="scss">
.settings {
  display: block;
  width: 8vw;
  height: 8vw;
  margin-left: 88vw;
  float: right;
  top: 5vw;
  border-radius: 1vw;
  position: absolute;
}

.error {
  font-weight: bold;
  color: red;
}

.app-name {
  color: #ffffff;
  font-weight: bold;
}

///////////////////
//   Libraries   //
///////////////////

@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
}

// I had to make few modifications (!MARKED! below) to make the SASS function work properly, so I included this npm package here
// https://github.com/waldemarfm/sass-svg-uri

/// A small function allowing skipping base64 encoding
/// and simply pasting the SVG markup right in the CSS.
/// @author Jakob Eriksen
/// @link http://codepen.io/jakob-e/pen/doMoML
/// @param {String} $svg - SVG image to encode
/// @return {String} - Encoded SVG data uri
@function svg-uri($svg) {
  $encoded: "";
  $slice: 2000;
  $index: 0;
  $loops: ceil(str-length($svg) / $slice);

  // !ADDED! auto xmlns as per the original codepen https://codepen.io/jakob-e/pen/doMoML
  @if not str-index($svg, xmlns) {
    $svg: str-replace($svg, "<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  @for $i from 1 through $loops {
    $chunk: str-slice($svg, $index, $index + $slice - 1);
    $chunk: str-replace($chunk, '"', "%22"); // !MODIFIED!
    $chunk: str-replace($chunk, "'", "%27"); // !ADDED!
    $chunk: str-replace($chunk, "/", "%2F"); // !ADDED!
    $chunk: str-replace($chunk, "<", "%3C");
    $chunk: str-replace($chunk, ">", "%3E");
    $chunk: str-replace($chunk, "&", "%26");
    $chunk: str-replace($chunk, "#", "%23");
    $encoded: #{$encoded}#{$chunk};
    $index: $index + $slice;
  }

  @return url("data:image/svg+xml;charset=utf8,#{$encoded}");
}

/// Replace `$search` with `$replace` in `$string`
/// @author Hugo Giraudel
/// @link http://sassmeister.com/gist/1b4f2da5527830088e4d
/// @param {String} $string - Initial string
/// @param {String} $search - Substring to replace
/// @param {String} $replace ('') - New value
/// @return {String} - Updated string
@function str-replace($string, $search, $replace: "") {
  $index: str-index($string, $search);

  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace +
      str-replace(
        str-slice($string, $index + str-length($search)),
        $search,
        $replace
      );
  }

  @return $string;
}

///////////////////////////////
//   The actual mixin:       //
//   CORNER BORDER BUILDER   //
///////////////////////////////

@mixin buildCorners(
  $cornerColor: #000,
  $cornerSize: 20,
  $cornerThickness: 5,
  $contentFontSize: 16
) {
  // Params:
  //   - $cornerColor - because the SVG is not inline SVG but background image it cannot inherit the currentColor,
  //                    therefore the color has to be specified explicitly
  //   - $cornerSize - just a number in pixels without unit or wit any unit you want
  //                 - when just a number is provided relative mode i used (will be vconverted into em)
  //                 - when number with unit is absolute mode is turned on (the unit will remain)
  //   - $cornerThickness - just a number in px without unit
  //                      - when just a number is provided relative mode i used (will be vconverted into em)
  //                      - when number with unit is absolute mode is turned on (the unit will remain)
  //   - [$contentFontSize] - used only in relative mode to recalculate previous dimensions into ems for background size
  //                        - just a number in pixels without unit

  $svgCornerSize: strip-unit($cornerSize);
  $svgCornerThickness: strip-unit($cornerThickness);

  // absolute mode (default)
  $backgroundSize: $cornerSize;

  // relative mode
  @if unit($cornerSize) == "" or unit($cornerThickness) == "" {
    $backgroundSize: $cornerSize/$contentFontSize * 1em;
  }

  // the SVG polygon points
  $svgPolygonPoints: $svgCornerSize 0 $svgCornerThickness 0 0 0 0
    $svgCornerThickness 0 $svgCornerSize $svgCornerThickness $svgCornerSize
    $svgCornerThickness $svgCornerThickness $svgCornerSize $svgCornerThickness
    $svgCornerSize 0;

  background-repeat: no-repeat;

  background-position: 0% 0%, 100% 0%, 100% 100%, 0% 100%;

  background-size: $backgroundSize $backgroundSize,
    $backgroundSize $backgroundSize, $backgroundSize $backgroundSize,
    $backgroundSize $backgroundSize;

  background-image: svg-uri(
      '<svg viewBox="0 0 #{$svgCornerSize} #{$svgCornerSize}"><polygon points="#{$svgPolygonPoints}" fill="#{$cornerColor}" /></svg>'
    ),
    svg-uri(
      '<svg viewBox="0 0 #{$svgCornerSize} #{$svgCornerSize}"><polygon points="#{$svgPolygonPoints}" fill="#{$cornerColor}" transform="translate(#{$svgCornerSize}, 0) rotate(90)" /></svg>'
    ),
    svg-uri(
      '<svg viewBox="0 0 #{$svgCornerSize} #{$svgCornerSize}"><polygon points="#{$svgPolygonPoints}" fill="#{$cornerColor}" transform="translate(#{$svgCornerSize}, #{$svgCornerSize}) rotate(180)" /></svg>'
    ),
    svg-uri(
      '<svg viewBox="0 0 #{$svgCornerSize} #{$svgCornerSize}"><polygon points="#{$svgPolygonPoints}" fill="#{$cornerColor}" transform="translate(0, #{$svgCornerSize}) rotate(270)" /></svg>'
    );
}

.power-on {
  width: 2.5vmax;
  border-radius: 2vmax;
  padding: 1.5vmax;
  margin: 1vmax;
  background: #222;
  -webkit-box-shadow: 0px 0px 6px 5px #550000;
  -moz-box-shadow: 0px 0px 6px 5px #550000;
  box-shadow: 0px 0px 5px 5px rgba(255, 0, 0, 0.4);
}
.decode-result {
  display: block;
  margin: auto;
  min-height: 60vh;
  max-height: 120vh;
  border-radius: 0.5vw;
  border: solid 0.2vmax #c0c0c0;
  background: #eee;
  color: #222;
  text-align: justify;
  //padding: 1vmax;
  overflow: auto;
  overflow-wrap: break-word;
}
.qrcode-stream__camera,
.qrcode-stream__pause-frame {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  background-size: cover;
  max-width: inherit !important;
  max-height: inherit !important;
}
.qrcode-stream__inner-wrapper {
  position: inherit !important;
  max-width: inherit !important;
  max-height: inherit !important;
  z-index: inherit !important;
}
.qrcode-stream {
  overflow: hidden;
  border-radius: 2vh;
  display: block;
  height: 100%;
  width: 100%;
}

.scan-square {
  width: 55vw;
  height: 55vw;
  margin: auto;
  padding: 1vh; // the border is not actual border, tehrefore you have to increase the padding accordingly
  @include buildCorners(#ffee11, 25, 8, 40);
}

.simular-leitura {
  display: block;
  margin: auto;
  padding: 2vw;
  font-weight: bold;
  font-size: 150%;
  border-radius: 2vw;
}
</style>
