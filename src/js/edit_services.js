(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//   For trimming whitespaces
function handleInput(event) {
  const inputValue = event.target.value;
  event.target.value = inputValue.trim(); // Remove leading and trailing whitespaces
}

// For first names that it wont accept any numeric and special characters
function validateName(event) {
  const regex = /^[A-Za-z0-9\s]*$/; // Allow alphabetic, numeric characters, and spaces
  if (!regex.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^A-Za-z0-9\s]/g, '');
  }
}


// For Rate
function validateRate(event) {
  const input = event.target;
  let value = input.value.replace(/,/g, ''); // Remove existing commas
  const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numeric characters

  if (numericValue.length <= 4) { // Limit the length to 4 digits
      input.value = numericValue;

      // Check for minimum value
      if (numericValue === '' || parseInt(numericValue, 10) < 100) {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
      } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
      }
  } else {
      // If the input exceeds 4 digits, truncate the value
      const truncatedValue = numericValue.slice(0, 4);
      input.value = truncatedValue;

      // Check for minimum value
      if (parseInt(truncatedValue, 10) < 100) {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
      } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
      }
  }
}

function handleRateInput(event) {
  const input = event.target;
  let value = input.value.replace(/,/g, ''); // Remove existing commas
  const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numeric characters

  if (numericValue === '' || parseInt(numericValue, 10) < 100) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
  } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
  }
}


//For Capacity
function validateCapacity(event) {
  const input = event.target;
  let value = input.value.replace(/,/g, ''); // Remove existing commas
  const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numeric characters

  if (numericValue.length <= 2) { // Limit the length to 2 digits
      const formattedValue = new Intl.NumberFormat().format(numericValue);
      input.value = formattedValue;

      // Check for minimum and maximum value
      const parsedValue = parseInt(numericValue, 10);
      if (numericValue === '' || parsedValue < 2 || parsedValue > 50) {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
      } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
      }
  } else {
      // If the input exceeds 2 digits, truncate the value
      const truncatedValue = numericValue.slice(0, 2);
      const formattedTruncatedValue = new Intl.NumberFormat().format(truncatedValue);
      input.value = formattedTruncatedValue;

      // Check for minimum and maximum value
      const parsedTruncatedValue = parseInt(truncatedValue, 10);
      if (parsedTruncatedValue < 2 || parsedTruncatedValue > 50) {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
      } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
      }
  }
}

function handleCapacityInput(event) {
  const input = event.target;
  let value = input.value.replace(/,/g, ''); // Remove existing commas
  const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numeric characters

  const parsedValue = parseInt(numericValue, 10);
  if (numericValue === '' || parsedValue < 2 || parsedValue > 50) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
  } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
  }
}


//For Image upload
function validateImage(event) {
  const input = event.target;
  const file = input.files[0];
  const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxSizeInMB = 5;
  const imagePreview = document.getElementById('imagePreview');

  if (file) {
      const fileType = file.type;
      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB

      if (validImageTypes.includes(fileType) && fileSizeInMB <= maxSizeInMB) {
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");

          // Preview the image
          const reader = new FileReader();
          reader.onload = function(e) {
              imagePreview.src = e.target.result;
              imagePreview.style.display = 'block';
          };
          reader.readAsDataURL(file);
      } else {
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
          input.value = ""; // Clear the input value to remove the invalid file
          imagePreview.style.display = 'none';
          
          // Update invalid feedback message
          const invalidFeedback = input.nextElementSibling.nextElementSibling;
          if (!validImageTypes.includes(fileType)) {
              invalidFeedback.textContent = "Please provide a valid file. Accepted formats: jpg, jpeg, png.";
          } else if (fileSizeInMB > maxSizeInMB) {
              invalidFeedback.textContent = "File size exceeds 5MB. Please upload a smaller file.";
          }
      }
  } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      imagePreview.style.display = 'none';
  }
}



// For calling the modal
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('edit-service-form');
  const confirmAddWalkin = new bootstrap.Modal(document.getElementById('confirmAddWalkin'));

  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission
      if (form.checkValidity()) {
          // Form is valid, show success modal
          confirmAddWalkin.show();
      } else {
          form.classList.add('was-validated'); // Show validation messages
      }
  });

  // Optional: Reset form validation on modal close
  confirmAddWalkin.addEventListener('hidden.bs.modal', function () {
      form.classList.remove('was-validated');
  });
});

// For Modal Body
$(document).ready(function() {
  $("#create-walkin-button").click(function() {
      $("#confirmAddWalkin .modal-body").html(getUserInputs());
  });
});

function getUserInputs() {
  const serviceName = $("#serviceName").val();
  const serviceRate = $("#serviceRate").val();
  const capacity = $("#capacity").val();
  const serviceImage = $("#serviceImage").val();

  return `
    <div class="modal-content-wrapper">
        <p><span class="modal-label">Name:</span> <span class="modal-input">${serviceName}</span></p>
        <p><span class="modal-label">Rate:</span> <span class="modal-input">${serviceRate}</span></p>
        <p><span class="modal-label">Capacity:</span> <span class="modal-input">${capacity}</span></p>
        <p><span class="modal-label">Image:</span> <span class="modal-input">${serviceImage}</span></p>
    </div>
  `;
}



    //add reservation
    $(document).ready(function() {
      $('#submitWalkin').click(function(e) {
        e.preventDefault();
    
        var formData = new FormData($('#edit-service-form')[0]);
    
        // Disable the button to prevent multiple clicks
        $(this).prop('disabled', true);
    
        $.ajax({
          type: 'POST',
          url: 'service_crud.php', // Replace 'process_form.php' with the URL of your PHP script
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            // Handle success response here
            //alert(response); // For demonstration purposes, you can display an alert with the response
            window.location.href = "service_management.php";
          },
          error: function(xhr, status, error) {
            // Handle error
            console.error(xhr.responseText);
            // Re-enable the button if there's an error
            $('#submitWalkin').prop('disabled', false);
          }
        });
      });
    });
    



document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('edit-service-form');
  let isFormDirty = false;

  form.addEventListener('input', () => {
    isFormDirty = true;
  });

  const cancelButton = document.querySelector('.cancel-button');
  cancelButton.addEventListener('click', () => {
    if (isFormDirty) {
      // Ensure the modal is shown using Bootstrap's modal instance
      const unsavedChangesModal = new bootstrap.Modal(document.getElementById('unsavedChangesModal'));
      unsavedChangesModal.show();
    } else {
      // Directly redirect if form is not dirty
      window.location.href = 'service_management.php';
    }
  });

  const proceedButton = document.getElementById('proceedButton');
  proceedButton.addEventListener('click', () => {
    // Handle the proceed button action
    window.location.href = 'service_management.php';
  });
});
