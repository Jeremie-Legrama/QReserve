$(document).ready(function() {
    $("#example").DataTable({
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      responsive: true,
    });
  });



  $(document).ready(function() {
    var intervalID; // Define intervalID variable outside to make it accessible across functions

    // Function to update table content
    function updateTable() {
      $.ajax({
        url: 'reservation_table.php', // Change this to the PHP file that contains the table content
        type: 'GET',
        success: function(response) {
          $('#example').html(response);
          attachCheckboxListeners(); // Attach event listeners for checkboxes after AJAX call
        }
      });
    }

    // Function to start interval
    function startInterval() {
      intervalID = setInterval(updateTable, 1000); // Adjust interval as needed
    }

    // Function to stop interval
    function stopInterval() {
      clearInterval(intervalID);
    }

    // Attach event listeners for checkboxes
function attachCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.reservation-checkbox');
    //var editReservationButton = document.getElementById('edit-reservation');
    //var deleteReservationButton = document.getElementById('delete-reservation');
    var checkedCount = 0; var checkBoxValue;

    //editAdminButton.disabled = true;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                checkedCount++;
                if (checkedCount === 1) {
                    // If only one checkbox is checked, set its value
                    // Ensure that checkboxValue is defined and refers to the appropriate element
                    checkboxValue = this.value; // You need to define checkboxValue
                }
            } else {
                checkedCount--;
                if (checkedCount === 1) {
                    // If only one checkbox remains checked after unchecking this one, find and set its value
                    const remainingCheckbox = [...checkboxes].find(checkbox => checkbox.checked);
                    if (remainingCheckbox) {
                        checkboxValue.value = remainingCheckbox.value; // You need to define checkboxValue
                    }
                } else {
                    // If no or multiple checkboxes are checked, clear the value
                    checkboxValue.value = " "; // You need to define checkboxValue
                }
            }
            //editAdminButton.disabled = checkedCount !== 1; // Disable button if no checkbox is checked or more than one checkbox is checked

            // Stop or start interval based on checkbox status
            if (checkedCount > 0) {
                stopInterval();
            } else {
                startInterval();
            }
        });
    });
}


    // Initial table update and start interval
    updateTable();
    startInterval();
  });



$(document).ready(function(){
    // Show textarea if 'Others' is selected
    $("input[name='rejectionReason']").change(function() {
        if ($("#thirdOption").is(":checked")) {
            $("#thirdOptionText").show();
        } else {
            $("#thirdOptionText").hide();
        }
    });

    // AJAX code to handle reject reservation
    $("#confirm-reject-reservation-reason").click(function(){
        var formData = new FormData($("#reject-reason-form")[0]);
        // Array to store IDs of selected rows
        var selectedRowsReject = [];

        // Iterate through each checked checkbox
        $(".reservation-checkbox:checked").each(function(){
            // Push the value (ID) of checked checkbox into the array
            selectedRowsReject.push($(this).val());
        });

        // Append the array to the FormData object
        formData.append('selectedRowsReject', JSON.stringify(selectedRowsReject));

        // Get the value of the selected rejection reason radio button
        var rejectionReason = $("input[name='rejectionReason']:checked").val();
        formData.append('rejectionReason', rejectionReason);

        // Append the third option text area value if necessary
        if (rejectionReason === "thirdOption") {
            var thirdOptionTextarea = $("#thirdOptionTextarea").val();
            formData.append('thirdOptionTextarea', thirdOptionTextarea);
        }

        // AJAX call to send formData (including the selected rows IDs)
        $.ajax({
            url: "reservation_crud.php",
            type: "POST",
            data: formData,
            processData: false,  // Important!
            contentType: false,  // Important!
            success: function(response){
                // Reload the page or update the table as needed
                // location.reload(); // For example, reload the page after deletion
            },
            error: function(xhr, status, error){
                console.error("Error:", error);
            }
        });
    });
});




$(document).ready(function(){
    // AJAX code to handle accept reservation
    $("#confirm-accept-reservation-reason").click(function(){
        // Array to store IDs of selected rows
        var selectedRowsAccept = [];

        // Iterate through each checked checkbox
        $(".reservation-checkbox:checked").each(function(){
            // Push the value (ID) of checked checkbox into the array
            selectedRowsAccept.push($(this).val());
        });

        // AJAX call to send selected rows IDs to delete script
        $.ajax({
            url: "reservation_crud.php",
            type: "POST",
            data: {selectedRowsAccept: selectedRowsAccept},
            success: function(response){
                // Reload the page or update the table as needed
               // location.reload(); // For example, reload the page after deletion
            },
            error: function(xhr, status, error){
                //console.error("Error:", error);
            }
        });
    });
});

