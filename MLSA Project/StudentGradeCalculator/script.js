/*
Copilot Prompt:
Create JavaScript for Student Grade Calculator.
Requirements:
- Read marks from 5 input fields
- Store marks in array
- Calculate total and average
- Assign grade letter (A, B, C, F)
- Determine Pass/Fail status
- Find highest and lowest marks
- Display results in HTML
- Create function to save results to text file
- Use separate functions:
    calculateGrade()
    saveResult()
*/
// Function to calculate grade and other details
function calculateGrade() {

    const marks = [];

    for (let i = 1; i <= 5; i++) {
        const mark = parseFloat(document.getElementById(`subject${i}`).value);

        if (isNaN(mark) || mark < 0 || mark > 100) {
            alert(`Please enter valid marks (0-100) for Subject ${i}`);
            return;
        }

        marks.push(mark);
    }

    const total = marks.reduce((a, b) => a + b, 0);
    const average = total / marks.length;

    let grade;
    if (average >= 90) grade = "A";
    else if (average >= 80) grade = "B";
    else if (average >= 60) grade = "C";
    else grade = "F";

    const status = average >= 40 ? "Pass" : "Fail";

    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);

    document.getElementById('total').textContent = `Total: ${total}`;
    document.getElementById('average').textContent = `Average: ${average.toFixed(2)}`;
    document.getElementById('grade').textContent = `Grade: ${grade}`;
    document.getElementById('status').textContent = `Status: ${status}`;
    document.getElementById('highest').textContent = `Highest: ${highest}`;
    document.getElementById('lowest').textContent = `Lowest: ${lowest}`;
}


// Save result
function saveResult() {

    const result = document.getElementById("result").innerText;

    const blob = new Blob([result], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Student_Result.txt";

    link.click();
}

document.getElementById('calculateBtn').addEventListener('click', calculateGrade);
document.getElementById('saveBtn').addEventListener('click', saveResult);