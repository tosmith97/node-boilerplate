module.exports = {
    apps: [
        {
            name: 'momusiq',
            script: './bin/www',
            watch: true,
            "watch_options": {
                usePolling: true
            }
        }
    ]
};