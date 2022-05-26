class AnalyzeResultStatus {
    static obtained = 'obtained';
    static not_found = 'not_found';
    static error = 'error';

    constructor(name) {
        this.name = name;
    }
}

module.exports = AnalyzeResultStatus;
