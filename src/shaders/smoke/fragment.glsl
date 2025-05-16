uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
    // Scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * 0.03;

    // Smoke
    float smoke = texture(uPerlinTexture, smokeUv).r;

    // Remap using smoothstep
    smoke = smoothstep(0.4, 1.0, smoke);

    // smooth out the edges
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.4, vUv.y);

    // Final
    vec3 finalColor = vec3(0.93, 0.82, 0.75);
    gl_FragColor = vec4(finalColor, smoke);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Debug color
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}