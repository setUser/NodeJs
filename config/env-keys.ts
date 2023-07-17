import env from "./default.json";

enum EnvKeys {
  jwtPrivateKey = "jwtPrivateKey",
}
type EnvKeysType = {
  jwtPrivateKey: string;
};
env satisfies EnvKeysType;

export default EnvKeys;
