export default {
    random(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n);
    },
    distance(n, m) {
        return Math.abs(n - m);
    },
};
