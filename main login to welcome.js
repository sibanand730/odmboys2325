function validateForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // List of valid usernames
    const validUsernames = [
        "sibanand pradhan",
        "amlan kumar pradhan",
        "abhijit tripathi",
        "omm praksh",
        "k sridhar roy",
        "shreeyas behera",
        "chirag namdeo",
        "odm admin" // Special admin user
    ];
    
    // Check if username is valid and password matches
    if (validUsernames.includes(username) && password === 'odm@2325') {
        // Capture user details
        const loginTime = new Date().toLocaleString();
        const userDetails = {
            username: username,
            loginTime: loginTime,
            device: navigator.userAgent,
            ipAddress: '', // Placeholder for IP address
            network: '', // Placeholder for network information
            location: '' // Placeholder for location
        };
        
        // Redirect to the welcome page
        window.location.href = 'index (welcome).html';
        // Store user details in local storage
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        generateExcel(userDetails); // Call function to generate Excel
    } else if (username === 'odm admin' && password === 'siba2224x') {
        // Redirect to the welcome page with admin privileges
        window.location.href = 'index (welcome).html';
        // Set a flag for admin privileges
        localStorage.setItem('isAdmin', 'true');
    } else {
        alert("Invalid User ID or Password. Please try again.");
    }
}

function generateExcel(userDetails) {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
        ["Username", "Login Time", "Device", "IP Address", "Network", "Location"],
        [userDetails.username, userDetails.loginTime, userDetails.device, userDetails.ipAddress, userDetails.network, userDetails.location]
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Details");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "UserDetails.xlsx");
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Add event listener for Enter key
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        validateForm(event);
    }
});
