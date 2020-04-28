<template>
  <div>
    <div class="scan-square">
      <img class="logo" alt="CAD logo" src="../assets/cad.svg" />
    </div>
    <div>
      <router-link to="/scan">
        <img class="power-on" src="../assets/camera.svg" alt="Ler QRCode" />
      </router-link>
      <p>Certificador de Autenticidade de Documentos</p>
      <h3>CBMDF</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped lang="scss">
.power-on {
  width: 2.5vmax;
  border-radius: 2vmax;
  padding: 1.5vmax;
  margin: 1vmax;
  background: #222;
  -webkit-box-shadow: 0px 0px 6px 5px #550000;
  -moz-box-shadow: 0px 0px 6px 5px #550000;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.4);
}
.logo {
  width: 55vw;
  height: 55vw;
  margin: auto;
  opacity: 0.6;
  display: block;
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

.scan-square {
  width: 55vw;
  height: 55vw;
  margin: auto;
  padding: 1vh; // the border is not actual border, tehrefore you have to increase the padding accordingly
  @include buildCorners(#ffee11, 25, 8, 40);
}
</style>
