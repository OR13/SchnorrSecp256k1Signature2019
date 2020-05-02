const contexts: any = {
  'https://www.w3.org/ns/did/v1': require('./contexts/did-v1.json'),
  'https://w3id.org/did/v1': require('./contexts/did-v0.11.json'),
  'https://w3id.org/security/v1': require('./contexts/security-v1.json'),
  'https://w3id.org/security/v2': require('./contexts/security-v2.json'),

  'https://identity.foundation/SchnorrSecp256k1Signature2019/contexts/schnorr-v1.json': require('./contexts/schnorr-v1.json'),
};

const didDoc = require('./didDoc');

const customLoader = (url: string) => {
  // console.log(url);
  const context = contexts[url];

  if (context) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  if (url.split('#')[0] === 'did:example:123') {
    return {
      contextUrl: null, // this is for a context via a link header
      document: didDoc, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  throw new Error('No custom context support for ' + url);
};

export default customLoader;
