module.exports = {
	entry: './src/index.js',
	output: {
		path: './public/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /.js$/, loader: 'babel-loader'},
			{test: /.json$/, loader: 'json-loader'}
		]
	}
};