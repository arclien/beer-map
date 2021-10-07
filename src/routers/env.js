const getAppEnv = () => {
  return process.env.REACT_APP_ENV;
};

// @TODO
const getApiEndPoint = () => {
  switch (getAppEnv()) {
    case 'production':
      return 'https://bd4o8kt2pj.execute-api.ap-northeast-2.amazonaws.com/api';
    case 'development':
    default:
      return 'https://bd4o8kt2pj.execute-api.ap-northeast-2.amazonaws.com/api';
  }
};

const getNomadMapUrl = () => {
  switch (getAppEnv()) {
    case 'production':
      return 'https://nomad-map.com';
    case 'development':
    default:
      return 'https://dev.nomad-map.com';
  }
};

export { getAppEnv, getApiEndPoint, getNomadMapUrl };
