const PROXY = {
  "/api": {
    target: "http://127.0.0.1:3000/api",
  },
  "/foo": {
    target: "http://127.0.0.1:3000/foo",
  },
};
const PORT = 9090;

module.exports = {
  PROXY,
  PORT,
};
