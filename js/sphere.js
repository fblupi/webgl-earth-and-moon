var SPHERE = {
    getSphereVertex: function (radius, res) { // Se obtienen los vértices, normales y coordenadas de textura
        var vertexData = [], alpha, beta, x, y, z, u, v; 
        for (var i = 0; i <= res; i++) { // Se recorren las latitudes
            alpha = i * Math.PI / res; // Ángulo latitud
            for (var j = 0; j <= res; j++) { // Se recorren las longitudes
                beta = j * 2 * Math.PI / res; // Ángulo longitud
                // Cálculo de x, y, z para vértices y normales
                x = Math.cos(beta) * Math.sin(alpha);
                y = Math.cos(alpha);
                z = Math.sin(beta) * Math.sin(alpha);
                // Cálculo de u, v para las coordenadas de textura
                u = 1 - (j / res);
                v = 1 - (i / res);
                // Vértices
                vertexData.push(radius * x);
                vertexData.push(radius * y);
                vertexData.push(radius * z);
                // Normales
                vertexData.push(x);
                vertexData.push(y);
                vertexData.push(z);
                // Coordenadas de textura
                vertexData.push(u);
                vertexData.push(v);
            }
        }
        return vertexData;
    },
    
    getShereFaces: function (res) { // Se obtienen los índices para crear las caras
        var indexData = [], first, second;
        for (var i = 0; i < res; i++) { // Se recorren las latitudes
            for (var j = 0; j < res; j++) { // Se recorren las longitudes
                // Cálculo de las esquinas superior e inferior izquierda
                first = (i * (res + 1)) + j;
                second = first + res + 1;
                // Cara par
                indexData.push(first); // Esquina superior izquierda
                indexData.push(second); // Esquina inferior izquierda
                indexData.push(first + 1); // Esquina superior derecha
                // Cara impar
                indexData.push(second); // Esquina inferior izquierda
                indexData.push(second + 1); // Esquina inferior derecha
                indexData.push(first + 1); // Esquina superior derecha
            }
        }
        return indexData;
    }
};