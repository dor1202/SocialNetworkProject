const SmallDate = (string) => {
    const d = new Date();
    const existDate = new Date(string);
    let diffMs = (d.getTime() - existDate.getTime());
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.floor(diffMs / 1000); // minutes
    diffMins /= 60;
    diffMins = Math.abs(Math.round(diffMins));
    if(diffMins < 60) return `${diffMins} minutes ago`;
    else if(diffHrs < 24) return `${diffHrs} hours ago`;
    else return `${diffDays} days ago`;
}

export default SmallDate;