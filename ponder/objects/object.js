const aCourse = {
    code: "WDD131",
    name: "Dynamic Web Fundamentals",
    sections: [
        { sectionNum: 1, roomNum: 'STC 231', enrolled: 26, days: 'TTh', instructor: 'Brother Warner'},
        { sectionNum: 2, roomNum: 'STC 241', enrolled:18, days: 'WF', instructor: 'Brother Alvey'},
        { sectionNum: 3, roomNum: 'STC 353', enrolled: 15, days: 'MW', instructor: 'Brother Clements'}
    ],
    enrollStudent: function (sectionNum) {
        const sectionIndex = this.sections.findIndex(
            section => section.sectionNum == sectionNum
        );

        if (sectionIndex >= 0) {
            this.sections[sectionIndex].enrolled++;
            renderSections(this.sections);
        }
    }

};

function sectionTemplate(section) {
    return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td></tr>`
}

function renderSections(sections) {
    const html = sections.map(sectionTemplate);
    document.querySelector("#sections").innerHTML = html.join("");
}

renderSections(aCourse.sections);

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
});



