module.exports = ({ config }) => {
  const isProd = process.env.EAS_BUILD_PROFILE === "production";

  return {
    ...config,
    name: isProd ? "Meami" : "Meami Debug",
  };
};