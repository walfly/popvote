const fetch = require('isomorphic-fetch');

fetch('http://data.cnn.com/ELECTION/2016/bop/p.json').then(res => res.json()).then(json => console.log(json));
