var Stack = function () {
    this.values = [LIBS.getI4()]; // La pila está iniciada con la identidad
    
    this.add = function (data) {
        this.values.push(data); // Se incluye una nueva matriz en la pila
    }
    
    this.evaluate = function () {
        var result = this.values[this.values.length - 1];
        for (var i = this.values.length - 2; i >= 0; i--) {
            result = LIBS.mul(result, this.values[i]); // Se van sacando los elementos de la pila multiplicando por la salida
        }
        return result;
    }
    
    this.copy = function (otherStack) {
        for (var i = 1; i < otherStack.values.length; i++) { // Se recorren todos los valores menos el primero que siempre es la identidad
            this.values.push(otherStack.values[i]); // Se incluyen en la pila los valores de la otra pila
        }
    }
}