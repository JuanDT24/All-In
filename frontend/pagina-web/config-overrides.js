const webpack = require ('webpack');

module.exports = function overrides(config){
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback,{
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        crypto: require.resolve("crypto-browserify"),
        fs: false,
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        net: false,
        buffer: require.resolve("buffer/"),
        assert: require.resolve("assert/")
    })

    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ]);

    return config
}