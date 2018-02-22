Array.prototype.remove = (val) => {
    const index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
