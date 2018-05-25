export const factorial = (n: number): number => {
    if (n < 0) {
        throw new Error(`Invalid range: ${n} >= 0`);
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
};

export const combinations = (n: number, k: number): number => {
    if (k > n) {
        throw new Error(`Invalid range: ${n} >= ${k}`);
    }
    return factorial(n) / (factorial(k) * factorial(n - k));
};

export const hypergeometric = (N: number, K: number, n: number, k: number): number => {
    const min = Math.max(0, n + K - N);
    const max = Math.min(K, n);
    if (k < min || k > max) {
        throw new Error(`Invalid range: ${max} >= ${k} >= ${min}`);
    }
    return combinations(K, k) * combinations(N - K, n - k) / combinations(N, n);
};
