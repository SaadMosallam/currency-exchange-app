export const getOppositeLabel = (label) => {
    if (label === 'from') return 'to';
    return 'from'
}

export const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
} 