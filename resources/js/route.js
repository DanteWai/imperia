const routes = require('./routes.json')

export default function () {
    let args = Array.prototype.slice.call(arguments);
    let name = args.shift();

    if(routes[name] === undefined){
        console.log('error')
    } else{
        return '/' + routes[name].split('/').map(str => str[0] === '{' ? args.shift() : str ).join('/');
    }
}
