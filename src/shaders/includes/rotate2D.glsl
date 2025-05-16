vec2 rotate2D(vec2 uv, float rad) {
    float sinA = sin(rad);
    float cosA = cos(rad);
    mat2 m = mat2(cosA, sinA, -sinA, cosA);
    return m * uv;
}