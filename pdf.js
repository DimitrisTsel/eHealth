function generatePDF(){
    const element = document.getElementById("eHealth");
    html2pdf()
    .from(element)
    .save();
}
