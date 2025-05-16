uniform float uTime;
uniform sampler2D uPerlinTexture;
varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main() {
    vec3 newPosition = position;

    // Randomise rotation
    float rotationSample = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.01)).r;
    float rotationAmplitude = 10.0;
    float angle = rotationSample * rotationAmplitude;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // Simulate wind effect
    float timeMultiplier = 0.01;
    float windXOffset = texture(uPerlinTexture, vec2(0.25, uTime * timeMultiplier)).r - 0.5;
    float windZOffset = texture(uPerlinTexture, vec2(0.75, uTime * timeMultiplier)).r - 0.5;
    vec2 wind = vec2(windXOffset, windZOffset);

    float swayAmplitude = 0.35;
    wind *= pow(uv.y, 2.0) * swayAmplitude;
    newPosition.xz += wind;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Varying
    vUv = uv;
}