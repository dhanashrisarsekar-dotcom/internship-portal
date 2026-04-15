<!DOCTYPE html>
<html>
<head>
  <title>Apply Course</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="form-container">

  <h2>Apply for Course</h2>

  <form id="applyForm">

    <input type="text" placeholder="Full Name" required>
    <input type="email" placeholder="Email" required>
    <input type="tel" placeholder="Mobile Number" required>

    <select required>
      <option value="">Select Education</option>
      <option>Student</option>
      <option>Graduate</option>
    </select>

    <button type="submit" class="btn">Proceed to Payment</button>

  </form>

  <div id="paymentSection" style="display:none; text-align:center; margin-top:20px;">
    <h3>Scan QR to Pay</h3>

    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupi@bank&pn=CareerBridge&am=1999">

    <p>After payment, enrollment confirmed</p>
  </div>

</div>

<script>
document.getElementById("applyForm").addEventListener("submit", function(e){
  e.preventDefault();
  document.getElementById("paymentSection").style.display = "block";
});
</script>

</body>
</html>