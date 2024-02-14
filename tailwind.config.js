/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            animation: {
                fade: 'fadeOut 5s ease-in-out',
            },

            keyframes: {
                fadeOut: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            }
        },
    },
    plugins: []
}

