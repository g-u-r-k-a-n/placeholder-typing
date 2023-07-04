const txtPlaceHolders = document.querySelectorAll(".typing");
const placeholders = ["JavaScript", "Node Package Manager", "Object Oriented Programming", "Functional Programming"];

/**
 *  @param {Array} placeholders They will show instead placeholder
 *  @param {number} placeholderLength If the placeholder is too long, it will be cut at this length
 *  @param {number} count The number of repetitions* 
*/
const placeholderTyping = async (placeholders, placeholderLength, count) => {
    for (const txt of txtPlaceHolders) {
        const actualPlaceHolder = txt.placeholder;
        txt.placeholder = "";
        let i = 0, j = 0, intervalCount = 0;

        const interval = setInterval(async () => {
            if (txt.value == "") {
                if (i == placeholders.length) {
                    i = 0, j = 0;
                    intervalCount++;
                }

                let placeholder = placeholders[i];
                if (placeholderLength && placeholder.length > placeholderLength) {
                    placeholder = (placeholder.substr(0, placeholderLength)).trim() + "...";
                }

                if (placeholder[j]) {
                    txt.placeholder += placeholder[j];
                }

                j++;

                if (j == placeholder.length + 1 && i != placeholders.length) {
                    let pipeCount = 0;
                    const pipeInterval = setInterval(async () => {
                        if (txt.placeholder.endsWith("|")) {
                            txt.placeholder = txt.placeholder.slice(0, -1);
                        } else {
                            txt.placeholder += "|";
                        }
                        pipeCount++;
                        if (pipeCount >= 7) {
                            clearInterval(pipeInterval);
                            const removeInterval = setInterval(async () => {
                                txt.placeholder = await txt.placeholder.slice(0, -1);
                                if (txt.placeholder == "") {
                                    clearInterval(removeInterval);
                                    j = 0;
                                    i++;
                                }
                            }, 10);
                        }
                    }, 250);
                }

                if (count && count == intervalCount) {
                    clearInterval(interval);
                    if (actualPlaceHolder) {
                        txt.placeholder = actualPlaceHolder;
                    }
                }
            }
        }, 75);
    }
}

window.addEventListener("load", () => {
    placeholderTyping(placeholders, 20, 3);
});