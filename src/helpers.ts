let pad = (num: number) => ("0" + num).slice(-2);

export function getOutputFileName(): string {
    const date_ob = new Date();
    const day = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    return year + "-" + pad(month) + "-" + pad(day) + '-' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}