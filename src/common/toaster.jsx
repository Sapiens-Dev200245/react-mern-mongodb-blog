// ToasterProvider.js

import { Toaster } from 'react-hot-toast';

const ToasterProvider = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

export default ToasterProvider;
