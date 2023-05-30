/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                logo: {
                    200: '#9FEAE5',
                    300: '#57E6DC',
                    400: '#49beb7',
                    500: '#44B3AB',
                    600: '#456664'
                }
            }
        },
    },
    plugins: [],
}

