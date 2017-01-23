var SHADERS = {
    _Pmatrix: null,
    _Vmatrix: null,
    _Mmatrix: null,
    _sampler:null,
    _uv: null,
    _position: null,
    _normal: null,
    
    initialize: function (GL) {
        // Vertex Shader
        var shaderVertexSource = "\n\
attribute vec3 position;\n\
attribute vec2 uv;\n\
attribute vec3 normal;\n\
uniform mat4 Pmatrix;\n\
uniform mat4 Vmatrix;\n\
uniform mat4 Mmatrix;\n\
varying vec2 vUV;\n\
varying vec3 vNormal;\n\
varying vec3 vView;\n\
void main(void) { //pre-built function\n\
gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
vNormal=vec3(Mmatrix*vec4(normal, 0.));\n\
vView=vec3(Vmatrix*Mmatrix*vec4(position, 1.));\n\
vUV=uv;\n\
}";
        // Fragment Shader
        var shaderFragmentSource = "\n\
precision mediump float;\n\
uniform sampler2D sampler;\n\
varying vec2 vUV;\n\
varying vec3 vNormal;\n\
varying vec3 vView;\n\
const vec3 source_ambient_color=vec3(0.4,0.4,0.4);\n\
const vec3 source_diffuse_color=vec3(0.8,0.8,0.8);\n\
const vec3 source_specular_color=vec3(1.,1.,1.);\n\
const vec3 source_direction=vec3(0.,0.,1.);\n\
\n\
const vec3 mat_ambient_color=vec3(0.3,0.3,0.3);\n\
const vec3 mat_diffuse_color=vec3(1.,1.,1.);\n\
const vec3 mat_specular_color=vec3(1.,1.,1.);\n\
const float mat_shininess=10.;\n\
\n\
\n\
\n\
void main(void) {\n\
vec3 color=vec3(texture2D(sampler, vUV));\n\
vec3 I_ambient=source_ambient_color*mat_ambient_color;\n\
vec3 I_diffuse=source_diffuse_color*mat_diffuse_color*max(0., dot(vNormal, source_direction));\n\
vec3 V=normalize(vView);\n\
vec3 R=reflect(source_direction, vNormal);\n\
\n\
\n\
vec3 I_specular=source_specular_color*mat_specular_color*pow(max(dot(R,V),0.), mat_shininess);\n\
vec3 I=I_ambient+I_diffuse+I_specular;\n\
gl_FragColor = vec4(I*color, 1.);\n\
}";
        var getShader = function (source, type, typeString) { // Función usada para compilar un shader
            var shader = GL.createShader(type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                alert("ERROR IN " + typeString + " SHADER : " + GL.getShaderInfoLog(shader));
                return false;
            }
            return shader;
        };        
        
        var shaderVertex = getShader(shaderVertexSource, GL.VERTEX_SHADER, "VERTEX");           // Compilación del vertex shader
        var shaderFragment = getShader(shaderFragmentSource, GL.FRAGMENT_SHADER, "FRAGMENT");   // Compilador del fragment shader

        var SHADER_PROGRAM = GL.createProgram(); // Creación del SHADER_PROGRAM

        GL.attachShader(SHADER_PROGRAM, shaderVertex);     // Se adjunta el vertex shader
        GL.attachShader(SHADER_PROGRAM, shaderFragment);   // Se adjunta el fragment shader

        GL.linkProgram(SHADER_PROGRAM); // Se enlaza el SHADER_PROGRAM

        SHADERS._Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");    // "Puntero" a la matriz de proyección
        SHADERS._Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");    // "Puntero" a la matriz de vista
        SHADERS._Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");    // "Puntero" a la matriz de modelo
        SHADERS._sampler = GL.getUniformLocation(SHADER_PROGRAM, "sampler");
        SHADERS._uv = GL.getAttribLocation(SHADER_PROGRAM, "uv");               // "Puntero" a la variable _uv (coordenadas de textura)
        SHADERS._position = GL.getAttribLocation(SHADER_PROGRAM, "position");   // "Puntero" a la variable _position
        SHADERS._normal = GL.getAttribLocation(SHADER_PROGRAM, "normal");       // "Puntero" a la variable _nomral (coordenadas normales)


        GL.enableVertexAttribArray(SHADERS._uv);        // Se habilita la variable _uv
        GL.enableVertexAttribArray(SHADERS._position);  // Se habilita la variable _position
        GL.enableVertexAttribArray(SHADERS._normal);    // Se habilita la variable _normal

        GL.useProgram(SHADER_PROGRAM); // Se ha terminado de enlazar, se le indica a webgl que puede usar el SHADER_PROGRAM para renderizar
        GL.uniform1i(SHADERS._sampler, 0); // _sampler es el canal de textura número 0
    }
};
