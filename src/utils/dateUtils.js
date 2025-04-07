export const getCurrentHour = () => {
    return new Date().getHours();
};

export const formatHour = (isoString) => {
    const date = new Date(isoString);
    return date.getHours() + 'h';
};
