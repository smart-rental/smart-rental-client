import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const customTheme = createTheme({
    palette: {
        primary: {
            main: "#26a69a"
        },
        secondary: {
            main: "#80cbc4"
        },
        error: red,
        warning: { main: "#b71c1c" },
        typography: {
            fontFamily: [
                'Noto Sans',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    }
});