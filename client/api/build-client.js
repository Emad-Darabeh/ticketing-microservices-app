import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // on the server
    const SERVICE_NAME = 'ingress-nginx-controller';
    const NAMESPACE = 'ingress-nginx';
    return axios.create({
      baseURL: `http://${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local`,
      headers: req.headers,
    });
  } else {
    // on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
