import React, { createContext, useState, useContext, useEffect } from 'react';

// Function to convert HEX to HSL
function hexToHSL(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: h = 0;
        }
        h = Math.round(h * 60);
    }
    return [h, Math.round(s * 100), Math.round(l * 100)];
}

// Function to convert HSL to HEX
function HSLToHex(h, s, l) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
    const [primaryColor, setPrimaryColor] = useState("#133155");
    const [baseColor, setBaseColor] = useState("#ffffff");

    useEffect(() => {
        const root = document.documentElement;

        // Generate shades for primary color (blue)
        const [h1, s1] = hexToHSL(primaryColor);
        const blueShades = {
            50: HSLToHex(h1, s1, 95),
            100: HSLToHex(h1, s1, 88),
            200: HSLToHex(h1, s1, 76),
            300: HSLToHex(h1, s1, 64),
            400: HSLToHex(h1, s1, 52),
            500: primaryColor,
            600: HSLToHex(h1, s1, 40),
            700: HSLToHex(h1, s1, 30),
            800: HSLToHex(h1, s1, 22),
            900: HSLToHex(h1, s1, 14),
        };

        Object.entries(blueShades).forEach(([key, value]) => {
            root.style.setProperty(`--blue-${key}`, value);
        });

        // Generate shades for base color (gray shades)
        const [h2, s2] = hexToHSL(baseColor);
        const grayShades = {
            50: HSLToHex(h2, s2, 97),
            100: HSLToHex(h2, s2, 95),
            200: HSLToHex(h2, s2, 88),
            300: HSLToHex(h2, s2, 76),
            400: HSLToHex(h2, s2, 64),
            500: baseColor,
            600: HSLToHex(h2, s2, 40),
            700: HSLToHex(h2, s2, 30),
            800: HSLToHex(h2, s2, 22),
            900: HSLToHex(h2, s2, 14),
        };

        Object.entries(grayShades).forEach(([key, value]) => {
            root.style.setProperty(`--gray-${key}`, value);
        });

        // Set base color for `--white`
        root.style.setProperty("--white", baseColor);

    }, [primaryColor, baseColor]);

    return (
        <ColorContext.Provider value={{ primaryColor, setPrimaryColor, baseColor, setBaseColor }}>
            {children}
        </ColorContext.Provider>
    );
};

const useColor = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error("useColor must be used within a ColorProvider");
    }
    return context;
};

export { ColorProvider, useColor, ColorContext };