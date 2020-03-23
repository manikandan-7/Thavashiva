import fetchIntercept from 'fetch-intercept';

const unregister = fetchIntercept.register({
    request: function (url, config) {
        config.headers.Authorization = localStorage.getItem("accessToken")
        console.log(config.headers.Authorization)
        return [url, config];
    },

    requestError: function (error) {
        return Promise.reject(error);
    },

    response: function (response) {
        return response;
    },

    responseError: function (error) {
        return Promise.reject(error);
    }
});

export default unregister