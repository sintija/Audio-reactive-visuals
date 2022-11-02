precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform vec2 uTextureResolution;

uniform vec2 uResolution;

uniform float uTime;
uniform float uFrequency;
uniform float uAmp;

uniform sampler2D uDmap;

mat2 scale(vec2 _scale) {
  return mat2(_scale.x, 0.0, 0.0, _scale.y);
}

void main() {

  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uTextureResolution.x / uTextureResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uTextureResolution.y / uTextureResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv.y = 1.0 - uv.y;

  vec4 dMap = texture2D(uDmap, uv);

  float dMapColor = dot(dMap.rgb, vec3(uFrequency));

  float displacement = dMapColor * uAmp;

  uv -= vec2(0.5);
  uv = scale(2.0 - vec2(sin(displacement) + 1.0)) * uv;
  uv += vec2(0.5);
  

  vec4 texture = texture2D(uTexture, uv);

  gl_FragColor = texture;
}
