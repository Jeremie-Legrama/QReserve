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
  const regex = /^[A-Za-z\s]*$/; // Allow only alphabetic characters and spaces
  if (!regex.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, '');
  }
}

// For username
function validateUsername(event) {
  const regex = /^[a-zA-Z0-9._%+-]*$/; // Allow only alphabetic characters and spaces
  if (!regex.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9._%+-]/g, '');
  }
}


//For Contact Number
function validateContactNumber(event) {
  const input = event.target;
  const value = input.value;

  // Allow only numeric characters
  input.value = value.replace(/[^0-9]/g, '');

  // Check if the length is exactly 11 and starts with '09'
  if (input.value.length === 11 && input.value.startsWith('09')) {
    input.setCustomValidity(''); // Valid input
  } else {
    input.setCustomValidity('Please provide a valid contact number (11 digits, starts with 09).');
  }
}

//For Email 
function validateEmail(event) {
  var emailInput = event.target.value;

  event.target.value = emailInput.replace(/\s+/g, '');

  emailInput = event.target.value.trim();

  var isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailInput);

  if (!isValid) {
    document.getElementById("emailError").style.display = "block";
    event.target.setCustomValidity("Please enter a valid email address.");
  } else {
    document.getElementById("emailError").style.display = "none";
    event.target.setCustomValidity("");
  }
}


document.getElementById("email").addEventListener("input", validateEmail);


  //   Updated script for password toggle
  document.addEventListener("DOMContentLoaded", function() {
    const togglePassword1 = document.querySelector("#password-toggle-1");
    const passwordInput1 = document.querySelector("#password");
    const eyeIcon1 = togglePassword1.querySelector("i");
  
    togglePassword1.addEventListener("click", function() {
      const type =
        passwordInput1.getAttribute("type") === "password" ?
        "text" :
        "password";
      passwordInput1.setAttribute("type", type);
  
      // Toggle eye icon classes
      eyeIcon1.classList.toggle("fa-eye-slash");
      eyeIcon1.classList.toggle("fa-eye");
    });
  
    const togglePassword2 = document.querySelector("#password-toggle-2");
    const passwordInput2 = document.querySelector("#confirmPassword");
    const eyeIcon2 = togglePassword2.querySelector("i");
  
    togglePassword2.addEventListener("click", function() {
      const type =
        passwordInput2.getAttribute("type") === "password" ?
        "text" :
        "password";
      passwordInput2.setAttribute("type", type);
  
      // Toggle eye icon classes
      eyeIcon2.classList.toggle("fa-eye-slash");
      eyeIcon2.classList.toggle("fa-eye");
    });
  });
  
  //   For password checking
  document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmPassword");
    const passwordMatchFeedback = document.querySelector("#passwordMatchFeedback");
    const passwordMatch = document.querySelector("#passwordMatch");
    const passwordMismatch = document.querySelector("#passwordMismatch");
  
    confirmPasswordInput.addEventListener("input", function() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      if (password === confirmPassword) {
        passwordMatchFeedback.innerHTML = "";
        passwordMatch.style.display = "block";
        passwordMismatch.style.display = "none";
      } else {
        passwordMatchFeedback.innerHTML = "";
        passwordMatch.style.display = "none";
        passwordMismatch.style.display = "block";
      }
    });
  
    passwordInput.addEventListener("input", function() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      if (password === confirmPassword) {
        passwordMatchFeedback.innerHTML = "";
        passwordMatch.style.display = "block";
        passwordMismatch.style.display = "none";
      } else {
        passwordMatchFeedback.innerHTML = "";
        passwordMatch.style.display = "none";
        passwordMismatch.style.display = "block";
      }
    });
  
  });

    //   SPassword Strength Indicator
    document.addEventListener("DOMContentLoaded", function() {
      const passwordInput = document.querySelector("#password");
      const confirmPasswordInput = document.querySelector("#confirmPassword");
      const passwordMatchFeedback = document.querySelector("#passwordMatchFeedback");
      const passwordMatch = document.querySelector("#passwordMatch");
      const passwordMismatch = document.querySelector("#passwordMismatch");
      const strengthIndicator = document.getElementById('password-strength-indicator');
  
      // Function to check password match
      function checkPasswordMatch() {
          const password = passwordInput.value;
          const confirmPassword = confirmPasswordInput.value;
  
          if (confirmPassword === password) {
              confirmPasswordInput.classList.add('is-valid');
              confirmPasswordInput.classList.remove('is-invalid');
              passwordMatchFeedback.style.display = 'block';
              passwordMismatch.style.display = 'none';
              confirmPasswordInput.setCustomValidity(''); // Clear any custom validation message
          } else {
              confirmPasswordInput.classList.add('is-invalid');
              confirmPasswordInput.classList.remove('is-valid');
              passwordMatchFeedback.style.display = 'none';
              passwordMismatch.style.display = 'block';
              confirmPasswordInput.setCustomValidity('Passwords do not match.'); // Set custom validation message
          }
      }
  
      // Event listeners for input in passwordInput and confirmPasswordInput
      passwordInput.addEventListener("input", function() {
          checkPasswordMatch();
          checkPasswordStrength(passwordInput);
      });
  
      confirmPasswordInput.addEventListener("input", function() {
          checkPasswordMatch();
      });
  
      // Event listener for form submission
      const form = document.querySelector('form');
      form.addEventListener('submit', function(event) {
          const passwordStrength = checkPasswordStrength(passwordInput);
  
          if (passwordStrength === 'Weak' || passwordInput.value !== confirmPasswordInput.value) {
              event.preventDefault(); // Prevent form submission
  
              if (passwordStrength === 'Weak') {
                  passwordInput.classList.remove('is-valid');
                  passwordInput.classList.add('is-invalid');
                  passwordInput.focus(); // Focus the password input
              }
  
              if (passwordInput.value !== confirmPasswordInput.value) {
                  confirmPasswordInput.classList.remove('is-valid');
                  confirmPasswordInput.classList.add('is-invalid');
                  confirmPasswordInput.focus(); // Focus the confirm password input
              }
          }
      });
  
      // Function to check password strength
      function checkPasswordStrength(input) {
          var password = input.value;
  
          var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          var mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
  
          if (strongRegex.test(password)) {
              strengthIndicator.innerHTML = '<span style="color:green">Strong password</span>';
              input.classList.add('is-valid');
              input.classList.remove('is-invalid');
              input.setCustomValidity(''); // Clear any custom validation message
              return 'Strong';
          } else if (mediumRegex.test(password)) {
              strengthIndicator.innerHTML = '<span style="color:orange">Moderate password</span>';
              input.classList.add('is-valid');
              input.classList.remove('is-invalid');
              input.setCustomValidity(''); // Clear any custom validation message
              return 'Moderate';
          } else {
              strengthIndicator.innerHTML = '<span style="color:red">Weak password</span>';
              input.classList.add('is-invalid');
              input.classList.remove('is-valid');
              input.setCustomValidity('Password strength is weak. Please enter a stronger password.'); // Set custom validation message
              return 'Weak';
          }
      }
  });
  
    
    function checkPasswordMatch() {
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirmPassword');
      const passwordMatchFeedback = document.getElementById('passwordMatchFeedback');
      const passwordMatch = document.getElementById('passwordMatch');
      const passwordMismatch = document.getElementById('passwordMismatch');
    
      if (confirmPasswordInput.value === passwordInput.value) {
        confirmPasswordInput.classList.add('is-valid');
        confirmPasswordInput.classList.remove('is-invalid');
        passwordMatchFeedback.style.display = 'block';
        passwordMismatch.style.display = 'none';
        confirmPasswordInput.setCustomValidity(''); // Clear any custom validation message
      } else {
        confirmPasswordInput.classList.add('is-invalid');
        confirmPasswordInput.classList.remove('is-valid');
        passwordMatchFeedback.style.display = 'none';
        passwordMismatch.style.display = 'block';
        confirmPasswordInput.setCustomValidity('Passwords do not match.'); // Set custom validation message
      }
    }
    
  
    


