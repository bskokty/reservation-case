/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["styled-components"]);

module.exports = withPlugins([withTM], {
  webpack(config) {
    config.resolve.alias["styled-components"] = "styled-components";
    return config;
  },
});