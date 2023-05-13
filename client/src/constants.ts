export function addZero(x: any) {
	if (String(x).length === 1) {
        return `0${x}`;
    }
    return `${x}`
}

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];
