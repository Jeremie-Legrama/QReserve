<?php
session_start();
include 'connect_database.php';
include 'encodeDecode.php';
include 'get_data_from_database/get_super_admin_accounts.php';
include 'get_data_from_database/get_admin_accounts.php';

//encryptData($data,$key); decryptData($data,$key);
$key = "TheGreatestNumberIs73";

if (isset($_SESSION['userID'])){
 $userID = explode("  ",$_SESSION['userID']); 
  if($userID[1] == 1){
	  header('location:dashboard.php');
	  die();
  }
  else if($userID[1] == 0){
    header('location:dashboard.php');
    die();
  }
}
if(isset($_POST['login'])){
  $username=mysqli_real_escape_string($conn,$_POST['username']);
  $password=mysqli_real_escape_string($conn,$_POST['password']);
  if(mysqli_num_rows($superAdminAccountConn) > 0){
    foreach($arraySuperAdminAccount as $superAdminAccount){
      if(decryptData($superAdminAccount['superAdminUsername'],$key) == $username && decryptData($superAdminAccount['superAdminPassword'],$key) == $password){
        echo '<script language="javascript">';
                echo 'alert("You are now logged in!")';
                echo '</script>';
        $_SESSION['userID'] = $superAdminAccount['superAdminID']."  1";
        header("location:dashboard.php");
        exit();

    }
      else{
        /*echo '<script language="javascript">';
        echo 'alert("Username and Password does not exist")';
        echo '</script>'; */
                if(mysqli_num_rows($adminAccountConn) > 0){
                  foreach($arrayAdminAccount as $adminAccount){
                    if(decryptData($adminAccount['adminUsername'],$key) == $username && decryptData($adminAccount['adminPassword'],$key) == $password){
                      echo '<script language="javascript">';
                              echo 'alert("You are now logged in!")';
                              echo '</script>';
                      $_SESSION['userID'] = $adminAccount['adminID']."  0";
                      header("location:dashboard.php");
                      exit();
              
                  }
                    else{
                      echo '<script language="javascript">';
                              echo 'alert("Username and Password does not exist")';
                              echo '</script>';
                    }
                  }
                }
      }
    }
  }
  else{
    echo '<script language="javascript">';
    echo 'alert("Username and Password does not exist")';
    echo '</script>';
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>

  <link rel="stylesheet" href="./css/landing.css">
  <link rel="stylesheet" href="./css/style.css">

  <!-- Fontawesome Link for Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">

  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Montserrat Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Akronim&family=Anton&family=Aoboshi+One&family=Audiowide&family=Black+Han+Sans&family=Braah+One&family=Bungee+Outline&family=Hammersmith+One&family=Krona+One&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet" />

  <style>
    .toggle-password {
      height: 20px;
      border: none;
      outline: none;
      padding: 0;
      display: flex;
      justify-content: center;
      /* Center horizontally */
      align-items: center;
      /* Center vertically */
    }

    .toggle-password:focus {
      outline: none;
      border: none;
    }

    .toggle-password:hover {
      background-color: transparent;
      border: none;
      color: black;
    }

    .toggle-password i {
      pointer-events: none;
      border: none;
    }

    /* Additional styles to adjust the icon size */
    .toggle-password i {
      font-size: 1.2rem;
      /* Adjust the size as needed */
    }
  </style>

</head>

<body id="customer-landing">

  <!-- <section class="homepage" id="home"> -->
  <section class="homepage" id="home">
    <div class="content container-fluid">
      <div class="text">
        <img src="./images/Bevitore Billiards Hall Logo.png" alt="" height="150px">
        <h1 class="krona-one-regular mb-0">QReserve</h1>
        <h6 class="m-0 pb-0 index-sub">BEVITORE SANTA ROSA</h6>
      </div>
      <div class="container-fluid login">
        <div class="row">
          <form action="login.php" method="POST">
            <h5 class="text-center fw-bold">Welcome!</h5>
            <div class="form-floating mb-3">
              <input type="email" name="username" class="form-control" id="floatingInput" placeholder="name@example.com" required />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3 position-relative">
              <input type="password" name="password" class="form-control" id="floatingPassword" placeholder="Password" required />
              <label for="floatingPassword">Password</label>
              <button
                class="btn btn-outline-secondary toggle-password position-absolute end-0 top-50 translate-middle-y p-4"
                type="button">
                <i class="fas fa-eye"></i>
              </button>
            </div>
            <div class="">
              <button type="submit" name="login" class="btn btn-primary w-100 login-button">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <script>// For password toggle
    document.addEventListener("DOMContentLoaded", function () {
      const togglePassword = document.querySelector(".toggle-password");
      const passwordInput = document.querySelector("#floatingPassword");
      const eyeIcon = togglePassword.querySelector("i");

      togglePassword.addEventListener("click", function () {
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInput.setAttribute("type", type);

        // Toggle eye icon classes
        eyeIcon.classList.toggle("fa-eye-slash");
        eyeIcon.classList.toggle("fa-eye");
      });
    });
  </script>
</body>

</html>