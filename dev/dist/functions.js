
const highlight = (str, color = 'rgba(227, 228, 173, 0.9)') => {
    return `<span style='background-color:${color};color:#212121;padding:0px 5px'>${str}</span>`
};

const bold = (str, color = '#c5c728') => {
    return `<span style='color:${color}'><strong>${str}</strong></span>`
};

const times = (str, color = 'rgba(227, 228, 173, 0.9)') => {
    return `<span style='font-family:"Times New Roman";color:${color}'>${str}</span>`
}