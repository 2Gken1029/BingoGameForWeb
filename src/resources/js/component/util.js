export const formatNumber = (number) => {
    if (number < 10) {
        return "0" + String(number);
    } else {
        return String(number);
    }
};
