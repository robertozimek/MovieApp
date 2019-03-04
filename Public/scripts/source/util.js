let caseInsensitiveSort = (property) => {
    return (a, b) => {
        a = a[property].toUpperCase();
        b = b[property].toUpperCase();

        if(a < b) {
            return -1;
        } else if(b > a) {
            return 1;
        }

        return 0;
    };
};

export default {
    caseInsensitiveSort
};