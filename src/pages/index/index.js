import './index.scss';

function add(a, b) {
    var c = a + b;
    return c === 1;
}

document.title = "hello";

console.warn(process.env.NODE_ENV);

export default add;
