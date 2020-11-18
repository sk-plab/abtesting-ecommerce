// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });
// window.matchMedia = () => ({
//   addListener: () => {},
//   removeListener: () => {},
// });

// const path = require('path');
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import dotenv from 'dotenv';

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.development') });
