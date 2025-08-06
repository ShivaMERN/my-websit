# Formspree Setup Instructions

To get form submissions sent to your Gmail account, you'll need to set up a Formspree account and configure the form. Here's how:

## Step 1: Sign up for Formspree
1. Go to [https://formspree.io](https   rmspree.io)
2. Click on "Get Started" or "Sign Up"
3. Sign up with your Gmail account (shivamrakhonde@gmail.com)

## Step 2: Create a new form
1. After signing up, you'll be taken to your dashboard
2. Click on "New Project" or "+ New Form"
3. Give your form a name (e.g., "Portfolio Contact Form")
4. Click "Create Project"

## Step 3: Get your form endpoint
1. After creating the form, you'll see an endpoint URL that looks like:
   `https://formspree.io/f/{form_id}`
2. Copy the form ID (the part after `/f/`)

## Step 4: Update your portfolio
1. Open `index1.html` in your portfolio
2. Find the form element (around line 134)
3. Replace `{form_id}` in the action attribute with your actual form ID:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
   ```

## Step 5: Verify your email
1. The first time someone submits the form, Formspree will send a verification email to shivamrakhonde@gmail.com
2. Click the verification link in the email to confirm your email address

## Step 6: Test the form
1. Open your portfolio in a browser
2. Fill out the contact form with test data
3. Submit the form
4. Check your Gmail (shivamrakhonde@gmail.com) for the form submission

## Additional Configuration (Optional)
You can configure additional settings in your Formspree dashboard:
- Set up email notifications
- Add integrations with other services (Slack, etc.)
- View form submission statistics
- Set up custom domains
- Configure reCAPTCHA for spam protection

## Troubleshooting
If you're not receiving form submissions:
1. Check that you've correctly replaced the form ID in the action attribute
2. Check your spam/junk folder for emails from Formspree
3. Make sure you've verified your email address
4. Check the Formspree dashboard for any error messages

For more information, visit the [Formspree documentation](https://help.formspree.io/).
