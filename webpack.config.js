var config = {
    entry: __dirname + '/main.js',
    output: {
       path: __dirname + '/',
       filename: 'index.js',
       publicPath: '/',
    },
    devServer: {
       inline: true,
       port: process.env.PORT || 8080,
       historyApiFallback: true,
	   public: 'askitweb.herokuapp.com'
    },
    module: {
       rules: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['transform-class-properties'],
             }
          }
       ]
    }
 }
 module.exports = config;