// For calling the modal
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('booking-form');
  const submitButton = document.getElementById('submitWalkin');
  const confirmAddWalkin = new bootstrap.Modal(document.getElementById('confirmAddWalkin'));

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    if (form.checkValidity()) {
      // Form is valid, show success modal
      confirmAddWalkin.show();
      // You can also submit the form via AJAX here if needed
    } else {
      form.classList.add('was-validated'); // Show validation messages
    }
  });

  // Optional: Reset form validation on modal close
  confirmAddWalkin.addEventListener('hidden.bs.modal', function () {
    form.classList.remove('was-validated');
  });
});


//For Modal Body
$(document).ready(function() {
  $("#create-walkin-button").click(function() {
      $("#confirmAddWalkin .modal-body").html(getUserInputs());
  });
});

function getUserInputs() {
  const firstName = $("#firstName").val();
  const middleName = $("#middleName").val();
  const lastName = $("#lastName").val();
  const username = $("#username").val();
  const contactNumber = $("#contactNumber").val();
  const email = $("#email").val();
  const adminSex = $("#adminSex").val();
  const adminShift = $("#adminShift").val();


  return `
    <div class="modal-content-wrapper">
        <p><span class="modal-label">Name:</span> <span class="modal-input">${firstName} ${middleName} ${lastName}</span></p>
        <p><span class="modal-label">Username:</span> <span class="modal-input">${username}</span></p>
        <p><span class="modal-label">Contact Number:</span> <span class="modal-input">${contactNumber}</span></p>
        <p><span class="modal-label">Email Address:</span> <span class="modal-input">${email}</span></p>
        <p><span class="modal-label">Sex:</span> <span class="modal-input">${adminSex}</span></p>
        <p><span class="modal-label">Shift:</span> <span class="modal-input">${adminShift}</span></p>
    </div>
  `;
}


    //add reservation
$(document).ready(function () {
  $("#submitWalkin").click(function (e) {
    e.preventDefault();

    var formData = new FormData($("#booking-form")[0]);

            // Disable the button to prevent multiple clicks
            $(this).prop("disabled", true);
    $.ajax({
      type: "POST",
      url: "admin_crud.php", // Replace 'process_form.php' with the URL of your PHP script
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        // Handle success response here
        //alert(response); // For demonstration purposes, you can display an alert with the response
        window.location.href = "admin-profiles.php";
      },
      error: function (xhr, status, error) {
        // Handle error
        console.error(xhr.responseText);
      },
    });
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  let isFormDirty = false;

  form.addEventListener('input', () => {
    isFormDirty = true;
  });

  const cancelButton = document.querySelector('.cancel-button');
  cancelButton.addEventListener('click', () => {
    if (isFormDirty) {
      const unsavedChangesModal = new bootstrap.Modal(document.getElementById('unsavedChangesModal'));
      unsavedChangesModal.show();
    } else {
      window.location.href = 'admin-profiles.php';
    }
  });

  const proceedButton = document.getElementById('proceedButton');
  proceedButton.addEventListener('click', () => {
    window.location.href = 'admin-profiles.php';
  });
});




























  