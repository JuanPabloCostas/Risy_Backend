export default () => {
  let config = {
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USERNAME,
    password:process.env.PASSWORD,
    database: process.env.DATABASE,
  };

  console.log(config);
  

  return config;
}