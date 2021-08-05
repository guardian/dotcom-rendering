module.exports = {
    stories: ['../src/**/*.stories.@(js|mdx|ts|tsx)'],
    addons: ['@storybook/addon-knobs', '@storybook/addon-essentials'],
    core: {
      builder: 'webpack5'
    }
  }