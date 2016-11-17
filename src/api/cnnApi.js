export default function () {
    return fetch('https://cnnelection.herokuapp.com/partial').then(res => res.json());
}
