var main = function () {
    var CANVAS = document.getElementById("your_canvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    /*========================= CAPTURE MOUSE EVENTS ========================= */
    
    MOUSE.initialize(CANVAS);

    /*========================= GET WEBGL CONTEXT ========================= */
    var GL; // Se crea la variable webl
    try {
        GL = CANVAS.getContext("experimental-webgl", {antialias: true});
    } catch (e) {
        alert("You are not webgl compatible :(");
        return false;
    }

    /*========================= SHADERS ========================= */ 
    
    SHADERS.initialize(GL);

    /*========================= THE MODEL ====================== */
    
    var tierra = new Astro(0, 0, 0.005, false);
    tierra.model(GL, 1.27 / 2, "res/tierra.jpg");
     
    var luna = new Astro(1, 0.01, 0, true);
    luna.model(GL, 0.34 / 2, "res/luna.jpg");
    
    tierra.addSatelite(luna);

    /*========================= MATRIX ========================= */

    var PROJMATRIX = LIBS.getProjection(40, CANVAS.width / CANVAS.height, 1, 100); // Se establece la matriz de proyección
    var MOVEMATRIX = LIBS.getI4(); // Se inicia la matriz de movimiento como la matriz identidad
    var VIEWMATRIX = LIBS.getI4(); // Se inicia la matriz de vista como la matriz identidad

    LIBS.translateZ(VIEWMATRIX, -3); // Se traslada la cámara hacia atrás realizando una traslación sobre la matriz de vista
    
    var THETA = 0, PHI = 0; // Variables usadas para el movimiento

    /*========================= DRAWING ========================= */
    GL.enable(GL.DEPTH_TEST); // Se habilita el buffer test de profundidad
    GL.depthFunc(GL.LEQUAL); // Especifica el valor usado para las comparaciones del buffer de profundidad
    GL.clearColor(0.0, 0.0, 0.0, 0.0); // Se asigna el clear color como transparente
    GL.clearDepth(1.0); // Se asigna el valor de limpieza para el buffer de profundidad a 1
    
    var draw = function () { // Esta función dibuja la escena
        LIBS.setI4(MOVEMATRIX);             // Se le da la matriz de identidad como valor a la matriz de movimiento
        
        GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height); // Establece el área de dibujado
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT); // La limpia
        
        GL.uniformMatrix4fv(SHADERS._Mmatrix, false, MOVEMATRIX); // Se asigna la matriz de modelo 
        GL.uniformMatrix4fv(SHADERS._Pmatrix, false, PROJMATRIX); // Se asigna la matriz de proyección
        GL.uniformMatrix4fv(SHADERS._Vmatrix, false, VIEWMATRIX); // Se asigna la matriz de vista
        
        tierra.draw(GL, new Stack()); // Astro sobre el que giran el resto de astros

        GL.flush(); // Se fuerza el dibujado
        window.requestAnimationFrame(draw); // Vuelve a pintar la escena
    };
    
    draw(); // Se inicia el dibujado
};