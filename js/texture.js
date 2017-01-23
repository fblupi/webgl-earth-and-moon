var TEXTURE = {
    getTexture: function (GL, imageURL) {
        var image = new Image(); // se crea un objeto image javaScript

        image.src = imageURL; // Se guardará la textura webgl como una propidad de la imagen
        image.webglTexture = false;
        
        image.onload = function (e) { // Esta función crea el objeto textura webgl cuando la imagen ha sido cargada
            var texture = GL.createTexture(); // Se crea la textura
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true); // Se invierte el orden de los pixels verticales
            GL.bindTexture(GL.TEXTURE_2D, texture); // Se hace un emlace con el contexto
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image); // Se envían los datos de la imagen a la textura
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR); // Se establece el filtro de ampliación
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR); // Se establece el filtro de reducción
            GL.generateMipmap(GL.TEXTURE_2D); // Se generan texturas distintas para distintas resoluciones
            GL.bindTexture(GL.TEXTURE_2D, null); // Se libera el contexto 
            image.webglTexture = texture;
        };

        return image;
    }
};