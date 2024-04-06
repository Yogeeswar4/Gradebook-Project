document.addEventListener("DOMContentLoaded", function() {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable").getElementsByTagName('tbody')[0];
  
    studentForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
      const name = document.getElementById("name").value;
      const ticketNumber = document.getElementById("ticketNumber").value;
      const ratingGrade = document.getElementById("ratingGrade").value;
      const examGrade = document.getElementById("examGrade").value;
      const finalGrade = parseFloat((0.6 * parseFloat(examGrade) + 0.4 * parseFloat(ratingGrade)).toFixed(2));
      const status = finalGrade >= 4 ? "Passed" : "Failed";
  
      // Create a new row in the table with the input data
      const newRow = studentTable.insertRow();
      const cellNumber = newRow.insertCell(0);
      const cellName = newRow.insertCell(1);
      const cellTicketNumber = newRow.insertCell(2);
      const cellRatingGrade = newRow.insertCell(3);
      const cellExamGrade = newRow.insertCell(4);
      const cellFinalGrade = newRow.insertCell(5);
      const cellStatus = newRow.insertCell(6);
  
      cellNumber.textContent = studentTable.rows.length;
      cellName.textContent = name;
      cellTicketNumber.textContent = ticketNumber;
      cellRatingGrade.textContent = ratingGrade;
      cellExamGrade.textContent = examGrade;
      cellFinalGrade.textContent = finalGrade;
      cellStatus.textContent = status;
  
      // Clear the form fields after submission
      studentForm.reset();
    });
  
    // Toggle statistics block
    const showStatisticsBtn = document.getElementById("showStatisticsBtn");
    const statisticsBlock = document.getElementById("statisticsBlock");
    showStatisticsBtn.addEventListener("click", function() {
      statisticsBlock.classList.toggle("hidden");
    });
  });
  