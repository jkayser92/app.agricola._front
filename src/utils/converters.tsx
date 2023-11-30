export function stringParaEntradaDeData (data: string) {
    if (data) {
        return new Date(data).toISOString().split('T')[0]
    }
    return new Date().toISOString().split('T')[0]
}


export function stringParaEntradaDeNumero (number: string) {
    if (number){
        return new Number(number)
    }
    return new Number()
}

export function stringParaEntradaDeNumero2 (number: string) {
    if (number){
        return new Number(number).toString()
    }
    return new Number().toString()
}