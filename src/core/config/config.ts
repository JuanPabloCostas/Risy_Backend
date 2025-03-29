export default () => {
  let config = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  };

  console.log(config);


  return config;
}