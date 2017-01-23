var MOUSE = {
    click: false,
    
    initialize: function (CANVAS) {
        var mouseUp = function (e) { // Se termina de pulsar el ratón
            MOUSE.click = !MOUSE.click; // Se invierte el valor de la variable click
        };
        // Se asignan los listeners
        CANVAS.addEventListener("mouseup", mouseUp, false);
    }
};