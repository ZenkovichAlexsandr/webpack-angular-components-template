class URLBuilder {

    constructor(baseUrl, ...parameters) {
        this.baseUrl = baseUrl;
        this.parameters = parameters;
    }

    getUrl() {
        let url = this.baseUrl;
        let isFirstParameter = true;

        this.parameters.forEach(param => {
            if (param.value && param.name) {
                if (isFirstParameter) {
                    url = `${url}?${param.name}=${param.value}`;
                    isFirstParameter = false;
                } else {
                    url = `${url}&${param.name}=${param.value}`;
                }
            }
        });
        return url;
    }
}

export default URLBuilder;
