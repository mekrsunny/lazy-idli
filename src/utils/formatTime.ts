
export const formatTime = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, '');

    let formattedValue = '';
    if (cleanedValue.length <= 2) {
        formattedValue = cleanedValue;
    } else if (cleanedValue.length <= 4) {
        formattedValue = `${cleanedValue.slice(0, 2)}:${cleanedValue.slice(2)}`;
    } else {
        formattedValue = `${cleanedValue.slice(0, 2)}:${cleanedValue.slice(2, 4)}:${cleanedValue.slice(4)}`;
    }

    return formattedValue;
};

export const isValidTime = (time: string): boolean => {
    const regex = /^\d{2}:\d{2}:\d{1,3}$/;
    if (!regex.test(time)) return false;

    const [minutes, seconds, milliseconds] = time.split(':').map(Number);

    if (seconds >= 60 || milliseconds >= 1000) return false;

    return true;
};
