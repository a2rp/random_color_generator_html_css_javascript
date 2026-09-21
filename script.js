window.onload = () => {
    const getRandomColor = () => {
        const availableCharacters = '0123456789ABCDEF';
        const availableCharacterLength = availableCharacters.length;

        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += availableCharacters[Math.floor(Math.random() * availableCharacterLength)];
        }

        return color;
    }

    function hexToRGB(hex) {
        let red = 0, green = 0, blue = 0;

        if (hex.length == 4) { // 3 digits
            red = "0x" + hex[1] + hex[1];
            green = "0x" + hex[2] + hex[2];
            blue = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) { // 6 digits
            red = "0x" + hex[1] + hex[2];
            green = "0x" + hex[3] + hex[4];
            blue = "0x" + hex[5] + hex[6];
        }

        return "rgb(" + +red + ", " + +green + ", " + +blue + ")";
    }

    const hexToRGBA = (hex, alpha = 1) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const hexToCssHsl = (hex, valuesOnly = false) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        let red = parseInt(result[1], 16);
        let green = parseInt(result[2], 16);
        let blue = parseInt(result[3], 16);
        let cssString = '';
        red /= 255, green /= 255, blue /= 255;
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        let hue, saturation, lightness = (max + min) / 2;
        if (max == min) {
            hue = saturation = 0; // achromatic
        } else {
            const difference = max - min;
            saturation = lightness > 0.5 ? difference / (2 - max - min) : difference / (max + min);
            switch (max) {
                case red:
                    hue = (green - blue) / difference + (green < blue ? 6 : 0);
                    break;
                case green:
                    hue = (blue - red) / difference + 2;
                    break;
                case blue:
                    hue = (red - green) / difference + 4;
                    break;
            }
            hue /= 6;
        }

        hue = Math.round(hue * 360);
        saturation = Math.round(saturation * 100);
        lightness = Math.round(lightness * 100);

        cssString = hue + ',' + saturation + '%,' + lightness + '%';
        cssString = !valuesOnly ? 'hsl(' + cssString + ')' : cssString;

        return cssString;
    }

    document.querySelector(".generateButton").addEventListener("click", () => {
        const randomColor = getRandomColor();
        document.querySelector(".hexadecimal").innerText = "Hexadecimal: " + randomColor;
        document.querySelector(".rgb").innerText = "RGB: " + hexToRGB(randomColor);
        document.querySelector(".rgba").innerText = "RGBA: " + hexToRGBA(randomColor);
        document.querySelector(".hsl").innerText = "HSL: " + hexToCssHsl(randomColor);
        document.querySelector(".generateValues").style.cssText = `background-color: ${randomColor};`;
    });
    document.querySelector(".generateButton").click();
};