function reload(){
location.reload();
}



    $(document).ready(function() {
        // Initially disable the Accept and Reject buttons
        $('#accept-reservation').prop('disabled', true);
        $('#reject-reservation').prop('disabled', true);

        // Function to enable/disable the buttons based on checkbox status
        function toggleButtons() {
            var anyChecked = $('.reservation-checkbox:checked').length > 0;
            $('#accept-reservation').prop('disabled', !anyChecked);
            $('#reject-reservation').prop('disabled', !anyChecked);
        }

        // Call the function when the page is ready
        toggleButtons();

        // Attach event listeners to checkboxes to call the function on change
        $(document).on('change', '.reservation-checkbox', function() {
            toggleButtons();
        });
    });





    // Function to fetch data based on the scanned QR code ID
    function fetchInfo(id) {
        fetch('zgetInfo.php?id=' + id)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('result').innerText = data.error;
                    document.getElementById('modal-body-content').innerText = data.error;
                } else {
                    const info = data.info;
                    const infoText = `
                        <p><strong>Reservation ID:</strong> ${info.reservationID}</p>
                        <p><strong>Member ID:</strong> ${info.memberID}</p>
                        <p><strong>Table Number:</strong> ${info.tableNumber}</p>
                        <p><strong>Reservation Status:</strong> ${info.reservationStatus}</p>
                        <p><strong>Reservation Date:</strong> ${info.reservationDate}</p>
                        <p><strong>Reservation Time Start:</strong> ${info.reservationTimeStart}</p>
                        <p><strong>Reservation Time End:</strong> ${info.reservationTimeEnd}</p>
                    `;
                    document.getElementById('result').innerText = infoText;

                    // Show the modal with the fetched data
                    document.getElementById('modal-body-content').innerHTML = infoText;
                    $('#reservation_details').modal('show');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('result').innerText = 'An error occurred while fetching the data.';
                document.getElementById('modal-body-content').innerText = 'An error occurred while fetching the data.';
            });
    }

    // Function to hide the keyboard on mobile devices
    function hideMobileKeyboard() {
        // Temporarily create an input, focus it, then blur it
        const field = document.createElement('input');
        field.setAttribute('type', 'text');
        field.setAttribute('style', 'position: absolute; top: -9999px;');
        document.body.appendChild(field);
        field.focus();
        field.blur();
        document.body.removeChild(field);
    }

    // Event listener for the input field
    document.addEventListener('DOMContentLoaded', () => {
        const qrInput = document.getElementById('qrInput');
        const formInputs = document.querySelectorAll('form input');

        // Ensure the QR input field is always focused
        function focusQrInput() {
            if (document.activeElement !== qrInput) {
                qrInput.focus();
            }
        }

        qrInput.addEventListener('input', () => {
            const id = qrInput.value.trim();
                if (id) {
                    fetchInfo(id);
                    qrInput.value = '';  // Clear the input field after scanning
                    hideMobileKeyboard();  // Hide the mobile keyboard
                }
        });

        // Add event listeners to all form inputs to manage focus
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                // Temporarily disable QR input focus
                document.removeEventListener('click', focusQrInput);
            });

            input.addEventListener('blur', () => {
                // Re-enable QR input focus
                document.addEventListener('click', focusQrInput);
            });
        });

        // Initial focus on the QR input field
        focusQrInput();
        // Ensure the QR input field remains focused after interactions
        document.addEventListener('click', focusQrInput);

        // Close button in the modal
        document.getElementById('submitReserve').addEventListener('click', () => {
            $('#reservation_details').modal('hide');
        });
    });




    // for reject modal
    document.addEventListener('DOMContentLoaded', function () {
        const thirdOption = document.getElementById('thirdOption');
        const thirdOptionText = document.getElementById('thirdOptionText');
        const thirdOptionTextarea = document.getElementById('thirdOptionTextarea');
        const wordCount = document.getElementById('wordCount');
        
        const radioButtons = document.querySelectorAll('input[name="rejectionReason"]');
        
        radioButtons.forEach(radio => {
          radio.addEventListener('change', function () {
            if (this.id === 'thirdOption') {
              thirdOptionText.style.display = 'block';
              thirdOptionTextarea.focus();  // Set focus to the textarea
            } else {
              thirdOptionText.style.display = 'none';
              thirdOptionTextarea.value = '';  // Clear the textarea value
              wordCount.textContent = '0 / 50 words';  // Reset the word count
            }
          });
        });
        
        thirdOptionTextarea.addEventListener('input', function () {
          const words = this.value.split(/\s+/).filter(word => word.length > 0);
          wordCount.textContent = `${words.length} / 50 words`;
          if (words.length > 50) {
            this.value = words.slice(0, 50).join(' ');
          }
        });
      });
      