export default () => {
  let config = {
      mongodb_uri: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DB,
  };

  console.log(config);
  

  return config;
}