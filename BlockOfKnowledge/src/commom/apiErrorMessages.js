const API_ERRORS = {
    clientTimeout: {
        kind: 'error',
        iconName: 'error',
        text: 'Parece que o servidor demorou demais para responder, verifique sua conexão ou tente novamente mais tarde',
        title: 'Ooops!',
        errorCode: 408,
        errorLabel: 'tempo limite',
    },
    serverTimeout: {
        kind: 'error',
        iconName: 'error',
        text: 'Parece que o servidor demorou demais para responder, verifique sua conexão ou tente novamente mais tarde',
        title: 'Ooops!',
        errorCode: 504,
        errorLabel: 'sem resposta do servidor',
    },
    internalServerError: {
        kind: 'error',
        iconName: 'error',
        text: 'Parece que o servidor está com dificuldades internas. Tente novamente mais tarde',
        title: 'Ooops!',
        errorCode: 500,
        errorLabel: 'errro interno no servidor',
    },
    serviceUnavailable: {
        kind: 'error',
        iconName: 'error',
        text: 'Parece que o servidor está fora do ar, verifique sua conexão ou tente novamente mais tarde',
        title: 'Ooops!',
        errorCode: 503,
        errorLabel: 'serviço indisponível',
    },
    invalid: {
        kind: 'error',
        iconName: 'error',
        text: 'Requisição não reconhecida pelo servidor',
        title: 'Poxa vida!',
        errorCode: 400,
        errorLabel: 'requisição inválida',
    },
    unauthorized: {
        kind: 'warning',
        iconName: 'warning',
        text: 'Parece que sua sessão expirou, entre novamente para continuar',
        title: 'Ooops!',
        errorCode: 401,
        errorLabel: 'não autorizado',
    },
    unknown: {
        kind: 'error',
        iconName: 'error',
        text: 'Sua ação gerou um erro desconhecido, por favor informe o administrador',
        title: 'Algo muito estranho está acontecendo!',
        errorCode: 666,
        errorLabel: 'desconhecido',
    },
};

export default API_ERRORS;
