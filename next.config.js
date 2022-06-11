module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
          test: /\.md$/,
          loader: 'raw-loader',
        })
  
      return config
    }
  }